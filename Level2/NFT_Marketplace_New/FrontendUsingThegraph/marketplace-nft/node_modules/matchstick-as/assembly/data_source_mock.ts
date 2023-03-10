import { DataSourceContext } from "@graphprotocol/graph-ts";

let defaultAddress = "0x0000000000000000000000000000000000000000"
let defaultNetwork = "mainnet"
let defaultContext = new DataSourceContext();

export declare namespace dataSourceMock {
    export function setReturnValues(address: String, network: String, context: DataSourceContext): void
}

export namespace dataSourceMock {
    export function setAddress(address: String): void {
        dataSourceMock.setReturnValues(address, defaultNetwork, defaultContext)
    }

    export function setNetwork(network: String): void {
        dataSourceMock.setReturnValues(defaultAddress, network, defaultContext)
    }

    export function setContext(context: DataSourceContext): void {
        dataSourceMock.setReturnValues(defaultAddress, defaultNetwork, context)
    }

    export function setAddressAndNetwork(address: String, network: String): void {
        dataSourceMock.setReturnValues(address, network, defaultContext)
    }

    export function setAddressAndContext(address: String, context: DataSourceContext): void {
        dataSourceMock.setReturnValues(address, defaultNetwork, context)
    }

    export function setNetworkAndContext(network: String, context: DataSourceContext): void {
        dataSourceMock.setReturnValues(defaultAddress, network, context)
    }

    export function resetValues(): void {
        dataSourceMock.setReturnValues(defaultAddress, defaultNetwork, defaultContext)
    }
}