import {FC} from "react";
import {ScStatsProps} from "../Types";
import {SlRefresh} from "react-icons/sl";

export const ScStats: FC<ScStatsProps> = ({ scStatus, scTokenId, scTarget, scCurrentSum, scYourDeposit, refreshStats }) => {
    return (
        <div className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa] shadow-2xl m-4'>
            <div className='flex flex-col py-1 gap-4'>
                <label
                    id="dynamicLabel"
                    className='py-1 items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out'>
                    Status: {scStatus}
                </label>
                <label
                    id="dynamicLabel"
                    className='py-1 items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out'>
                    Required token: {scTokenId}
                </label>
                <label
                    id="dynamicLabel"
                    className='py-1 items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out'>
                    Target amount: {scTarget}
                </label>
                <label
                    id="dynamicLabel"
                    className='py-1 items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out'>
                    Current amount: {scCurrentSum}
                </label>
                <label
                    id="dynamicLabel"
                    className='py-1 items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out'>
                    Your deposit: {scYourDeposit}
                </label>
            </div>
            <div>
                <button
                    onClick={refreshStats}
                    className='items-center p-2 bg-gray-200 shadow-sm text-xl text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                    <SlRefresh size={30}/>
                </button>
            </div>
        </div>
    );
};