import React from "react";
import IMetaMaskListener from "../interfaces/IMetaMaskListener";
import MetaMaskWallet from "../lib/MetaMaskWallet";

type MyState = {
    networkId: number,
    networkName: string,
    selectedAccount: string
};

class WalletStatus extends React.Component<{}, MyState> implements IMetaMaskListener
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            networkId: null,
            networkName: null,
            selectedAccount: null
        };

        MetaMaskWallet.getInstance().addListener(this);
    }

    componentDidMount()
    {
        this.refreshWalletState();
    }

    private refreshWalletState()
    {
        let wallet = MetaMaskWallet.getInstance();
        this.setState({
            networkId: wallet.getCurrentNetwork(),
            networkName: MetaMaskWallet.getNetworkName(wallet.getCurrentNetwork()),
            selectedAccount: wallet.getCurrentAccount()
        });   
    }

    public handleAccountChangedEvent(account: string): void
    {
        this.refreshWalletState();
    }

    public handleNetworkChangedEvent(network: number): void
    {
        this.refreshWalletState();
    }

    render()
    {
        return (
            <div suppressHydrationWarning={true}>
                {process.browser && <p><strong>Network: </strong>{this.state.networkId} ({this.state.networkName})</p>}
                {process.browser && <p><strong>Selected Account: </strong>{this.state.selectedAccount}</p>}
            </div>
        );
    }
}

export default WalletStatus;