<h1 align="center">Welcome to Aura-dapp-example 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-8.1.2-blue.svg" />
  <img src="https://img.shields.io/badge/node-16.13.2-blue.svg" />
</p>

> Example showing the dapp of aura network.

# [Introducion](https://github.com/aura-nw/aura-dapp-example)
In this tutorial you will learn how to build a AuraJS based dApp. The example dApp will allow you mint a CW721 tokens and tranfer to an other address wallet.

## Table of contents
* [Deploy cw721 contract](#deploy-cw721-contract)
* [Web3 Storage](#web3-storage)
* [Dapp example](#dapp-example)

## Prerequisites

- npm = 8.1.2
- node = 16.13.2

## Deploy cw721 contract
After the installation Aura Daemon we need to deploy cw721 contract to system.  For easy testing, the aura testnet is live. You can use this to deploy and run your contracts.
### Setting Up Environment
Aura Testnet RPC: http://18.138.28.51:26657
```sh
export RPC="http://18.138.28.51:26657" 
export CHAIN_ID=aura-testnet
export NODE=(--node $RPC)
export TXFLAG=(${NODE} --chain-id ${CHAIN_ID} --gas-prices 0.025uaura --gas auto --gas-adjustment 1.3)
```
Add wallet for deployment
```sh
aurad keys add wallet

- name: wallet
  type: local
  address: aura15j7k0s2lj8uv59c33u3nj0npxz9qecdelm4xlw
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AlY04ishkA5SGTXu/7ptgUIL9HffP3kAI9UKJgUfh/ni"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

permit train lounge swap upon blush acid firm vintage earth ability salt youth collect frequent twice settle often salon allow fiber permit skull hotel
```
You need to save the mnemonic for identification on the dapp later!  
Ask for tokens from faucet https://faucet-testnet.aura.network/?address={address}

#### Go  
You can set up golang following the [official documentation](https://github.com/golang/go/wiki#working-with-go). The latest versions of aurad require go version v1.17+.   
#### Rust  
The standard approach is to use rustup to maintain dependencies and handle updating multiple versions of cargo and rustc, which you will be using.  

After [install rustup tool](https://rustup.rs/) make sure you have the wasm32 target:
```
rustup target list --installed
rustup target add wasm32-unknown-unknown
```
#### Get cw721 contract:
```sh
# get the contract
git clone https://github.com/aura-nw/cw-nfts.git
cd cw-nfts/contracts/cw721-base
# compile the wasm contract with stable toolchain
rustup default stable
RUSTFLAGS='-C link-arg=-s' cargo wasm
```
#### Deploy contract
```sh
# store contract
RES=$(aurad tx wasm store  ../../target/wasm32-unknown-unknown/release/cw721_base.wasm --from wallet --node http://18.138.28.51:26657 --chain-id aura-testnet --gas-prices 0.025uaura --gas auto --gas-adjustment 1.3 -y --output json)
# get the code id
CODE_ID=$(echo $RES | jq -r '.logs[0].events[-1].attributes[0].value')
# instantiate contract
INIT='{"minter":"aura15j7k0s2lj8uv59c33u3nj0npxz9qecdelm4xlw","name":"Aura NFT","symbol":"ANFT"}'
aurad tx wasm instantiate $CODE_ID "$INIT" \
    --from wallet --label "cw721" $TXFLAG -y
```
## Web3 Storage

This example will use ipfs to store the nft images. [Web3.Storage](https://web3.storage) is backed by the provable storage of [Filecoin](https://filecoin.io) and makes data accessible to your users over the public [IPFS](https://ipfs.io/) network.  
### Create Account
You need a Web3.Storage account to get your API token and manage your stored data. You can [sign up](https://docs.web3.storage/#create-an-account) for free using your email address or GitHub.  
### Get an API token
It only takes a few moments to get a free API token from Web3.Storage. This token enables you to interact with the Web3.Storage service without using the main website, enabling you to incorporate files stored using Web3.Storage directly into your applications and services.

## Dapp example

### Get Dapp example repository
```bash
git clone https://github.com/aura-nw/aura-dapp-example.git
```
### Install

```bash 
npm install
```
### Config
You need address of the contract:
```sh
echo $(aurad query wasm list-contract-by-code $CODE_ID $NODE --output json | jq -r '.contracts[-1]')
aura1zwv6feuzhy6a9wekh96cd57lsarmqlwxajlnrh
```
Create a .env file in the root directory of your project based on env_example file:
```bash
# mnemonic of client's wallet, which execute the contract. 
MNEMONIC='xxxxx xxxxx xxxxx'
# Aura Testnet RPC: http://18.138.28.51:26657
RPC='http://xxxx:xxx'

CONTRACT='xxxxx'

WEB3_STORAGE_TOKEN='xxxxx'
```
### Usage

```bash 
npm run start
```
### Swagger 
You can try testing dapps through swagger documentation
```bash 
npm run start-gendoc
```
![alt text](https://github.com/aura-nw/docs/blob/main/static/img/dapp-example-swagger1.PNG)
![alt text](https://github.com/aura-nw/docs/blob/main/static/img/dapp-example-swagger2.PNG)

## License

[MIT](https://github.com/aura-nw/aura-dapp-example/blob/main/LICENSE) License.


## Show your support

Give a ⭐️ if this project helped you!
