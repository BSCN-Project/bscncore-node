# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop bscncore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/bscncore-node.git
git clone git@github.com:<yourusername>/bscncore-lib.git
```

To develop bscn or to compile from source:

```bash
git clone git@github.com:<yourusername>/bscncoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See bscn documentation for building bscn on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download bscn distribution, you'll need to compile bscnd from source, and setup your configuration to use that version.


We now will setup symlinks in `bscncore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf bscncore-lib
ln -s ~/bscncore-lib
rm -rf bscnd-rpc
ln -s ~/bscnd-rpc
```

And if you're compiling or developing bscncoin:
```bash
cd ../bin
ln -sf ~/bscn/src/bscnd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd bscncore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/bscnd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/bscnd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch bscncore-node.json
touch package.json
```

Edit `bscncore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "bscnd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "bscnd": {
      "spawn": {
        "datadir": "/home/<youruser>/.bscn",
        "exec": "/home/<youruser>/bscn/src/bscnd"
      }
    }
  }
}
```

**Note**: To install services [bscn-insight-api](https://github.com/bscnproject/insight-api) and [bscn-explorer](https://github.com/bscnproject/bscn-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/bscncore-lib
ln -s ~/bscncore-node
ln -s ~/bscn-insight-api
ln -s ~/bscn-explorer
```

Make sure that the `<datadir>/bscn.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:22501
zmqpubhashblock=tcp://127.0.0.1:22501
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=22302
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../bscncore-node/bin/bscncore-node start
```