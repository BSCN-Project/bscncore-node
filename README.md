BSCN Core Node
============

A BSCN full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install bscn-bitcore https://github.com/BSCN-Project/bscn - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install bscncore-node  

    ```bash
    npm i https://github.com/BSCN-Project/bscncore-node.git#master

    $(npm bin)/bscncore-node create mynode

    cd mynode

    ```  
5. Edit bscncore-node.json  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
	    "bscnd",
        "web"
      ],
      "servicesConfig": {
        "bscnd": {
          "spawn": {
            "datadir": "/home/user/.bscn",
            "exec": "/home/user/bscn-bitcore/src/bscnd"
          }
        }
      }
	}
    ```  
6. Edit bscn.conf  

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
    rpcport=22002
    reindex=1
    gen=0
    addrindex=1
    logevents=1
    ```  
7. Run Node  

    ```
    $(npm bin)/bscncore-node start
    ```  

## Add-on Services

There are several add-on services available to extend the functionality of Bscncore:

- [BSCN Insight API](https://github.com/BSCN-Project/insight-api)
- [BSCN Explorer](https://github.com/BSCN-Project/bscn-explorer)
