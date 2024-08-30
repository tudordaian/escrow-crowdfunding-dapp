import {AuthRedirectWrapper} from "../../wrappers/AuthRedirectWarapper";
import {useEffect, useState} from "react";
import {
    Address,
    Token,
    TokenTransfer,
    Transaction
} from "@multiversx/sdk-core/out";
import {ContractAddressEnum} from "../../localConstants/addresses";
import {sendTx} from "../../utils";
import {useFetchAbi, useSmartContractFactory} from "../../utils/hooks";
import {useGetAccount, useGetActiveTransactionsStatus} from "@multiversx/sdk-dapp/hooks";
import {parseAmount} from "@multiversx/sdk-dapp/utils";
import {useFetchTokens} from "../Dashboard/hooks";
import {ScStats} from "./Components/ScStats.tsx";
import {CrowdfundingDashboard} from "./Components/CrowdfundingDashboard.tsx";
import {useFetchStatus, useFetchYourDeposit, useFetchTokenId, useFetchTarget, useFetchCurrentSum} from "./hooks";

export const Crowdfunding = () => {
    const abi = useFetchAbi("crowdfunding-esdt.abi.json");
    const factory = useSmartContractFactory(abi);
    const {address} = useGetAccount();
    const { tokens, offeredToken, setOfferedToken } = useFetchTokens(address);
    const {success} = useGetActiveTransactionsStatus();
    const [amount, setAmount] = useState('');

    const { data: scStatus, fetchStatus: fetchScStatus } = useFetchStatus(abi, 'status');
    const { data: scTokenId, fetchTokenId: fetchScTokenId } = useFetchTokenId(abi, 'getCrowdfundingTokenIdentifier');
    const { data: scTarget, fetchTarget: fetchScTarget } = useFetchTarget(abi, 'getTarget');
    const { data: scCurrentSum, fetchCurrentSum: fetchScCurrentSum } = useFetchCurrentSum(abi, 'getCurrentFunds');
    const { data: scYourDeposit, fetchData: fetchScYourDeposit } = useFetchYourDeposit(abi, 'getDeposit', address);

    const refreshStats = async () => {
        await fetchScStatus();
        await fetchScTokenId();
        await fetchScTarget();
        await fetchScCurrentSum();
        await fetchScYourDeposit();
    }

    useEffect(() => {
        if (success) {
            refreshStats();
        }
    }, [success]);

    useEffect(() => {
        refreshStats();
    }, [abi]);

    const createTx = async (func: string): Promise<Transaction | null> => {
        switch (func) {
            case 'fund':
                if (offeredToken !== scTokenId) {
                    alert(`Invalid token, SC uses ${scTokenId}.`);
                    return null;
                }
                return factory.createTransactionForExecute({
                    sender: Address.fromBech32(address),
                    contract: Address.fromBech32(ContractAddressEnum.crowdfunding_esdt),
                    function: "fund",
                    gasLimit: 30000000n,
                    arguments: [],
                    tokenTransfers: [
                        new TokenTransfer({
                            token: new Token({identifier: offeredToken}),
                            amount: BigInt(parseAmount(amount))
                        })
                    ]
                });
            case 'claim':
                if (scStatus === 'FundingPeriod') {
                    alert('Cannot claim before deadline');
                    return null;
                }
                if (scStatus === 'Failed') {
                    alert('Funding failed. Funds were reverted to the depositors.');
                    return null;
                }
                return factory.createTransactionForExecute({
                    sender: Address.fromBech32(address),
                    contract: Address.fromBech32(ContractAddressEnum.crowdfunding_esdt),
                    function: "claim",
                    gasLimit: 30000000n,
                    arguments: []
                });
            default:
                return null;
        }
    };

    const handleSubmit = async (func: string) => {
        const tx = await createTx(func);
        if (tx) {
            await sendTx(tx, address);
        } else {
            console.error("Failed to create transaction");
        }
    }

    return (
        <div>
            <AuthRedirectWrapper>
                <div className='flex justify-center items-center p-4'>
                    <CrowdfundingDashboard
                        tokens={tokens}
                        offeredToken={offeredToken}
                        setOfferedToken={setOfferedToken}
                        setAmount={setAmount}
                        handleSubmit={handleSubmit}
                    />
                    <ScStats
                        scStatus={scStatus}
                        scTokenId={scTokenId}
                        scTarget={scTarget}
                        scCurrentSum={scCurrentSum}
                        scYourDeposit={scYourDeposit}
                        refreshStats={refreshStats}
                    />
                </div>
            </AuthRedirectWrapper>
        </div>
    );
}