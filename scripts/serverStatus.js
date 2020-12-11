let hackPorts = 0;

/*
 * Utility functions that report serverStatus
 * and Hackability 
 */
export async function main(ns) {
  let server = ns.args[0];
  serverReport(ns, server);
}

export function serverReport(ns, server) {
  let serverLock = serverHackStatus(ns, server);
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

export function serverHackStatus(ns, server) {
  if (ns.hasRootAccess(server)) {
    return "🔓";
  }
  if (ns.getServerRequiredHackingLevel(server) > ns.getHackingLevel() ||
    ns.getServerNumPortsRequired(server) > hackablePorts) {
    return "🔐";
  }
  return "🔒";
}

export function hackablePorts(ns) {
  if (hackPorts > 0) {
    return hackPorts;
  }
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
  return hackPorts;
}
