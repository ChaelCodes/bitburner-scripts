let maxValueServers;
import { getFolder, getServerPrefix } from 'import.js';

export async function main(ns) {
    maxValueServers = [];
    findServer(ns, 'home', 'home', checkValue);
    ns.tprint(maxValueServers);
    ns.run(`/${getFolder()}/remoteHack.js`, 1, ...maxValueServers);
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
    if(ns.getServerMaxMoney(server) > 10000000000 && ns.hasRootAccess(server)) {
        maxValueServers.push(server);
    }
}
