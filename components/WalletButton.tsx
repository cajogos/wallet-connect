import React from "react";
import MetaMaskWallet from "../lib/MetaMaskWallet";
import IMetaMaskListener from "../interfaces/IMetaMaskListener";

type MyProps = {
    buttonText: string
};
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
        let accounts = await MetaMaskWallet.getInstance().requestAccounts();
        this.enable();
    }
    
    render()
    {
        return (
            <div>
                <button onClick={this.handleClick.bind(this)} disabled={this.state.disabled}>
                    <span>{this.props.buttonText}</span>
                </button>
            </div>
        );
    }
}
    
export default WalletButton;