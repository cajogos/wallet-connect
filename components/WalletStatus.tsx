import React from "react";
import IMetaMaskListener from "../interfaces/IMetaMaskListener";
import MetaMaskWallet from "../lib/MetaMaskWallet";

type MyState = {
    connectedNetwork: string,
    selectedAccount: string
};

class WalletStatus extends React.Component<{}, MyState> implements IMetaMaskListener
{
    constructor(props: any)
    {
        super(props);

        this.state = {
            connectedNetwork: MetaMaskWallet.getInstance().getCurrentNetwork()?.toString(),
            selectedAccount: MetaMaskWallet.getInstance().getCurrentAccount()
        };

        MetaMaskWallet.getInstance().addListener(this);
    }

    public handleAccountChangedEvent(account: string): void
    {
        this.setState({
            selectedAccount: account
        });
    }

    public handleNetworkChangedEvent(network: number): void
    {
        this.setState({
            connectedNetwork: network.toString()
        });
    }

    render()
    {
        return (
            <div suppressHydrationWarning={true}>
                {process.browser && <p><strong>Network: </strong>{this.state.connectedNetwork}</p>}
                {process.browser && <p><strong>Selected Account: </strong>{this.state.selectedAccount}</p>}
            </div>
        );
    }
}

export default WalletStatus;