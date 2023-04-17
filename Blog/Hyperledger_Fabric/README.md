### Before we dive into hyperledger fabric we need to understand what Hyperledger is?

# Hyperledger
It is not a blockchain, neither it is a cryptocurrency nor a company instead it is an open source blockchain technology that provides framework and tools.

# Introduction

![hybperledger](https://user-images.githubusercontent.com/105157723/198993196-bd1c7c37-a685-446c-9afb-ae32219ca3eb.png)


We have come across different blockchains like bitcoin, ethereum, solana, etc. but there is one common thing that all these Blockchain shares; nodes store
a complete copy of the distributed ledger and are responsible for the reliability of the stored data. In case a company wants use the blockchain, 
every random node cannot be trusted with the data. Therefore, when these corporations are collaborating with each other it comes at the expense of
inefficient procedures that may compromise security, time and resources of the companies. Besides these companies don't want there competing companies
to steal their data and strategies therefore in this case blockchain fails. Here, we need some better option so that we can manipulate blockchain at the
same time we may not want every node to store the data. Hence, hyperledger fabric project was led. Hyperleger fabric a global collaboration, hosted by 
The Linux Foundation, and includes member organizations that are leaders in finance, banking, Internet of Things, supply chains, manufacturing, and
technology. All the bigger like intel and IBM are manipulating hyperleger fabric these days. That suggests it has gained immense popularity in a very sort 
span.

# Hyperledger Fabric

Let's go through the definition on the official website of hyperledger fabric.

Hyperledger Fabric is an enterprise-grade, distributed ledger platform that offers modularity and versatility for a broad set of industry use cases. The modular architecture for Hyperledger Fabric accommodates the diversity of enterprise use cases through plug and play components, such as consensus, privacy and membership services.

Phew!! A bit technical. Let’s cut it down.

Hyperledger fabric is platform that accelerate industry-wide collaboration for developing high-performance and reliable blockchain. This platform enables companies to develop personalized blockchains for their various needs. Therefore Hyperledger is for business to business(B2B) communication. It is a framework meant for permissioned networks and it’s modular architecture maximizes the confidentiality, flexibility and the resilience of blockchain solutions. This makes Hyperledger Fabric more efficient as compared to regular blockchains.

# Working
Hyperledger fabric uses several elements to operate efficiently; some of these are: ledgers and chain codes, orderers, policies, channels, applications, organizations, identities, and membership. It is of prime importance to understand how these elements interact with one another.

Ledger : Something that stores transaction history

Chaincodes : These are smart contracts which play the third party role.

Peers : Peers are a fundamental element of the network because they host ledgers and smart contracts.

Orderers : They are responsible for packaging transaction into blocks and distribute

them to peers. Ordering is second phase of transaction in hyperledger fabric

Endorsement Policies : Every chaincode has an endorsement policy which specifies the set of peers on a channel that must execute chaincode and endorse the execution results in order for the transaction to be considered valid.

Application : It helps us interact with peers to access the ledger. They use a software development kit (SDK) to access the APIs that permit queries and updates to the ledger.

# Channels 
It is a mechanism by which a set of components within a blockchain network can communicate and transact privately. It is a private subnet of communication between two or more specific network members, for conducting private and confidential transactions. For example there are five organizations participating in hyperledger fabric and two among them want to transfer some data. In this case they will use channels where channel membership is restricted to verified members of the specific organization. The members of the other three organizations will not be given entry to this channel since the authentication authority lies with the organization participating in channels. Besides, it is nearly impossible to send data from one channel to another channel that adds to further security. Even if one peer decided to act maliciously and transfer data to an unauthorized organization i.e. from one channel to another it won’t be able to execute it.

# Operation of Hyperledger Fabric

![2nd](https://user-images.githubusercontent.com/105157723/198993670-f373a64b-cce3-4550-90a8-c6892b28f41a.png)

**The hyperledger fabric operates in three main phases:**

## Phase 1: Proposal
Phase 1 is only concerned with an application asking different organizations’ endorsing peers(these peers have authority to approve or reject a transaction proposal) to agree to the results of the proposed chaincode invocation(doing some real work). Each of these endorsing peers then independently executes a chaincode using the transaction proposal to generate a transaction proposal response by simply signing transactions and returns it to the application. Once the application has received a sufficient number of signed proposal responses, the first phase of the transaction flow is complete.

## Phase 2: Ordering and packaging transactions into blocks
The second phase of the transaction workflow is the packaging phase. The orders then pack these signed transactions in a block. Only validated transactions are packed. And now they are ready to be distributed across the network.

## Phase 3: Validation and commit

The final phase of the transaction workflow involves the distribution and subsequent validation of blocks from the orderer to the peers, where they can be committed to the ledger. Every peer and transaction within a block is validated by all relevant organization before it is committed to the ledger. Failed transaction are retained for audit , but are not committed to the ledger.
 
# Features

Below are some of the key features of Hyperledger Fabric and what differentiates it from other distributed ledger technologies.

• Permissioned architecture

• Highly modular

• Pluggable consensus

• Open smart contract model — flexibility to implement any desired solution model (account model, UTXO model, structured data, unstructured data, etc)

• Low latency of finality/confirmation

• Flexible approach to data privacy : data isolation using ‘channels’, or share private data on a need-to-know basis using private data ‘collections’

• Multi-language chain code (smart contract) support: Go, Java, Javascript

• Support for EVM and Solidity

• Designed for continuous operations, including rolling upgrades and asymmetric version support

• Governance and versioning of smart contracts (chain codes).

• Flexible endorsement model for achieving consensus across required organizations

• Queryable data (key-based queries and JSON queries).

# Use Case
It helps in making cross-border trade

Connecting consumers and growers

Shipping and shopping at the home depot

Helping banks to automate their process using chaincodes.


