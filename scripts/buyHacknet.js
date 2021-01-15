let functions = { buyNode, upgradeNodes, buyNodes, help };
let maxNodeCost;
/*
 * Time to get some Hacknet Nodes!
 * You can call this script with the options
 * buyNode - purchase and upgrade one new node
 * upgradeNodes - upgrade your existing network to max
 * buyNodes - buy as many nodes as you can afford
 * help - help with the command
 */
export async function main(ns) {
    let result;
    if (!Object.keys(functions).includes(ns.args[0])) {
        result = 'Not Found';
        help(ns);
    } else {
        result = functions[ns.args[0]](ns);
    }
    response(ns, ns.args[0], result);
}

function help(ns) {
    ns.tprint("This script helps you manage your Hacknet Nodes. " +
        "You can purchase new nodes by running `run buyHacknet.js buyNode` " +
        "or `run buyHacknet.js buyNodes`. It will purchase as many nodes as you can afford. " +
        "You can automatically upgrade your existing hacknet nodes by running " +
        "`run buyHacknet.js upgradeNodes`");
    return '';
}

function response(ns, func, result) {
    switch (func) {
        case 'buyNode':
            ns.tprint(result ? '✔️Purchased one node' : 'You cannot afford a node.😢');
            break;
        case 'buyNodes':
            ns.tprint(result > 0 ? `✔️Purchased ${result} nodes.` : 'You cannot afford a node.😢');
            break;
        case 'upgradeNodes':
            ns.tprint(result ? '✔️Nodes Upgraded' : '⭐You are already upgraded as much as you can afford.');
            break;
        default:
            if (result === 'Not Found') { ns.tprint(`${func} is not a valid option`); }
    }
}

function buyNode(ns) {
    let index = ns.hacknet.purchaseNode();
    if (index < 0) {
        return false;
    }
    maxNodeCost = maxNodeCost || getMaxNodeCost(ns, index);

    if (ns.getServerMoneyAvailable('home') >= maxNodeCost) {
        ns.hacknet.upgradeLevel(index, 200);
        ns.hacknet.upgradeRam(index, 6);
        ns.hacknet.upgradeCore(index, 16);
    } else {
        upgradeNode(ns, index);
    }
    return true;
}

function buyNodes(ns) {
    let purchaseNodes = true;
    let i = 0;
    while (purchaseNodes) {
        purchaseNodes = buyNode(ns);
        if (purchaseNodes) { i++; }
    }
    return i;
}

function getMaxNodeCost(ns, index) {
    ns.tprint('Fetching cost');
    return ns.hacknet.getLevelUpgradeCost(index, 200) +
        ns.hacknet.getRamUpgradeCost(index, 6) +
        ns.hacknet.getCoreUpgradeCost(index, 16);
}

function upgradeNodes(ns) {
    let upgrade = false;
    let nodes = ns.hacknet.numNodes();
    for (let i = 0; i < nodes; i++) {
        upgrade = upgradeNode(ns, i) || upgrade;
    }
    return upgrade;
}

function upgradeNode(ns, index) {
    let level = upgradeNodePart(ns, index, 'Level', 10);
    let node = upgradeNodePart(ns, index, 'Ram', 2);
    let core = upgradeNodePart(ns, index, 'Core', 1);
    return level || node || core;
}

function upgradeNodePart(ns, nodeIndex, upgradePart, increment) {
    let upgrade = false;
    let costFunction = `get${upgradePart}UpgradeCost`;
    let upgradeFunction = `upgrade${upgradePart}`;
    let cost = ns.hacknet[costFunction](nodeIndex, increment);
    while (isFinite(cost) && ns.getServerMoneyAvailable('home') >= cost) {
        ns.hacknet[upgradeFunction](nodeIndex, increment);
        cost = ns.hacknet[costFunction](nodeIndex, increment);
        upgrade = true;
    }
    return upgrade;
}
