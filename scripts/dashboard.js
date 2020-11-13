let hackablePorts;
let hackableServers;
import { getFolder, getServerPrefix } from 'import.js';

export async function main(ns) {
    hackableServers = false;
    findHackablePorts(ns);
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

function findHackablePorts(ns) {
    let hackPorts = 0;
    if(ns.fileExists('BruteSSH.exe')) {
        hackPorts += 1;
    }
    if(ns.fileExists('FTPCrack.exe')) {
        hackPorts += 1;
    }
    if(ns.fileExists('relaySMTP.exe')) {
        hackPorts += 1;
    }
    if(ns.fileExists('HTTPWorm.exe')) {
        hackPorts += 1;
    }
    if(ns.fileExists('SQLInject.exe')) {
        hackPorts += 1;
    }
    hackablePorts = hackPorts;
}

function findServer(ns, startServer, targetServer, func) {
    let servers = ns.scan(targetServer, true).filter((server) => server !== startServer && !server.includes(getServerPrefix()));
    servers.forEach((server) => {
        func.call(this, ns, server);
        if (serverStatus(ns, server) !== "🔐") {
            findServer(ns, targetServer, server, func);
        }
    });
}

function serverReport(ns, server) {
    let serverLock = serverStatus(ns, server);
    ns.tprint(`${serverLock} ${server}`);
    if (serverLock == "🔓") {
        ns.tprint(`🛡️${Math.round(ns.getServerSecurityLevel(server))}/${ns.getServerMinSecurityLevel(server)}`);
        ns.tprint(`💸${ns.nFormat(ns.getServerMoneyAvailable(server), "$0.000a")}/${ns.nFormat(ns.getServerMaxMoney(server), "$0.000a")}`);
    } else {
        ns.tprint(`Hack Level: ${ns.getServerRequiredHackingLevel(server)}`);
        ns.tprint(`Ports: ${ns.getServerNumPortsRequired(server)}`);
    }
    ns.tprint('-----------');
}

function serverStatus(ns, server) {
    if (ns.hasRootAccess(server)) {
        return "🔓";
    }
    if (ns.getServerRequiredHackingLevel(server) > ns.getHackingLevel() ||
        ns.getServerNumPortsRequired(server) > hackablePorts) {
        return "🔐";
    }
    hackableServers = true;
    return "🔒";
}
