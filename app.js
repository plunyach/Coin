 
//This module help to listen request
var express = require('express');
var app = express();
var task_code = '';
var ToAddress = '';
var FromAddress = '';
var PrivateKey = '';
var NoEther = '';
var NoToken = '';
var Value = '';
var hash =  '';

//This module standard library for Ethereum Network.
const Web3 = require("web3");
const web3 = new Web3();
//This module library for Ethereum Transaction.
const Tx = require("ethereumjs-tx");
//This module library for Ethereum Accounts.
var Web3EthAccounts = require('web3-eth-accounts');
//Set Provider to make able to perform task on ethereum ROPSTEN TEST network. https:
web3.setProvider(new web3.providers.HttpProvider("https://ropsten.infura.io/metamask"));
//web3.setProvider(new web3.providers.HttpProvider("https://mainnet.infura.io/metamask")); //For mainnet

//ABI of standard ERC20 token contract  from https://www.ethereum.org/token
var abi_erc = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "initialSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "mint", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }, { "internalType": "bytes", "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" } ]
//Deployed contract address on Ropsten testnet
var contractAddress_erc = "0x365508be8136d415ff13f84d921aee3f9f3813fb"; //For mainnet have to deploy new one.
//Make a variable to access contract's function
var contract_erc = web3.eth.contract(abi_erc).at(contractAddress_erc);

//ABI of standard ERC20 token contract  from https://www.ethereum.org/token
var abi_ico =[ { "constant": true, "inputs": [], "name": "started", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "withdrawTokens", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "weiRaised", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "wallet", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "addressOfTokenUsedAsReward", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_price", "type": "uint256" } ], "name": "setPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_wallet", "type": "address" } ], "name": "changeWallet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "startSale", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "stopSale", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "beneficiary", "type": "address" } ], "name": "buyTokens", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "purchaser", "type": "address" }, { "indexed": true, "name": "beneficiary", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "TokenPurchase", "type": "event" } ]
//Deployed contract address on Ropsten testnet
var contractAddress_ico = "0x8fc7cd37b8f8ec7d665616bc086264bd0d1e79f0"; //For mainnet have to deploy new one.
//Make a variable to access contract's function
var contract_ico = web3.eth.contract(abi_ico).at(contractAddress_ico);


app.get('/', function (req, res) {
//To specify what to do and run that function.
    task_code = req.query.task;
    ToAddress = req.query.ToAddress;
    FromAddress = req.query.FromAddress;
    PrivateKey = req.query.PrivateKey;
    NoEther = req.query.NoEther;
    NoToken = req.query.NoToken;
    Value = req.query.Value;
    hash = req.query.hash;

    switch (task_code) {
        case 'Create': Create(res); break;
        case 'getEther': getEther(res,ToAddress); break;
        case 'getToken': getToken(res,ToAddress); break;
        case 'TokenTransfer': TokenTransfer(res,ToAddress,NoToken,FromAddress,PrivateKey); break;
        case 'EtherTransfer': EtherTransfer(res,ToAddress,NoEther,FromAddress,PrivateKey); break;
        case 'confirm': confirm(res,hash); break; 
        case 'AllEtherTransfer': AllEtherTransfer(res,ToAddress,FromAddress,PrivateKey); break;    
          

        case 'TokenPerETH': TokenPerETH(res); break;
        case 'weiRaised': weiRaised(res); break;
        case 'startsAt': startsAt(res); break;
        case 'endsAt': endsAt(res); break;
        case 'finalized': finalized(res); break;
        case 'investorCount': investorCount(res); break;
        case 'investedAmountOf': investedAmountOf(res,ToAddress); break;
        case 'buy': BuyToken(res,NoEther,FromAddress,PrivateKey); break;
        case 'setStartsAt': setStartsAt(res,Value,FromAddress,PrivateKey); break;
        case 'setEndsAt': setEndsAt(res,Value,FromAddress,PrivateKey); break;
        case 'setRate': setRate(res,Value,FromAddress,PrivateKey); break;
        case 'finalize': finalize(res,FromAddress,PrivateKey); break;
        case 'kill': kill(res,FromAddress,PrivateKey); break;
            
            
        default:
            res.contentType('application/json');
            res.end(JSON.stringify("coin node is ready for Testnet..."));
    }
});
///------ERC20_Start
//Create a acount and return address and private-key.
function Create(res){
    var account = new Web3EthAccounts('http://ropsten.infura.io/v3/1ca3c91435084b30912ccfe2660b2132');
    //var account = new Web3EthAccounts('https://mainnet.infura.io/v3/1ca3c91435084b30912ccfe2660b2132');
    res.contentType('application/json');
    res.end(JSON.stringify(account.create()));
}
//Get balance(Ether) on this "ToAddress".
function getEther(res,ToAddress){
    var balance = web3.eth.getBalance(ToAddress);
    res.contentType('application/json');
    res.end(JSON.stringify((balance.toNumber())));
}
//Get number of token on "ToAddress" for the contract address and ABI provided above
function getToken(res,ToAddress){
    contract_erc.balanceOf(ToAddress, (err, result) => {
        if (!err){
            res.contentType('application/json');
            res.end(JSON.stringify((Number(result))));
        }
    });
}
//Transfer "NoToken" token of the contract address provided above form "FromAddress" to "ToAddress" .
function TokenTransfer(res,ToAddress,NoToken,FromAddress,PrivateKey){

    var count = web3.eth.getTransactionCount(FromAddress);
    var data = contract_erc.transfer.getData(ToAddress, NoToken);
    var gasPrice = web3.eth.gasPrice;
    var gasLimit = 300000;
    var rawTransaction = {
        "from": FromAddress,
        "nonce": web3.toHex(count),
        "gasPrice": web3.toHex(gasPrice),
        "gasLimit": web3.toHex(gasLimit),
        "to": contractAddress_erc,
        "data": data,
    };
    var privKey = new Buffer(PrivateKey, 'hex');
    var tx = new Tx(rawTransaction);

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        if (!err){
            res.contentType('application/json');
            res.end(JSON.stringify(hash));
        }
    });
}
//Transfer "NoEther" ether form "FromAddress" to "ToAddress" .
function EtherTransfer(res,ToAddress,NoEther,FromAddress,PrivateKey){

    var count = web3.eth.getTransactionCount(FromAddress);
    var gasPrice = web3.eth.gasPrice;
    var gasLimit = 21000;

    var rawTransaction = {
        "from": FromAddress,
        "nonce": web3.toHex(count),
        "gasPrice": web3.toHex(gasPrice),
        "gasLimit": web3.toHex(gasLimit),
        "to": ToAddress,
        "value": web3.toHex(NoEther),
    };

    var privKey = new Buffer(PrivateKey, 'hex');
    var tx = new Tx(rawTransaction);

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        if (!err){
            res.contentType('application/json');
            res.end(JSON.stringify(hash));
        }
    });
}

// Get status of a transaction by hash
function confirm(res,hash){
    var account = web3.eth.getTransactionReceipt(hash);
    var status = '';
    if (account) {
        if (account.status=='0x1') {
            status = "Done";
        }else{
            status = "Not";
        }
    }else{
        status = "Pending";
    }

    res.contentType('application/json');
    res.end(JSON.stringify(status));
}

//Transfer all ether form "FromAddress" to "ToAddress" .
function AllEtherTransfer(res,ToAddress,FromAddress,PrivateKey){
    
 var count = web3.eth.getTransactionCount(FromAddress);
    var gasPrice = web3.eth.gasPrice;
    var gasLimit = 21000;
    var balance = web3.eth.getBalance(FromAddress);
    var fee = gasPrice.mul(gasLimit);
    var NoEther = balance.sub(fee);
    var rawTransaction = {
        "from": FromAddress,
        "nonce": web3.toHex(count),
        "gasPrice": web3.toHex(gasPrice),
        "gasLimit": web3.toHex(gasLimit),
        "to": ToAddress,
        "value": web3.toHex(NoEther),
    };

    var privKey = new Buffer(PrivateKey, 'hex');
    var tx = new Tx(rawTransaction);

    tx.sign(privKey);
    var serializedTx = tx.serialize();
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        if (!err){
            res.contentType('application/json');
            res.end(JSON.stringify(hash));
        }else{
            res.contentType('application/json');
            res.end();
        }
    });
}

///------ERC20_End

///------ERC20_IOC_Start
///------ERC20_IOC_Start

//Get token Price per Ethereum.
function TokenPerETH(res){
    contract_ico.price((err, result) => {
        if (!err){
            //console.log(result);
            res.contentType('application/json');
            res.end(JSON.stringify((Number(result))));
        }
    });
}

//Get number of wei Raised.
function weiRaised(res){
    contract_ico.weiRaised((err, result) => {
        if (!err){
            //console.log(result);
            res.contentType('application/json');
            res.end(JSON.stringify((Number(result))));
        }
    });
}
//Get Crowdsale Start time.
function startsAt(res){
    contract_ico.started((err, result) => {
        if (!err){
            //console.log(result);
            res.contentType('application/json');
            res.end(JSON.stringify((Number(result))));
        }
  });
}

//Buy token of the contract address provided above by "NoEther" ether form "FromAddress".
function BuyToken(res,NoEther,FromAddress,PrivateKey){
    var count = web3.eth.getTransactionCount(FromAddress);
    var gasPrice = web3.eth.gasPrice;
    var gasLimit = 300000;

    var rawTransaction = {
        "from": FromAddress,
        "nonce": web3.toHex(count),
        "gasPrice": web3.toHex(gasPrice),
        "gasLimit": web3.toHex(gasLimit),
        "to": contractAddress_ico,
        "value": web3.toHex(NoEther),
    };
    
    

    var privKey = new Buffer(PrivateKey, 'hex');
    
    var tx = new Tx(rawTransaction);

    tx.sign(privKey);
    var serializedTx = tx.serialize();
   

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
        if (!err){
            res.contentType('application/json');
            res.end(JSON.stringify(hash));
        }
    });
}



///------ERC20_IOC_End

if (module === require.main) {
    // Start the server
    var server = app.listen(process.env.PORT || 8085, function () {
        var port = server.address().port;
        console.log('App listening on port %s', port);
    });
}
module.exports = app;
