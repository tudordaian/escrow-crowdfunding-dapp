import { AuthRedirectWrapper } from "../../wrappers/AuthRedirectWarapper";
import {TokenTransferForm} from "./components/TokenTransferForm.tsx";
import {OutgoingOffers} from "./components/OutgoingOffers.tsx";
import {IncomingOffers} from "./components/IncomingOffers.tsx";
import {useGetActiveTransactionsStatus} from "@multiversx/sdk-dapp/hooks";
import {useFetchAbi} from "./hooks";

export const Dashboard = () => {
    const {success} = useGetActiveTransactionsStatus();
    const abi = useFetchAbi("escrow.abi.json");
    return (
        <AuthRedirectWrapper>

            {abi && <TokenTransferForm abi={abi} />}
            {abi && (
                <div className='p-4'>
                    <OutgoingOffers success={success} abi={abi} />
                </div>
            )}
            {abi && (
                <div className='p-4'>
                    <IncomingOffers success={success} abi={abi} />
                </div>
            )}
        </AuthRedirectWrapper>
    );
}