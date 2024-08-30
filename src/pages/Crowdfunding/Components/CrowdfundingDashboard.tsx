import {FC} from "react";
import {CrowdfundingDashboardProps} from "../Types";

export const CrowdfundingDashboard: FC<CrowdfundingDashboardProps> = ({ tokens, offeredToken, setOfferedToken, setAmount, handleSubmit }) => {
    return (
        <div className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa] shadow-2xl m-4 min-h-[362px]'>
            <div className='text-4xl text-center my-4 text-gray-500 font-ubuntu'>Crowdfunding SC</div>
            <div className='flex items-center gap-2'>
                <label htmlFor="token" className='text-2xl pr-2 text-gray-500'>Offered token:</label>
                <select id="token" value={offeredToken} onChange={(e) => setOfferedToken(e.target.value)}
                        className='items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                    {tokens.map((token, index) => (
                        <option key={index} value={token}>
                            {token}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="addInput" className='text-2xl pr-2 text-gray-500'>Fund amount:</label>
                <input
                    type="number"
                    id="addInput"
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
            </div>
            <button
                onClick={() => handleSubmit('fund')}
                className='items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                Send funds
            </button>
            <button
                onClick={() => handleSubmit('claim')}
                className='items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                Claim funds
            </button>
        </div>
    );
};