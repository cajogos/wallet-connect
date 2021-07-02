declare const ethereum: {
    isMetaMask: boolean,
    networkVersion: string,
    selectedAddress: string|null,
    request: ({
        method: string
    }) => any,
    on: (string, func) => any
};