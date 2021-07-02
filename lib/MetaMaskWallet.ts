import IMetaMaskListener from "../interfaces/IMetaMaskListener";

class MetaMaskWallet
{
    // Singleton Design Pattern
    private static instance: MetaMaskWallet;
    public static getInstance(): MetaMaskWallet
    {
        if (!MetaMaskWallet.instance)
        {
            MetaMaskWallet.instance = new MetaMaskWallet();
        }
        return MetaMaskWallet.instance;
    }

    private ready: boolean; // Wallet ready to use?
    private currentNetwork: number|null = null; // The currently connected network
    private currentAccount: string|null = null; // The selected account address

    // Listeners of the Wallet
    private listeners: IMetaMaskListener[] = [];
    public addListener(listener: IMetaMaskListener): void
    {
        this.listeners.push(listener);
    }

    private constructor()
    {
        // Make sure that the extension is installed and it is MetaMask
        if (typeof ethereum !== 'undefined')
        {
            this.ready = ethereum.isMetaMask;
        }
        if (this.ready)
        {
            this.init();
        }
    }

    private init(): void
    {
        this.currentNetwork = parseInt(ethereum.networkVersion);
        this.currentAccount = ethereum.selectedAddress;

        // Attach Events
        ethereum.on('accountsChanged', (accounts: Array<string>): void =>
        {
            this.handleAccountsChanged(accounts);
        });
        ethereum.on('chainChanged', (chainID: string): void =>
        {
            this.handleNetworkChanged(parseInt(chainID));
        });
        ethereum.on('message', (message: ProviderMessage): void =>
        {
            console.log('received message', message);
        });
        ethereum.on('connect', (connectInfo: ConnectInfo) =>
        {
            console.log('ethereum connect event', connectInfo);
        });
        ethereum.on('disconnect', (error: ProviderRpcError) =>
        {
            console.log('ethereum disconnect event', error);
        });
    }

    public isReady(): boolean
    {
        return this.ready;
    }

    public async requestAccounts(): Promise<boolean>
    {
        return new Promise((resolve, reject) => {
            ethereum.request({
                method: 'eth_requestAccounts'
            })
            .then((accounts: string[]) =>
            {
                if (accounts.length > 0)
                {
                    this.currentAccount = accounts[0];
                    resolve(true);
                }
                resolve(false);
            })
            .catch((error) =>
            {
                resolve(false);
            });
        });
    }

    private handleAccountsChanged(accounts: string[]): void
    {
        if (this.currentAccount !== accounts[0])
        {
            this.currentAccount = accounts[0];
            this.listeners.forEach((l) =>
            {
                l.handleAccountChangedEvent(this.currentAccount);
            });
        }
    }

    private handleNetworkChanged(chainID: number): void
    {
        if (this.currentNetwork !== chainID)
        {
            this.currentNetwork = chainID;
            this.listeners.forEach((l) =>
            {
                l.handleNetworkChangedEvent(this.currentNetwork);
            });
        }
    }

    public getCurrentNetwork(): number
    {
        return this.currentNetwork;
    }

    public static getNetworkName(chainID: number): string
    {
        switch (chainID)
        {
            case 1:
                return 'Ethereum Mainnet';
            case 3:
                return 'Ropsten Testnet';
            case 4:
                return 'Rinkeby Testnet';
            case 5:
                return 'Goerli Testnet';
            case 42:
                return 'Kovan Testnet';
        }
        return 'Unknown';
    }

    public getCurrentAccount(): string|null
    {
        return this.currentAccount;
    }
}

export default MetaMaskWallet;