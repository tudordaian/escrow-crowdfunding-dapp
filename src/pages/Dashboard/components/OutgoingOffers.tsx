import {useEffect} from "react";
import {
    Address,
} from "@multiversx/sdk-core/out";
import {ContractAddressEnum} from "../../../localConstants/addresses";
import {sendTransactions} from "@multiversx/sdk-dapp/services";
import {useGetAccount} from "@multiversx/sdk-dapp/hooks/account/useGetAccount";
import {OutgoingOffersTable} from "./OutgoingOffersTable.tsx";
import {useSmartContractFactory} from "../hooks";
import {useFetchOffers} from "../hooks/useFetchOffers.tsx";
import {TxProps} from "../types";

export const OutgoingOffers = ({ success, abi }: TxProps) => {
    const {address} = useGetAccount();
    const { offers: createdOffers, fetchOffers: getCreatedOffers } = useFetchOffers('getCreatedOffers', abi);
    const factory = useSmartContractFactory(abi);

    useEffect(() => {
        getCreatedOffers();
    }, [abi]);

    useEffect(() => {
        if (success) {
            getCreatedOffers();
        }
    }, [success]);

    const cancelOffer = async (offerId: string) => {
        let args = [offerId];
        const tx = factory.createTransactionForExecute({
            sender: Address.fromBech32(address),
            contract: Address.fromBech32(ContractAddressEnum.escrow),
            function: "cancelOffer",
            gasLimit: 30000000n,
            arguments: args
        });
        await sendTransactions({
            transactions: [tx],
            transactionsDisplayInfo: {
                processingMessage: "Processing transaction",
                errorMessage: "An error has occured",
                successMessage: "Transaction successful",
            },
            signWithoutSending: false,
        });
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa] shadow-xl'>
                <h2 className='text-2xl'>Outgoing Offers</h2>
                <button onClick={getCreatedOffers} className='p-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
                    Refresh Outgoing Offers
                </button>
                <OutgoingOffersTable createdOffers={createdOffers} cancelOffer={cancelOffer}/>
            </div>
        </div>
    );
};