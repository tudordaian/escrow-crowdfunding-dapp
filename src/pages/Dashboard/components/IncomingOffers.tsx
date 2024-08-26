import {
    Address,
    Token,
    TokenTransfer,
} from "@multiversx/sdk-core/out";
import {useEffect} from "react";
import {ContractAddressEnum} from "../../../localConstants/addresses";
import {TxProps} from "../types";
import {useGetAccount} from "@multiversx/sdk-dapp/hooks/account/useGetAccount";
import {sendTransactions} from "@multiversx/sdk-dapp/services";
import {IncomingOffersTable} from "./IncomingOffersTable.tsx";
import {useSmartContractFactory} from "../hooks";
import {useFetchOffers} from "../hooks/useFetchOffers.tsx";

export const IncomingOffers = ({ success, abi }: TxProps) => {
    const {address} = useGetAccount();
    const { offers: wantedOffers, fetchOffers: getIncomingOffers } = useFetchOffers('getWantedOffers', abi);
    const factory = useSmartContractFactory(abi);

    useEffect(() => {
        if (success) {
            getIncomingOffers();
        }
    }, [success]);

    useEffect(() => {
        getIncomingOffers();
    }, [abi]);


    const acceptOffer = async (offerId: string) => {
        const offer = wantedOffers.find(offer => offer.id === offerId);
        if (!offer) {
            console.error("Offer not found");
            return;
        }

        let args = [offerId];
        const tx = factory.createTransactionForExecute({
            sender: Address.fromBech32(address),
            contract: Address.fromBech32(ContractAddressEnum.escrow),
            function: "acceptOffer",
            gasLimit: 30000000n,
            arguments: args,
            tokenTransfers: [
                new TokenTransfer({
                    token: new Token({identifier: offer.wanted_token}),
                    amount: BigInt(offer.wanted_amount)
                })
            ]
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
        <div className='flex justify-center items-center my-4'>
            <div className='flex flex-col py-2 items-center justify-center gap-4 rounded-3xl bg-[#f6f8fa] shadow-xl max-w-'>
                <h2 className='text-2xl my-2 mx-4'>Incoming Offers</h2>
                <IncomingOffersTable wantedOffers={wantedOffers} acceptOffer={acceptOffer} getIncomingOffers={getIncomingOffers}/>
            </div>
        </div>
    );
}