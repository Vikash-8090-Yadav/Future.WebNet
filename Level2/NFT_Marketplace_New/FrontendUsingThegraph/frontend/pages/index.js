import Head from "next/head"
import Image from "next/image"
// import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"
// import Header from "@/Components/Header"
import { useMoralis } from "react-moralis"
import GET_ACTIVE_ITEMS from "@/constants/subgraphData"
import { useQuery } from "@apollo/client"
import NFTBox from "@/Components/NFTBox"
// console.log(storedData)
import { useState } from "react"

export default function Home() {
    const [proceeds, setProceeds] = useState("0")
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : null
    // const marketplaceAddress = networkMapping[chainString]["NftMarketplace"][0]
    const { loading, error, data: listedNFTs } = useQuery(GET_ACTIVE_ITEMS)
    // storedData = data.activeItems[0].activeItems

    // console.log()
    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className="font-bold py-4 px-4 text-2xl mx-8"> Recently Listed </h1>
                <div className="flex flex-wrap">
                    <div className={styles.description}></div>
                    {isWeb3Enabled ? (
                        listedNFTs ? (
                            listedNFTs.activeItems.map((nft) => {
                                console.log(nft)
                                const { price, nftAddress, seller, tokenId } = nft
                                console.log(nft)
                                return (
                                    <div className="p-4">
                                        <NFTBox
                                            price={price}
                                            tokenId={tokenId}
                                            nftAddress={nftAddress}
                                            seller={seller}
                                            proceeds={proceeds}
                                            // key={`${nftAddress}${tokenId}`}
                                        />
                                    </div>
                                )
                            })
                        ) : (
                            <div> Loading... </div>
                        )
                    ) : (
                        <div className="p-2 m-2">
                            Connect to the wallet or switch to the correct network !
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
