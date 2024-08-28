import {FormEvent, useState} from 'react';
import {useGetAccount} from '@multiversx/sdk-dapp/hooks'
import {ContractAddressEnum, WalletAddressEnum} from "../../../localConstants/addresses";
import {Address, Token, TokenTransfer, Transaction} from "@multiversx/sdk-core/out";
import {sendTransactions} from "@multiversx/sdk-dapp/services";
import {parseAmount} from "@multiversx/sdk-dapp/utils";
import {useFetchTokens} from "../hooks";
import {useSmartContractFactory} from "../../../utils/hooks";
import {ProposedOffer} from "./ProposedOffer.tsx";
import {WantedOffer} from "./WantedOffer.tsx";
import {DestinationAddress} from "./DestinationAddress.tsx";
import {hasEnoughBalance} from "../../../utils";

export const TokenTransferForm = ({ abi }: { abi: any }) => {
    const {address} = useGetAccount();
    const { tokens, offeredToken, setOfferedToken, wantedToken, setWantedToken } = useFetchTokens(address);
    const [offeredAmount, setOfferedAmount] = useState('');
    const [wantedAmount, setWantedAmount] = useState('');
    const [destinationAddress, setDestinationAddress] = useState<string>(WalletAddressEnum.firstWallet);
    const factory = useSmartContractFactory(abi);

    const createOffer = async (): Promise<Transaction | null> => {
        const { balance, hasEnough } = await hasEnoughBalance(address, offeredToken, offeredAmount);
        if (!hasEnough) {
            alert(`Not enough balance. Your balance is ${balance}`);
            return null;
        }
      let args = [wantedToken, 0, parseAmount(wantedAmount), destinationAddress];
        return factory.createTransactionForExecute({
            sender: Address.fromBech32(address),
            contract: Address.fromBech32(ContractAddressEnum.escrow),
            function: "createOffer",
            gasLimit: 30000000n,
            arguments: args,
            tokenTransfers: [
                new TokenTransfer({
                    token: new Token({identifier: offeredToken}),
                    amount: BigInt(parseAmount(offeredAmount))
                })
            ]
        });
    };

    const sendOffer = async (tx: Transaction) => {
        if (!address || !tx) {
            console.error("Address or transaction not found");
            return;
        }
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
        if (tx) {
            await sendOffer(tx);
        } else {
            console.error("Failed to create transaction");
        }
    }

    return (
        <div className='flex justify-center items-center p-4 '>
            <form onSubmit={handleSubmit}
                  className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa] shadow-xl'>
                <h1 className='text-4xl text-center my-4 text-gray-500 font-ubuntu'>Dashboard</h1>
                <div className='font-ubuntu'>Wallet address: {address}</div>
                <ProposedOffer
                    tokens={tokens}
                    offeredToken={offeredToken}
                    setOfferedToken={setOfferedToken}
                    offeredAmount={offeredAmount}
                    setOfferedAmount={setOfferedAmount}
                />
                <WantedOffer
                    tokens={tokens}
                    wantedToken={wantedToken}
                    setWantedToken={setWantedToken}
                    wantedAmount={wantedAmount}
                    setWantedAmount={setWantedAmount}
                />
                <DestinationAddress
                    destinationAddress={destinationAddress}
                    setDestinationAddress={setDestinationAddress}
                />
                <button type="submit"
                        className='p-2 bg-gray-200 shadow-sm text-xl text-gray-600 rounded-3xl hover:rounded-xl hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer w-full'>
                    Submit offer
                </button>
            </form>
        </div>
    );
};