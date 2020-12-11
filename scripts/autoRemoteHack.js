import { getFolder, getServerPrefix } from 'import.js';
let maxValueServers;

/* Identify servers worth more than $10 Billion,
 * deploy the hack script and attack those servers
 * using all purchased servers.
 */
export async function main(ns) {
    maxValueServers = [];
    findServer(ns, 'home', 'home', checkValue);
    ns.tprint(maxValueServers);
    ns.run(`/${getFolder()}/remoteHack.js`, 1, maxValueServers.join(','));
}

function findServer(ns, startServer, targetServer, func) {
    let servers = ns.scan(targetServer, true).filter((server) => server !== startServer && !server.includes(getServerPrefix));
    if (!ns.hasRootAccess(targetServer)) { return false; }
    servers.forEach((server) => {
        func.call(this, ns, server);
        if (ns.hasRootAccess(server)) {
            findServer(ns, targetServer, server, func);
        }
    });
}

function checkValue(ns, server) {
    if (ns.getServerMaxMoney(server) > 10000000000 && ns.hasRootAccess(server)) {
        maxValueServers.push(server);
    }
}
