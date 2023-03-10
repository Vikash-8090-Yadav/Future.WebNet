import { ConnectButton } from "web3uikit"
import Link from "next/link"
const Header = () => {
    return (
        <div>
            <nav className="flex flex-row p-4 m-2 my-3 justify-between items-center">
                <h1>
                    <Link href="/" className="text-4xl font-bold mx-2 px-2">
                        NFT Marketplace
                    </Link>{" "}
                </h1>
                <div className="flex flex-row p-2 mx-4 justify-center items-center font-semibold">
                    <h3 className="mx-2 px-2">
                        <Link href="/">Home</Link>
                    </h3>
                    <h3 className="mx-2 px-2">
                        <Link href="/sell-nft">Sell NFT</Link>
                    </h3>

                    <ConnectButton moralisAuth={false} />
                </div>
            </nav>
        </div>
    )
}

export default Header
