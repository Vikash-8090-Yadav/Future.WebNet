import "@/styles/globals.css"

import { MoralisProvider } from "react-moralis"
import { ApolloProvider } from "@apollo/client"
import { InMemoryCache } from "@apollo/client"
import { ApolloClient } from "@apollo/client"
import Header from "@/Components/Header"
import { NotificationProvider } from "web3uikit"
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/41937/marketplace-nft/v0.0.1",
})
export default function App({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <ApolloProvider client={client}>
                <NotificationProvider>
                    <Header></Header>
                    <Component {...pageProps} />
                </NotificationProvider>
            </ApolloProvider>
        </MoralisProvider>
    )
}
