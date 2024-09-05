import { FC } from 'react';
import { Field, ErrorMessage } from 'formik';
import {ProposedOfferProps} from "../types";


export const ProposedOffer: FC<ProposedOfferProps> = ({ tokens }) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='relative flex items-center gap-2'>
                <label htmlFor="offeredToken" className='text-lg pr-2'>Offered token:</label>
                <Field as="select" id="offeredToken" name="offeredToken"
                       className='p-2 shadow-sm text-gray-600 rounded-3xl hover:rounded-xl hover:text-white hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'>
                    {tokens.map((token, index) => (
                        <option key={index} value={token}>
                            {token}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name="offeredToken" component="div" className="absolute text-red-500 -top-6"/>
            </div>
            <div className='relative flex items-center gap-2 ml-4'>
                <label htmlFor="offeredAmount" className='text-lg pr-2'>Offered amount:</label>
                <Field type="number" id="offeredAmount" name="offeredAmount" step="any" min={0}
                       className='p-2 border rounded shadow-sm'/>
                <ErrorMessage name="offeredAmount" component="div" className="absolute text-red-500 -top-6"/>
            </div>
        </div>
    );
};

