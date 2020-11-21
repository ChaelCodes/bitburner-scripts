let config

export async function main(ns) {
  config = {
    folder: 'scripts',
    rootUrl:
      'https://raw.githubusercontent.com/ChaelCodes/bitburner-scripts/main/',
    serverPrefix: 'ChaelPwns',
  }
  let filesImported = await importFiles(ns)
  ns.tprint('='.repeat(20))
  if (filesImported) {
    ns.tprint('Hey! Thank you for downloading the BitBurner Scripts.')
    ns.tprint(`You've installed these in the ${config.folder} directory.`)
    ns.tprint(
      `A good place to start is running \`run /${config.folder}/dashboard.js\``
    )
  } else {
    ns.tprint(
      'You had some issues downloading files, please reach out to the repo maintainer or check your config.'
    )
  }
}

async function importFiles(ns) {
  let files = [
    'scripts/autoHack.js',
    'scripts/autoRemoteHack.js',
    'scripts/buyHacknet.js',
    'scripts/hack.js',
    'scripts/dashboard.js',
    'scripts/purchaseServers.js',
    'scripts/remoteHack.js',
  ]
  let filesImported = true
  for (let file of files) {
    let result = await ns.wget(config.rootUrl + file, `/${file}`)
    filesImported = filesImported && result
    ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`)
  }
  return filesImported
}

export function getFolder() {
  return config.folder
}

export function getServerPrefix() {
  return config.serverPrefix
}

export function getHackScript() {
  return `/${getFolder()}/hack.js`
}
