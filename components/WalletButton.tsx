import React from "react";
import MetaMaskWallet from "../lib/MetaMaskWallet";
import IMetaMaskListener from "../interfaces/IMetaMaskListener";

type MyProps = {};
type MyState = {
    connected: boolean,
    disabled: boolean
};

class WalletButton extends React.Component<MyProps, MyState> implements IMetaMaskListener
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            connected: false,
            disabled: false
        };

        MetaMaskWallet.getInstance().addListener(this);
    }

    componentDidMount()
    {
        this.setState({
            connected: MetaMaskWallet.getInstance().isConnected()
        });
    }

    private enable()
    {
        this.setState({
            disabled: false
        });
    }

    private disable()
    {
        this.setState({
            disabled: true
        });
    }

    public handleAccountChangedEvent(account: string): void
    {}

    public handleNetworkChangedEvent(network: number): void
    {}

    private async handleClick()
    {
        this.disable();
        const result = await MetaMaskWallet.getInstance().requestAccounts();
        if (result)
        {
            this.setState({
                connected: true
            });
        }
    }
    
    render()
    {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)} disabled={this.state.disabled || this.state.connected}>
                    <span>{this.state.connected ? 'Connected' : 'Not Connected'}</span>
                </button>
            </div>
        );
    }
}
    
export default WalletButton;