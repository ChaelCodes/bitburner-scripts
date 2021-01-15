import { getFolder, getServerPrefix } from 'import.js';
let maxValueServers;
let serverValue = 0;

/* Identify servers worth more than $10 Billion,
 * deploy the hack script and attack those servers
 * using all purchased servers.
 */
export async function main(ns) {
    maxValueServers = {
        zero: [],
        million: [],
        billion: [],
        trillion: []
    };
    findServer(ns, 'home', 'home', checkValue);
    ns.run(`/${getFolder()}/remoteHack.js`, 1, highest(ns).join(','));
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
    if (!ns.hasRootAccess(server)) {
        return;
    }
    let serverMoney = ns.getServerMaxMoney(server);
    if (serverMoney > 1e12) {
        maxValueServers.trillion.push(server);
    } else if (serverMoney > 1e9) {
        maxValueServers.billion.push(server);
    } else if (serverMoney > 0) {
        maxValueServers.million.push(server);
    } else {
        maxValueServers.zero.push(server);
    }
}

function highest(ns) {
    if (maxValueServers.trillion.length > 0) {
        return maxValueServers.trillion;
    }
    if (maxValueServers.billion.length > 0) {
        return maxValueServers.billion;
    }
    if (maxValueServers.million.length > 0) {
        return maxValueServers.million;
    }
}
