import { Offer } from "../types";
import { formatAmount } from "@multiversx/sdk-dapp/utils";

interface IncomingOffersTableProps {
    wantedOffers: Offer[];
    acceptOffer: (offerId: string) => void;
}

export const IncomingOffersTable = ({ wantedOffers, acceptOffer }: IncomingOffersTableProps) => {
    return (
        <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
            <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Offered token</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Offered amount</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Destination Address</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Wanted token</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Wanted amount</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
            {wantedOffers.map((offer: Offer) => (
                <tr key={offer.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>{offer.id.toString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{offer.token_identifier.toString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{formatAmount({ input: offer.amount })}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{offer.creator_address.toString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{offer.wanted_token.toString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{formatAmount({ input: offer.wanted_amount })}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                        <button onClick={() => acceptOffer(offer.id)} className='p-2 bg-green-500 text-white rounded hover:bg-green-700'>
                            Accept offer
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
