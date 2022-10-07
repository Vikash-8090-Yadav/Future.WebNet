## About 

**Let's get started with the intro of the chainlink , basic defination of the data feed , assets and many more technical word.**

### What is Chainlink ?

  Chainlink greatly expands the capabilities of smart contracts by enabling access to real-world data and off-chain computation while maintaining the security and reliability guarantees inherent to blockchain technology.  In simple word's Chainlink provides you the real data feeds of the assets like ETH/USD , EUR/USD  and many more  , for the full and clear infromation u can also see their  live docs avialable on the https://chain.link/ 

### What is  assets ?

Asset is basically digital currency in you can invest  and hold some equity . In simple word assets are the digital money or currency .

### What is Data feed ?

Data feed is basically the real value price of the assets we are getting through the chainlink.

## Prerequisite

<li>Knowldge of the remix ide</li>
<li>Having the Rinkeby test faucet avialable in the metamask account   to get faucet https://faucet.rinkeby.io/<li>
Basic of the solidity.

## How Data Feed Get Their Data
Each data feed is updated by a decentralized oracle network. Each oracle operator is rewarded for publishing data. The number of oracles contributing to each feed varies. In order for an update to take place, the data feed aggregator contract must receive responses from a minimum number of oracles or the latest answer will not be updated. You can see the minimum number of oracles for the corresponding feed at chainlink.
For more you can read  https://docs.chain.link/docs/architecture-decentralized-model/    .

## Code 

![datafeed](https://user-images.githubusercontent.com/105157723/193408555-ec04ace6-04c5-4ec9-8b45-eb457cece95a.png)

## Working

The above code is written in the remix ide , lets understand the line by line code of this .

Note : If u don't know how to use Remix ide  you can read this https://github.com/Vikash-8090-Yadav/Solidity-Pathshala/blob/main/Blog/How%20to%20use%20remix%20IDE/How%20to%20use%20remix.ide.md

and if u are not familiar with the solidity then read from here https://github.com/Vikash-8090-Yadav/Solidity-Pathshala/tree/main/Study_Material

 In the above code I am importing **AggregatorV3Interface.sol**    

**An aggregator is the contract that receives periodic data updates from the oracle network. Aggregators store aggregated data on-chain so that consumers can retrieve it and and act upon it within the same transaction.   Which define the external functions implemented by Data Feeds.**

and then  in the **contrcutor** i am passing the address of the contract where the ET/USD deployed  , remember in this we can't pass our own address beacuse this code on chainlink provide the real data of the assets which is already deployed with this  address  passed in the constructor . 

By **getLatestPrice( )** function we can get  the lastest value of the ETH/USD in the  integer form  . By using the latestRoundData( ) function which is the method of the AggreatorV3Interface.sol . 

When you deployed the code and click on the getLatestPrice  you can see the latest value of the ETH/USD

#### You can see on the left side below  , getLatestPrice  -> 0:int256: 114068290588

