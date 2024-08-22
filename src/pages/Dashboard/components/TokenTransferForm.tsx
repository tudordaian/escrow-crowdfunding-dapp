import {FormEvent, useEffect, useState} from 'react';
import {useGetAccount} from '@multiversx/sdk-dapp/hooks'
import {ContractAddressEnum} from "../../../localConstants/addresses";
import axios from "axios";

import {AbiRegistry, SmartContractTransactionsFactory, TransactionsFactoryConfig} from "@multiversx/sdk-core";
import {Address, Token, TokenTransfer, Transaction} from "@multiversx/sdk-core/out";

import {sendTransactions} from "@multiversx/sdk-dapp/services";
import {parseAmount} from "@multiversx/sdk-dapp/utils";


export const TokenTransferForm = ({abi}: {abi: AbiRegistry}) => {
    const {address} = useGetAccount();
    const [tokens, setTokens] = useState<string[]>([]);
    const [selectedToken, setSelectedToken] = useState<string>('');
    const [amount, setAmount] = useState('');
    const [tx, setTx] = useState<Transaction>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`https://devnet-api.multiversx.com/accounts/${address}/tokens`);
                const tokenIdentifiers = data.map((token: any) => token.identifier);
                setTokens(tokenIdentifiers);
                if (tokenIdentifiers.length > 0) {
                    setSelectedToken(tokenIdentifiers[0]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);


    const createOffer = async (): Promise<Transaction> => {
        const factoryConfig = new TransactionsFactoryConfig({chainID: "D"});
        let factory = new SmartContractTransactionsFactory({
            config: factoryConfig,
            abi: abi
        });

        let args = [selectedToken, 0, parseAmount(amount), address];

        const tx = factory.createTransactionForExecute({
            sender: Address.fromBech32(address),
            contract: Address.fromBech32(ContractAddressEnum.escrow),
            function: "createOffer",
            gasLimit: 30000000n,
            arguments: args,
            tokenTransfers: [
                new TokenTransfer({
                    token: new Token({identifier: selectedToken}),
                    amount: BigInt(parseAmount(amount))
                })
            ]
        });
        setTx(tx);
        return tx;
    };

    const sendOffer = async (tx: Transaction) => {
        if (!address || !tx) {
            console.error("Address or transaction not found");
            return;
        }
        console.log('sending tx', tx);
        await sendTransactions({
            transactions: [tx],
            transactionsDisplayInfo: {
                processingMessage: "Processing transaction",
                errorMessage: "An error has occured",
                successMessage: "Transaction successful",
            },
            signWithoutSending: false,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const tx = await createOffer();
        await sendOffer(tx);
    }

    useEffect(() => {
        console.log("tx", tx);
    }, [tx]);

    return (
        <div className='flex justify-center items-center p-4'>
            <form onSubmit={handleSubmit}
                  className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'>
                <div>Wallet address: {address}</div>
                <div className='flex justify-between w-full'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="token" className='text-lg'>Token:</label>
                        <select id="token" value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)}
                                className='p-2 border rounded'>
                            {tokens.map((token, index) => (
                                <option key={index} value={token}>
                                    {token}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="amount" className='text-lg'>Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (parseFloat(value) >= 0) {
                                    setAmount(value);
                                }
                            }}
                            step="any"
                            min={0}
                            className='p-2 border rounded'
                        />
                        <button type="submit"
                                className='p-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-2'>Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};