import React from "react";
import MetaMaskWallet from "../lib/MetaMaskWallet";

class WalletStatus extends React.Component
{
    wallet: MetaMaskWallet;
    connectedNetwork: string;

    constructor(props: any)
    {
        super(props);
        this.wallet = new MetaMaskWallet();

        this.connectedNetwork = 'test';
    }

    render()
    {
        return (
            <div>
                <p><strong>Network: </strong>{this.connectedNetwork}</p>
            </div>
        );
    }
}

export default WalletStatus;