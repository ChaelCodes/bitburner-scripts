import { getHackScript } from 'import.js';

export async function main(ns) {
  let myServers = ns.getPurchasedServers();
  let targetServers = ns.args;
  myServers.map((server, index) => {
    ns.killall(server);
    let scriptRam = ns.getScriptRam(getHackScript());
    let serverRam = ns.getServerRam(server)[0];
    let threads = Math.floor(serverRam / scriptRam);
    let serverIndex = index % targetServers.length;
    let targetServer = targetServers[serverIndex];
    ns.tprint(`${server} is hacking ${targetServer} with ${threads} threads.`);
    ns.scp(getHackScript(), server);
    if (threads > 0) {
        ns.exec(getHackScript(), server, threads, targetServer, threads);
    }
  });
}
