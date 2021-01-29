import { getFolder } from 'import.js';
/* Run various scripts easily and from one interface
 */
export async function main(ns) {
  await runCommand(ns, ns.args[0]);
}

async function runCommand(ns, command) {
  switch (command) {
    case 'autoHack':
    case 'autoRemoteHack':
    case 'dashboard':
    case 'purchaseServers':
      ns.run(`/${getFolder()}/${command}.js`);
      break;
    case 'sudo autohack':
    case 'sudo autoHack':
      ns.run(`/${getFolder()}/autoHack.js`);
      ns.run(`/${getFolder()}/autoRemoteHack.js`);
      break;
    case 'autohack':
      ns.run(`/${getFolder()}/autoHack.js`);
      break;
    case 'serverhack':
    case 'serverHack':
      ns.run(`/${getFolder()}/autoRemoteHack.js`);
      break;
    case 'status':
      ns.run(`/${getFolder()}/dashboard.js`);
      break;
    case 'buy':
    case 'purchase':
      await indecisiveBuyer(ns);
      break;
    case 'buyHacknet':
    case 'purchaseHacknet':
      ns.run(`/${getFolder()}/buyHacknet.js`, 1, 'buyNode');
      break;
    case 'buyServer':
    case 'purchaseServer':
    case 'buyServers':
      ns.run(`/${getFolder()}/purchaseServers.js`);
      break;
    default:
      ns.tprint(`Oh no! ${command} isn't a valid command. Try: dashboard, autoHack, autoRemoteHack, or buy.`);
  }
}

async function indecisiveBuyer(ns) {
  let buyServer = await ns.prompt("Did you want to buy servers?");
  if (buyServer) { ns.run(`/${getFolder()}/purchaseServers.js`); }
  let buyHacknet = await ns.prompt("Did you want to buy hacknet nodes?");
  if (buyHacknet) {
    ns.run(`/${getFolder()}/buyHacknet.js`, 1, 'buyNode');
    ns.tprint(`You've bought a node. See \`run /${getFolder()}/buyHacknet.js\` for more options.`);
  }
}
