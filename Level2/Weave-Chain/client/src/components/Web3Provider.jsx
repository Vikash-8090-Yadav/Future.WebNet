import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import SupplyChain from '../json/WeaveChain.json'
import getWeb3 from '../helpers/getWeb3'
import FullPageLoading from './FullPageLoading'
import Web3Fallback from './Web3Fallback'

const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState(null)
    const [accounts, setAccounts] = useState(null)
    //---state contract--
    const [supplyChain, setSupplyChain] = useState(null)
    //---state contract--
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadWeb3()
    }, [])

    const loadWeb3 = async () => {
        try {
            const web3Instance = await getWeb3()
            setWeb3(web3Instance)

            const connectedAccounts = await web3Instance.eth.getAccounts()
            setAccounts(connectedAccounts)

            const networkId = await web3Instance.eth.net.getId()
            const supplyChainDeployedNetwork = SupplyChain.networks[networkId];
            const supplyChain = new web3Instance.eth.Contract(
                SupplyChain.abi,
                supplyChainDeployedNetwork && supplyChainDeployedNetwork.address,
            );
            setSupplyChain(supplyChain);

            web3Instance.currentProvider.on('accountsChanged', async newAccounts => {
                console.info('Switching wallet accounts')
                setAccounts(newAccounts)
            })

            web3Instance.currentProvider.on('chainChanged', chainId => {
                console.info(`Switching wallet networks: Network ID ${chainId} is supported`)
                window.location.reload()
            })

            setLoading(false)
        } catch (error) {
            setError('Failed to load web3, accounts, or contract. Check console for details.')
            console.error(error)
            setLoading(false)
        }
    }

    if (loading) return <FullPageLoading />
    if (error) return <Web3Fallback />

    return <Web3Context.Provider value={{ web3, accounts, supplyChain }}>{children}</Web3Context.Provider>
}

Web3Provider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useWeb3 = () => {
    const context = useContext(Web3Context)
    if (context === undefined) {
        throw new Error('useWeb3 must be used within an Web3Provider component.')
    }
    return context
}

export default Web3Context