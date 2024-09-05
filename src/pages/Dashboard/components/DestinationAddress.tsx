import {WalletAddressEnum} from "../../../localConstants/addresses";
import {ErrorMessage, Field} from "formik";

export const DestinationAddress = () => {
    return (
        <div className='flex justify-between w-full mt-4'>
            <div className='flex items-center gap-2'>
                <label htmlFor="destinationAddress" className='text-lg pr-2'>Destination:</label>
                <Field as="select" id="destinationAddress" name="destinationAddress"
                       className='p-2 mx-6 border px-3.5 text-gray-600 rounded-3xl hover:rounded-xl hover:text-white hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'>
                    <option value={WalletAddressEnum.firstWallet}>First wallet</option>
                    <option value={WalletAddressEnum.secondWallet}>Second wallet</option>
                </Field>
                <ErrorMessage name="destinationAddress" component="div" className="text-red-500"/>
            </div>
        </div>
    );
};