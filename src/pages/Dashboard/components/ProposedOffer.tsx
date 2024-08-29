import {FC} from 'react';
import {ProposedOfferProps} from "../types";

export const ProposedOffer: FC<ProposedOfferProps> = ({ tokens, offeredToken, setOfferedToken, offeredAmount, setOfferedAmount }) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='flex items-center gap-2'>
                <label htmlFor="token" className='text-lg pr-2'>Offered token:</label>
                <select id="token" value={offeredToken} onChange={(e) => setOfferedToken(e.target.value)}
                        className='p-2 shadow-sm text-gray-600 rounded-3xl hover:rounded-xl hover:text-white hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'>
                    {tokens.map((token, index) => (
                        <option key={index} value={token}>
                            {token}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center gap-2 ml-4'>
                <label htmlFor="amount" className='text-lg pr-2'>Offered amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={offeredAmount}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (parseFloat(value) >= 0) {
                            setOfferedAmount(value);
                        }
                    }}
                    step="any"
                    min={0}
                    className='p-2 border rounded shadow-sm'
                />
            </div>
        </div>
    );
};