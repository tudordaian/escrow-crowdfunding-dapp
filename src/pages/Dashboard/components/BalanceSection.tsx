import {useGetAccount} from "@multiversx/sdk-dapp/hooks/account/useGetAccount";
import {FormatAmount} from "@multiversx/sdk-dapp/UI";

export const BalanceSection = () => {
    const {balance} = useGetAccount();

    return (
        <div>
            <p>Balance:</p>
            <FormatAmount
                value={balance}
                showLabel={true}
                egldLabel="xEGLD"
            />
        </div>
    );
}