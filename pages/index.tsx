import WalletButton from "../components/WalletButton";
import WalletStatus from "../components/WalletStatus";

export default function Homepage()
{
    return (
        <div>
            <h1>Wallet Connect - Tests</h1>
            <WalletStatus />
            <WalletButton />
        </div>
    );
}
