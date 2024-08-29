import {useEffect} from "react";
import {
    Address,
} from "@multiversx/sdk-core/out";
import {ContractAddressEnum} from "../../../localConstants/addresses";
import {sendTransactions} from "@multiversx/sdk-dapp/services";
import {useGetAccount} from "@multiversx/sdk-dapp/hooks/account/useGetAccount";
import {OutgoingOffersTable} from "./OutgoingOffersTable.tsx";
import {useFetchOffers} from "../hooks";
import {TxProps} from "../types";
import {useSmartContractFactory} from "../../../utils/hooks";

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
        <div className='flex justify-center items-center my-2'>
            <div className='flex flex-col items-center justify-center rounded-3xl bg-[#f6f8fa] shadow-xl max-w-'>
                <h2 className='text-2xl text-gray-500 my-3 mx-4'>Outgoing Offers</h2>
                <OutgoingOffersTable createdOffers={createdOffers} cancelOffer={cancelOffer} getCreatedOffers={getCreatedOffers}/>
            </div>
        </div>
    );
};