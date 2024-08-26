import { FC } from 'react';
import { WalletAddressEnum } from "../../../localConstants/addresses";

interface DestinationAddressProps {
    destinationAddress: string;
    setDestinationAddress: (address: string) => void;
}

export const DestinationAddress: FC<DestinationAddressProps> = ({ destinationAddress, setDestinationAddress }) => {
    return (
        <div className='flex justify-between w-full mt-4'>
            <div className='flex items-center gap-2'>
                <label htmlFor="destinationAddress" className='text-lg pr-2'>Destination:</label>
                <select id="destinationAddress" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)}
                        className='p-2 mx-6 border px-3.5 text-gray-600 rounded-3xl hover:rounded-xl hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'>
                    <option value={WalletAddressEnum.firstWallet}>First wallet</option>
                    <option value={WalletAddressEnum.secondWallet}>Second wallet</option>
                </select>
            </div>
        </div>
    );
};