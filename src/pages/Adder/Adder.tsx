import { AuthRedirectWrapper } from "../../wrappers/AuthRedirectWarapper";
import {useGetAccount, useGetActiveTransactionsStatus} from "@multiversx/sdk-dapp/hooks";
import {useFetchAbi, useSmartContractFactory} from "../../utils/hooks";
import {FormEvent, useEffect, useState} from "react";
import {SlRefresh} from "react-icons/sl";
import {Address, QueryRunnerAdapter, SmartContractQueriesController, Transaction} from "@multiversx/sdk-core/out";
import {sendTx} from "../../utils";
import {ContractAddressEnum} from "../../localConstants/addresses";
import {ApiNetworkProvider} from "@multiversx/sdk-network-providers/out";

export const Adder = () => {
    const [amount, setAmount] = useState('');
    const [sum, setSum] = useState(0);
    const {address} = useGetAccount();
    const {success} = useGetActiveTransactionsStatus();
    const abi = useFetchAbi("adder.abi.json");
    const factory = useSmartContractFactory(abi);

    const createTx = async (): Promise<Transaction | null> => {
        return factory.createTransactionForExecute({
            sender: Address.fromBech32(address),
            contract: Address.fromBech32(ContractAddressEnum.adder),
            function: "add",
            gasLimit: 30000000n,
            arguments: [BigInt(amount)]
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const tx = await createTx();
        if (tx) {
            await sendTx(tx, address);
        } else {
            console.error("Failed to create transaction");
        }
    }

    const fetchSum = async () => {
        try {
            if (!abi) {
                console.error('ABI not loaded');
                return;
            }
            const apiNetworkProvider = new ApiNetworkProvider('https://devnet-api.multiversx.com');
            const queryRunner = new QueryRunnerAdapter({ networkProvider: apiNetworkProvider });
            const queryController = new SmartContractQueriesController({ queryRunner, abi });
            const query = queryController.createQuery({
                contract: ContractAddressEnum.adder,
                function: 'getSum',
                arguments: [],
            });
            const response = await queryController.runQuery(query);
            const [sum] = queryController.parseQueryResponse(response);
            setSum(sum.c[0]);
        } catch (error) {
            console.error('Error fetching sum:', error);
        }
    };

    useEffect(() => {
        fetchSum();
    }, [abi]);

    useEffect(() => {
        if (success) {
            fetchSum();
        }
    }, [success]);

    return (
        <AuthRedirectWrapper>
            <div className='flex justify-center items-center p-4'>
                <div className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa] shadow-2xl'>
                    <div className='text-4xl text-center my-4 text-gray-500 font-ubuntu'>Adder SC</div>
                    <div>
                        <label htmlFor="addInput" className='text-2xl pr-2 text-gray-500'>Amount:</label>
                        <input
                            type="number"
                            id="addInput"
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (parseFloat(value) >= 0) {
                                    setAmount(value);
                                }
                            }}
                            step="any"
                            min={0}
                            className='p-2 border rounded shadow-sm w-1/3 mx-5'
                        />
                        <button onClick={handleSubmit}
                            className='p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                            Add
                        </button>
                    </div>

                    <div className='mr-3'>
                        <label htmlFor="addInput" className='text-2xl text-gray-500'>Sum: </label>
                        <label id="dynamicLabel" className='text-2xl text-gray-500'>{sum}</label>
                    </div>
                    <button
                        className='items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                        <SlRefresh size={30}/>
                    </button>
                </div>
            </div>
        </AuthRedirectWrapper>
    );
};
