import { useState, useEffect } from 'react';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { QueryRunnerAdapter, SmartContractQueriesController } from '@multiversx/sdk-core';
import { ContractAddressEnum } from '../../../localConstants/addresses';
import { Offer } from '../types';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks/account/useGetAccount';

export const useFetchOffers = (functionName: string, abi: any) => {
    const { address } = useGetAccount();
    const [offers, setOffers] = useState<Offer[]>([]);

    const fetchOffers = async () => {
        try {
            if (!abi) {
                console.error('ABI not loaded');
                return;
            }
            const apiNetworkProvider = new ApiNetworkProvider('https://devnet-api.multiversx.com');
            const queryRunner = new QueryRunnerAdapter({ networkProvider: apiNetworkProvider });
            const queryController = new SmartContractQueriesController({ queryRunner, abi });
            const query = queryController.createQuery({
                contract: ContractAddressEnum.escrow,
                function: functionName,
                arguments: [address],
            });
            const response = await queryController.runQuery(query);
            const [fetchedOffers] = queryController.parseQueryResponse(response);

            const parsedOffers = fetchedOffers.map((offer: any) => ({
                id: offer[0],
                token_identifier: offer[1].offered_payment.token_identifier,
                amount: offer[1].offered_payment.amount.toString(),
                creator_address: offer[1].accepted_address,
                wanted_token: offer[1].accepted_payment.token_identifier,
                wanted_amount: offer[1].accepted_payment.amount.toString(),
            }));
            setOffers(parsedOffers);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, [abi]);

    return { offers, fetchOffers };
};