import { useState, useEffect } from 'react';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { QueryRunnerAdapter, SmartContractQueriesController } from '@multiversx/sdk-core/out';
import { ContractAddressEnum } from '../../../localConstants/addresses';

export const useFetchTokenId = (abi: any, functionName: string) => {
    const [data, setData] = useState<any>(null);
    const fetchTokenId = async () => {
        try {
            if (!abi) {
                console.error('ABI not loaded');
                return;
            }
            const apiNetworkProvider = new ApiNetworkProvider('https://devnet-api.multiversx.com');
            const queryRunner = new QueryRunnerAdapter({ networkProvider: apiNetworkProvider });
            const queryController = new SmartContractQueriesController({ queryRunner, abi });
            const query = queryController.createQuery({
                contract: ContractAddressEnum.crowdfunding_esdt,
                function: functionName,
                arguments: [],
            });
            const response = await queryController.runQuery(query);
            const [result] = queryController.parseQueryResponse(response);
            setData(result);
        } catch (err) {
            console.error('Error fetching data ' + err);
        }
    };

    useEffect(() => {
        fetchTokenId();
    }, [abi, functionName]);

    return { data, fetchTokenId: fetchTokenId};
};