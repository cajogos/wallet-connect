class MetaMaskWallet
{
    isReady: boolean;

    constructor()
    {
        // Make sure that the extension is installed and it is MetaMask
        if (typeof ethereum !== 'undefined')
        {
            this.isReady = ethereum.isMetaMask;
        }
        if (this.isReady)
        {
            this.init();
        }
    }

    init(): void
    {
        console.log('wallet to start!');
    }

    getCurrentNetwork(): string
    {
        return ethereum.networkVersion;
    }

    getCurrentAccount(): string|null
    {
        return ethereum.selectedAddress;
    }
}

export default MetaMaskWallet;