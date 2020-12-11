import { getHackScript } from 'import.js';

/* Deploys the hack script to all purchased servers
 * Differs from autoRemotHack because you can specify
 * the target
 * args[0] - list of servers
 */
export async function main(ns) {
  let myServers = ns.getPurchasedServers();
  let targetServers = ns.args[0].split(',');
  let hackScript = ns.args[1] || getHackScript();
  myServers.map((server, index) => {
    ns.killall(server);
    let scriptRam = ns.getScriptRam(hackScript);
    let serverRam = ns.getServerRam(server)[0];
    let threads = Math.floor(serverRam / scriptRam);
    let serverIndex = index % targetServers.length;
    let targetServer = targetServers[serverIndex];
    ns.tprint(`${server} is hacking ${targetServer} with ${threads} threads.`);
    ns.scp(hackScript, server);
    if (threads > 0) {
      ns.exec(hackScript, server, threads, targetServer, threads);
    }
  });
}
