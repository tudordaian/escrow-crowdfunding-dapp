import { FC } from 'react';
import {WantedOfferProps} from "../types";


export const WantedOffer: FC<WantedOfferProps> = ({ tokens, wantedToken, setWantedToken, wantedAmount, setWantedAmount }) => {
    return (
        <div className='flex justify-between w-full mt-4'>
            <div className='flex items-center gap-2'>
                <label htmlFor="wantedToken" className='text-lg pr-2'>Wanted token:</label>
                <select id="wantedToken" value={wantedToken} onChange={(e) => setWantedToken(e.target.value)} className='p-2 border rounded'>
                    {tokens.map((token, index) => (
                        <option key={index} value={token}>
                            {token}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center gap-2 ml-4'>
                <label htmlFor="wantedAmount" className='text-lg pr-2'>Wanted amount:</label>
                <input
                    type="number"
                    id="wantedAmount"
                    value={wantedAmount}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (parseFloat(value) >= 0) {
                            setWantedAmount(value);
                        }
                    }}
                    step="any"
                    min={0}
                    className='p-2 border rounded'
                />
            </div>
        </div>
    );
};