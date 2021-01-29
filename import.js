let config = {
  folder: 'scripts',
  rootUrl: 'https://raw.githubusercontent.com/ChaelCodes/bitburner-scripts/main/',
  serverPrefix: 'ChaelPwns',
};
/*
 * This will import all files listed in importFiles.
 */
export async function main(ns) {
  let filesImported = await importFiles(ns);
  ns.tprint('='.repeat(20));
  if (filesImported) {
    ns.tprint('Hey! Thank you for downloading the BitBurner Scripts.');
    ns.tprint(`You've installed these in the ${config.folder} directory.`);
    ns.tprint(
      `A good place to start is running \`run /${config.folder}/hax.js\``
    );
  } else {
    ns.tprint(
      'You had some issues downloading files, please reach out to the repo maintainer or check your config.'
    );
  }
}

async function importFiles(ns) {
  let files = [
    'autoHack.js',
    'autoRemoteHack.js',
    'buyHacknet.js',
    'dashboard.js',
    'hack.js',
    'hax.js',
    'purchaseServers.js',
    'remoteHack.js',
    'serverStatus.js',
  ];
  let filesImported = true;
  for (let file of files) {
    let remoteFileName = `${config.rootUrl}scripts/${file}`;
    let result = await ns.wget(remoteFileName, `/${getFolder()}/${file}`);
    filesImported = filesImported && result;
    ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`);
  }
  return filesImported;
}

export function getFolder() {
  return config.folder;
}

export function getServerPrefix() {
  return config.serverPrefix;
}

export function getHackScript() {
  return `/${getFolder()}/hack.js`;
}
