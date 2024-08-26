import {Offer} from "../types";
import {formatAmount} from "@multiversx/sdk-dapp/utils";
import {useState} from "react";
import {SlArrowDown, SlArrowUp, SlRefresh, SlClose} from "react-icons/sl";

interface OffersTableProps {
    createdOffers: Offer[];
    cancelOffer: (offerId: string) => void;
    getCreatedOffers: () => void;
}

export const OutgoingOffersTable = ({createdOffers, cancelOffer, getCreatedOffers}: OffersTableProps) => {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <div>
            <button onClick={getCreatedOffers}
                    className='m-2 p-4 shadow-sm bg-gray-200 text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                <SlRefresh size={30}/>
            </button>
            <button onClick={() => setIsVisible(!isVisible)}
                    className='m-2 p-4 my-4 shadow-sm bg-gray-200 text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                {isVisible ? <SlArrowUp size={30}/> : <SlArrowDown size={30}/>}
            </button>
            {isVisible && (
                <table className='min-w-full divide-y divide-gray-200 my-5'>
                    <thead className='bg-gray-50'>
                    <tr className='px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        <th className='px-4 text-sm'>ID</th>
                        <th className='px-4 text-sm'>Offered token</th>
                        <th className='px-4 text-sm'>Offered amount</th>
                        <th className='px-4 text-sm'>Destination Address</th>
                        <th className='px-4 text-sm'>Wanted token</th>
                        <th className='px-4 text-sm'>Wanted amount</th>
                        <th className='px-4 text-sm'>Actions</th>
                    </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200 px-0'>
                    {createdOffers.map((offer: Offer) => (
                        <tr key={offer.id} className='bg-[#f6f8fa] whitespace-nowrap hover:bg-white'>
                            <td className='px-4'>{offer.id.toString()}</td>
                            <td className='px-4'>{offer.token_identifier.toString()}</td>
                            <td className='px-4'>{formatAmount({input: offer.amount})}</td>
                            <td className='px-4'>{offer.creator_address.toString()}</td>
                            <td className='px-4'>{offer.wanted_token.toString()}</td>
                            <td className='px-4'>{formatAmount({input: offer.wanted_amount})}</td>
                            <td>
                                <button onClick={() => cancelOffer(offer.id)}
                                        className='m-2 p-4 shadow-sm bg-gray-200 text-gray-500 rounded-3xl hover:rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                                    <SlClose size={30}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

