export const ToggleOffers = ({ setShowOutgoing, setShowIncoming }: { setShowOutgoing: React.Dispatch<React.SetStateAction<boolean>>, setShowIncoming: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className='flex justify-center gap-4 my-4'>
            <button
                onClick={() => setShowOutgoing((prev: boolean) => !prev)}
                className='p-2 bg-blue-500 text-white rounded hover:bg-blue-700'
            >
                Toggle Outgoing Offers
            </button>
            <button
                onClick={() => setShowIncoming((prev: boolean) => !prev)}
                className='p-2 bg-blue-500 text-white rounded hover:bg-blue-700'
            >
                Toggle Incoming Offers
            </button>
        </div>
    );
};