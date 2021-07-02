export default interface IMetaMaskListener
{
    handleAccountChangedEvent(account: string): void;
    handleNetworkChangedEvent(network: number): void;
}