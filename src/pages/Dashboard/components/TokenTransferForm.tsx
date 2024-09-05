import {useGetAccount} from '@multiversx/sdk-dapp/hooks';
import {ContractAddressEnum, WalletAddressEnum} from "../../../localConstants/addresses";
import {Address, Token, TokenTransfer, Transaction} from "@multiversx/sdk-core/out";
import {parseAmount} from "@multiversx/sdk-dapp/utils";
import {useFetchTokens} from "../hooks";
import {useSmartContractFactory} from "../../../utils/hooks";
import {hasEnoughBalance, sendTx} from "../../../utils";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {ProposedOffer} from "./ProposedOffer";
import {WantedOffer} from "./WantedOffer.tsx";
import {DestinationAddress} from "./DestinationAddress.tsx";

const validationSchema = Yup.object({
    offeredToken: Yup.string(),
    offeredAmount: Yup.number().min(0, 'Offered amount must be greater than or equal to 0').required('Offered amount is required'),
    wantedToken: Yup.string(),
    wantedAmount: Yup.number().min(0, 'Wanted amount must be greater than or equal to 0').required('Wanted amount is required'),
    destinationAddress: Yup.string().oneOf([WalletAddressEnum.firstWallet, WalletAddressEnum.secondWallet], 'Invalid destination address').required('Destination address is required')
});

const initialValues = {
    offeredToken: '',
    offeredAmount: '',
    wantedToken: '',
    wantedAmount: '',
    destinationAddress: WalletAddressEnum.firstWallet
};

export const TokenTransferForm = ({ abi }: { abi: any }) => {
    const {address} = useGetAccount();
    const { tokens } = useFetchTokens(address);
    const factory = useSmartContractFactory(abi);

    const createOffer = async (values: any): Promise<Transaction | null> => {
        const { balance, hasEnough } = await hasEnoughBalance(address, values.offeredToken, values.offeredAmount);
        if (!hasEnough) {
            alert(`Not enough balance. Your balance is ${balance}`);
            return null;
        }
        let args = [values.wantedToken, 0, parseAmount(values.wantedAmount), values.destinationAddress];
        return factory.createTransactionForExecute({
            sender: Address.fromBech32(address),
            contract: Address.fromBech32(ContractAddressEnum.escrow),
            function: "createOffer",
            gasLimit: 30000000n,
            arguments: args,
            tokenTransfers: [
                new TokenTransfer({
                    token: new Token({identifier: values.offeredToken}),
                    amount: BigInt(parseAmount(values.offeredAmount))
                })
            ]
        });
    };

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        const tx = await createOffer(values);
        if (tx) {
            await sendTx(tx, address);
        } else {
            console.error("Failed to create transaction");
        }
        setSubmitting(false);
    };

    return (
        <div className='flex justify-center items-center p-4 '>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa] shadow-xl'>
                        <h1 className='text-4xl text-center my-4 text-gray-500 font-ubuntu'>Escrow SC</h1>
                        <div className='font-ubuntu'>Wallet address: {address}</div>

                        <ProposedOffer tokens={tokens} />
                        <WantedOffer tokens={tokens} />
                        <DestinationAddress />

                        <button type="submit" disabled={isSubmitting} className='p-2 bg-gray-200 shadow-sm text-xl text-gray-600 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer w-full'>
                            Submit offer
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};