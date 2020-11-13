// args[0] - server name
export async function main(ns, args) {
    await hackServer(ns, ns.args[0], ns.args[1]);
}

async function hackServer(ns, server, threads) {
    let serverSecurityThreshold = ns.getServerMinSecurityLevel(server) + 2;
    let serverMoneyThreshold = ns.getServerMaxMoney(server) * 0.95;
    let opts = { threads: threads } 
    while(true) {
        if (ns.getServerSecurityLevel(server) > serverSecurityThreshold) {
            await ns.weaken(server, opts);
        } else if (ns.getServerMoneyAvailable(server) < serverMoneyThreshold) {
            await ns.grow(server, opts);
        } else {
            await ns.hack(server, opts);
        }
    }
}
