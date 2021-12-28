import { getHackScript } from 'import.js';

/* Deploys the hack script to all purchased servers
 * Differs from autoRemoteHack because you can specify
 * the target
 * args[0] - list of servers
 * args[1] - alternate Hackscript (default from import)
 */
export async function main(ns) {
  let myServers = ns.getPurchasedServers();
  let targetServers = ns.args[0].split(',');
  let hackScript = ns.args[1] || getHackScript();
  let scriptRam = ns.getScriptRam(hackScript);
  for (const [index, server] of myServers.entries()) {
    ns.killall(server);
    let serverRam = ns.getServerRam(server)[0];
    let threads = Math.floor(serverRam / scriptRam);
    let serverIndex = index % targetServers.length;
    let targetServer = targetServers[serverIndex];
    ns.print(`${server} is hacking ${targetServer} with ${threads} threads.`);
    await ns.scp(hackScript, server);
    if (threads > 0) {
      ns.exec(hackScript, server, threads, targetServer, threads);
    }
  }
}
