import {FC} from 'react';
import {WantedOfferProps} from "../types";
import {ErrorMessage, Field} from "formik";

export const WantedOffer: FC<WantedOfferProps> = ({ tokens }) => {
    return (
        <div className='flex justify-between w-full mt-4'>
            <div className='relative flex items-center gap-2'>
                <label htmlFor="wantedToken" className='text-lg pr-2'>Wanted token:</label>
                <Field as="select" id="wantedToken" name="wantedToken"
                       className='p-2 shadow-sm text-gray-600 rounded-3xl hover:rounded-xl hover:text-white hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'>
                    {tokens.map((token, index) => (
                        <option key={index} value={token}>
                            {token}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name="wantedToken" component="div" className="absolute text-red-500 -top-6"/>
            </div>
            <div className='relative flex items-center gap-2 ml-4'>
                <label htmlFor="wantedAmount" className='text-lg pr-2'>Wanted amount:</label>
                <Field type="number" id="wantedAmount" name="wantedAmount" step="any" min={0}
                       className='p-2 border rounded shadow-sm'/>
                <ErrorMessage name="wantedAmount" component="div" className="absolute text-red-500 -top-6"/>
            </div>
        </div>
    );
};

