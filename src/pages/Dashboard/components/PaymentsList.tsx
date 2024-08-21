import {useEffect, useState} from "react";

import {QueryRunnerAdapter, SmartContractQueriesController} from "@multiversx/sdk-core";
import {ApiNetworkProvider} from "@multiversx/sdk-network-providers";
import {
    AbiRegistry,
    Address,
    SmartContractTransactionsFactory,
    TransactionsFactoryConfig
} from "@multiversx/sdk-core/out";
import {ContractAddressEnum, WalletAddressEnum} from "../../../localConstants/addresses";
import {sendTransactions} from "@multiversx/sdk-dapp/services";

import {useGetActiveTransactionsStatus} from "@multiversx/sdk-dapp/hooks";

interface Offer {
    id: string;
    token_identifier: string;
    amount: string;
    creator_address: string;
}

const convertDenominatedValue = (value: string): string => {
    try {
        const bigIntValue = BigInt(value);
        const humanReadableValue = Number(bigIntValue) / 1e18;
        return humanReadableValue.toString();
    } catch (error) {
        console.error("Invalid BigInt value:", value);
        return "0";
    }
};

export const PaymentList = ({abi}: { abi: AbiRegistry }) => {
    const [createdOffers, setCreatedOffers] = useState<Offer[]>([]);
    const [queryRun, setQueryRun] = useState(false);
    const {success} = useGetActiveTransactionsStatus();

    useEffect(() => {
        if (success) {
            getCreatedOffers()
        }
    }, [success]);

    const getCreatedOffers = async () => {
        const apiNetworkProvider = new ApiNetworkProvider("https://devnet-api.multiversx.com");
        const queryRunner = new QueryRunnerAdapter({
            networkProvider: apiNetworkProvider
        });
        let queryController = new SmartContractQueriesController({
            queryRunner: queryRunner,
            abi: abi
        });
        const query = queryController.createQuery({
            contract: ContractAddressEnum.escrow,
            function: "getCreatedOffers",
            arguments: [
                WalletAddressEnum.myWallet
            ],
        });
        const response = await queryController.runQuery(query);
        const [createdOffers] = queryController.parseQueryResponse(response);
        console.log(createdOffers);

        const parsedOffers = createdOffers.map((offer: any) => ({
            id: offer[0],
            token_identifier: offer[1].offered_payment.token_identifier,
            amount: convertDenominatedValue(offer[1].offered_payment.amount.toString()),
            creator_address: offer[1].accepted_address
        }));

        setCreatedOffers(parsedOffers);
        setQueryRun(true);
    }

    const cancelOffer = async (offerId: string) => {
        const factoryConfig = new TransactionsFactoryConfig({chainID: "D"});
        let factory = new SmartContractTransactionsFactory({
            config: factoryConfig,
            abi: abi
        });

        let args = [offerId];
        const tx = factory.createTransactionForExecute({
            sender: Address.fromBech32(WalletAddressEnum.myWallet),
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
            <div className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'>
                <h2 className='text-2xl'>Payments</h2>
                <button onClick={getCreatedOffers} className='p-2 bg-blue-500 text-white rounded hover:bg-blue-700'>Get
                    Payments
                </button>
                <table className='min-w-full divide-y divide-gray-200'>
                    {queryRun && (
                        <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Token
                                Identifier
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Creator
                                Address
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                        </tr>
                        </thead>
                    )}
                    <tbody className='bg-white divide-y divide-gray-200'>
                    {createdOffers.map((offer: Offer) => (
                        <tr key={offer.id}>
                            <td className='px-6 py-4 whitespace-nowrap'>{offer.id.toString()}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{offer.token_identifier.toString()}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{offer.amount.toString()}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{offer.creator_address.toString()}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button onClick={() => cancelOffer(offer.id)}
                                        className='p-2 bg-red-500 text-white rounded hover:bg-red-700'>Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};