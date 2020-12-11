import { getFolder, getServerPrefix } from 'import.js';
import { serverHackStatus, serverReport } from '/scripts/serverStatus.js';
let hackableServers;

/*
 * This is a dashboard that outputs the status
 * of your entire server network.
 */
export async function main(ns) {
    hackableServers = false;
    findServer(ns, 'home', 'home', serverReport);
    let runAutoHack;
    if (hackableServers) {
        runAutoHack = await ns.prompt("Would you like to hack available servers?");
        if (runAutoHack) {
            ns.tprint("hacking");
            ns.run(`/${getFolder()}/autoHack.js`);
            ns.tprint("hacked");
        }
    }
    let purchaseServers = await ns.prompt("Would you like to purchase servers?");
    if (purchaseServers) { ns.run(`/${getFolder()}/purchaseServers.js`); }
    if (purchaseServers || runAutoHack) {
        let remoteHack = await ns.prompt("Would you like to refresh your remote attacks?");
        if (remoteHack) { ns.run(`/${getFolder()}/autoRemoteHack.js`); }
    }
}

function findServer(ns, startServer, targetServer, func) {
    let servers = ns.scan(targetServer, true).filter((server) => server !== startServer && !server.includes(getServerPrefix()));
    servers.forEach((server) => {
        func.call(this, ns, server);
        let hackStatus = serverHackStatus(ns, server);
        if (hackStatus == "🔒") { hackableServers = true; }
        if (hackStatus !== "🔐") {
            findServer(ns, targetServer, server, func);
        }
    });
}
