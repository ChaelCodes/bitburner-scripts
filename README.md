# bitburner-scripts

I'm playing [BitBurner]() on Thursdays at https://twitch.tv/ChaelCodes ! This is my Repo of BitBurner Scripts.

You can import these scripts by running the following in Bitburner.

# Get the importer
`wget https://raw.githubusercontent.com/ChaelCodes/bitburner-scripts/main/import.js import.js`
# Configure your Import
You can configure your import inside `import.js`.
```
    config = {
        folder: 'scripts',
        rootUrl: 'https://raw.githubusercontent.com/ChaelCodes/bitburner-scripts/main/',
        serverPrefix: 'ChaelPwns',
    };
```

- `folder` will determine where your scripts are stored
- `rootUrl` is the source, if you fork this repo, update this to you repo
- `serverPrefix` your automatically purchased servers will be filtered from auto hacks using this prefix. Pick a fun name!

# Run your import!
`run import.js` will tell you if everything worked. Please reach out and create an issue for troubleshooting. Please include your import.js, and make sure your forked repo is public!

# Explore! Enjoy!
Follow instructions, try help with various commands.
If you see this error:
![image](https://user-images.githubusercontent.com/8124558/101851194-1b246500-3b29-11eb-9986-7b626bdea51d.png)
Open the file using `nano` Save & Close it, and try again. There's a bug.
