import { getHackScript, getServerPrefix } from 'import.js';
let hackablePorts;

/* Searches for servers that are hackable,
 * cracks them if you don't have root access,
 * installs a hack script, and instructs them to
 * HACK THEMSELVES
 */
export const main = async function (ns) {
    findHackablePorts(ns);
    findServer(ns, 'home', 'home', hackServer);
}

function findServer(ns, startServer, targetServer, func) {
    let servers = ns.scan(targetServer, true).filter((server) => server !== startServer && !server.includes(getServerPrefix()));
    servers.forEach((server) => {
        func.call(this, ns, server);
        findServer(ns, targetServer, server, func);
    });
}

function hackServer(ns, server) {
    if (crackServer(ns, server)) {
        ns.killall(server);
        let scriptRam = ns.getScriptRam(getHackScript());
        let serverRam = ns.getServerRam(server)[0];
        let threads = Math.floor(serverRam / scriptRam);
        ns.scp(getHackScript(), server);
        if (threads > 0) {
            ns.exec(getHackScript(), server, threads, server, threads);
        }
    }
}

function crackServer(ns, server) {
    if (ns.hasRootAccess(server)) {
        return true;
    }

    if (ns.fileExists('BruteSSH.exe')) {
        ns.brutessh(server);
    }
    if (ns.fileExists('FTPCrack.exe')) {
        ns.ftpcrack(server);
    }
    if (ns.fileExists('relaySMTP.exe')) {
        ns.relaysmtp(server);
    }
    if (ns.fileExists('HTTPWorm.exe')) {
        ns.httpworm(server);
    }
    if (ns.fileExists('SQLInject.exe')) {
        ns.sqlinject(server);
    }
    if (ns.getServerRequiredHackingLevel(server) > ns.getHackingLevel() ||
        ns.getServerNumPortsRequired(server) > hackablePorts) {
        return false;
    } else {
        ns.nuke(server);
        return true;
    }
}

function findHackablePorts(ns) {
    let hackPorts = 0;
    if (ns.fileExists('BruteSSH.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('FTPCrack.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('relaySMTP.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('HTTPWorm.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('SQLInject.exe')) {
        hackPorts += 1;
    }
    hackablePorts = hackPorts;
}
