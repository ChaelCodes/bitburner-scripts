import { getFolder, getServerPrefix } from 'import.js';
import { serverHackStatus, serverReport } from '/scripts/serverStatus.js';

/*
 * This is a dashboard that outputs the status
 * of your entire server network.
 */
export async function main(ns) {
    findServer(ns, 'home', 'home', 1);
}

function findServer(ns, startServer, targetServer, i) {
    let servers = ns.scan(targetServer, true)
        .filter((server) => server !== startServer && !server.includes(getServerPrefix()));
    servers.forEach((server) => {
        ns.tprint(`😹${'>'.repeat(i)}`);
        serverReport(ns, server);
        if (serverHackStatus(ns, server) !== "🔐") {
            findServer(ns, targetServer, server, i + 1);
        }
    });
}
