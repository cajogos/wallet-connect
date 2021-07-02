import React from "react";

class WalletButton extends React.Component
{
    constructor(props: any)
    {
        super(props);
    }

    handleClick()
    {
        console.log('Wallet button was clicked');
    }

    render()
    {
        return <button onClick={this.handleClick}>Test</button>;
    }
}

export default WalletButton;