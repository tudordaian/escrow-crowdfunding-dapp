import {useGetAccount} from "@multiversx/sdk-dapp/hooks/account/useGetAccount";

export const AddressSection = () => {
    const {address} = useGetAccount();
    return (
        <div>
            <p>Address: {address}</p>
        </div>
    );
};
