import { useMemo } from 'react';
import { SmartContractTransactionsFactory, TransactionsFactoryConfig } from '@multiversx/sdk-core';

export const useSmartContractFactory = (abi: any) => {
    return useMemo(() => {
        const factoryConfig = new TransactionsFactoryConfig({ chainID: 'D' });
        return new SmartContractTransactionsFactory({
            config: factoryConfig,
            abi: abi
        });
    }, [abi]);
};