 ![Screenshot from 2022-10-07 23-39-35](https://user-images.githubusercontent.com/85225156/194622351-c70aa3e0-5675-45fe-aaf4-9949303f44a3.png)
 <br> <br>
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
<li>Having the goerli test faucet avialable in the metamask account  <li>
Basic of the solidity.

## How Data Feed Get Their Data
Each data feed is updated by a decentralized oracle network. Each oracle operator is rewarded for publishing data. The number of oracles contributing to each feed varies. In order for an update to take place, the data feed aggregator contract must receive responses from a minimum number of oracles or the latest answer will not be updated. You can see the minimum number of oracles for the corresponding feed at chainlink.
For more you can read  https://docs.chain.link/docs/architecture-decentralized-model/    .




## Working

The above code is written in the remix ide , lets understand the line by line code of this .

Note : If u don't know how to use Remix ide  you can read this https://github.com/Vikash-8090-Yadav/Solidity-Pathshala/blob/main/Blog/How%20to%20use%20remix%20IDE/How%20to%20use%20remix.ide.md

and if u are not familiar with the solidity then read from here https://github.com/Vikash-8090-Yadav/Solidity-Pathshala/tree/main/Study_Material

[Screencast from 07-10-22 11:45:19 PM IST.webm](https://user-images.githubusercontent.com/105157723/194623514-940c949b-6900-4edf-a6ed-0c5bae5afcf7.webm)

## Whenever u click on the EHT/USD Button u wil get the Latest price of ETH/USD of that time . 



