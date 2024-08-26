import {Offer} from "../types";
import {formatAmount} from "@multiversx/sdk-dapp/utils";
import {useState} from "react";
import {SlArrowDown, SlArrowUp, SlCheck, SlRefresh} from "react-icons/sl";

interface IncomingOffersTableProps {
    wantedOffers: Offer[];
    acceptOffer: (offerId: string) => void;
    getIncomingOffers: () => void;
}

export const IncomingOffersTable = ({wantedOffers, acceptOffer, getIncomingOffers}: IncomingOffersTableProps) => {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <div>
            <button onClick={getIncomingOffers}
                    className='m-2 p-4 shadow-sm bg-gray-200 text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                <SlRefresh size={30}/>
            </button>
            <button onClick={() => setIsVisible(!isVisible)}
                    className='m-2 p-4 shadow-sm bg-gray-200 text-gray-500 rounded-3xl hover:rounded-xl hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                {isVisible ? <SlArrowUp size={30}/> : <SlArrowDown size={30}/>}
            </button>
            {isVisible && (
                <table className='min-w-full divide-y divide-gray-200 my-4'>
                    <thead className='bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    <tr>
                        <th className='px-5'>ID</th>
                        <th className='px-5'>Earned token</th>
                        <th className='px-5'>Earned amount</th>
                        <th className='px-5'>Destination Address</th>
                        <th className='px-5'>Paid token</th>
                        <th className='px-5'>Paid amount</th>
                        <th className='px-5'>Actions</th>
                    </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                    {wantedOffers.map((offer: Offer) => (
                        <tr key={offer.id} className='bg-[#f6f8fa] whitespace-nowrap hover:bg-white'>
                            <td className='px-5'>{offer.id.toString()}</td>
                            <td className='px-5'>{offer.token_identifier.toString()}</td>
                            <td className='px-5'>{formatAmount({input: offer.amount})}</td>
                            <td className='px-5'>{offer.creator_address.toString()}</td>
                            <td className='px-5'>{offer.wanted_token.toString()}</td>
                            <td className='px-5'>{formatAmount({input: offer.wanted_amount})}</td>
                            <td>
                                <button onClick={() => acceptOffer(offer.id)}
                                        className='m-2 p-4 shadow-sm bg-gray-200 text-gray-500 rounded-3xl hover:rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer'>
                                    <SlCheck size={30}/>
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
