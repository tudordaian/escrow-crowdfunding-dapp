import {EnvironmentsEnum} from "@multiversx/sdk-dapp/types";
import {logout} from '@multiversx/sdk-dapp/utils';
import {useGetIsLoggedIn} from '@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn';

import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const callbackUrl = `${window.location.origin}/`;
const onRedirect = undefined;       // use this to redirect with useNavigate to a specific page after logout
const shouldAttemptReLogin = false; // use for special cases where you want to re-login after logout
const options = {
    /*
     * @param {boolean} [shouldBroadcastLogoutAcrossTabs=true]
     * @description If your dApp supports multiple accounts on multiple tabs,
     * this param will broadcast the logout event across all tabs.
     */
    shouldBroadcastLogoutAcrossTabs: true,
    /*
     * @param {boolean} [hasConsentPopup=false]
     * @description Set it to true if you want to perform async calls before logging out on Safari.
     * It will open a consent popup for the user to confirm the action before leaving the page.
     */
    hasConsentPopup: false
};

export const Nav = () => {
    const isLoggedIn = useGetIsLoggedIn();
    const navigate = useNavigate();
    const [notLoggedInMessage, setNotLoggedInMessage] = useState(false);

    useEffect(() => {
        if(isLoggedIn) {
            setNotLoggedInMessage(false);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        sessionStorage.clear();
        logout(
            callbackUrl,
            /*
             * following are optional params. Feel free to remove them in your implementation
             */
            onRedirect,
            shouldAttemptReLogin,
            options
        );
    };

    const handleDummyPage = () => {
        if (isLoggedIn) {
            setNotLoggedInMessage(false);
            navigate('/dummy');
        } else {
            setNotLoggedInMessage(true);
        }
    };

    const handleLogin = () => {
        navigate('/unlock');
    }

    return (
        <header
            className='flex flex-row align-center justify-between pl-8 pr-8 pt-8 bg-[#f6f8fa] sticky top-0 z-50 mb-2 shadow-xl'>
            <nav
                className='h-full my-2 w-full text-base sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
                <div className='flex justify-end container mx-auto items-center gap-2.5'>
                    <div className='flex gap-1.25 items-center'>
                        <div className='w-2.5 h-2.5 mx-2 rounded-full bg-green-500'/>
                        <p className='text-gray-600 text-base text-xl'>{EnvironmentsEnum.devnet}</p>
                    </div>

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className='inline-block p-2 text-xl text-gray-600 bg-gray-200 rounded-3xl hover:rounded-xl hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className='inline-block p-2 text-xl text-gray-600 bg-gray-200 rounded-3xl hover:rounded-xl hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'
                        >
                            Login
                        </button>
                    )}

                    <button
                        onClick={handleDummyPage}
                        className='inline-block p-2 text-xl text-gray-600 bg-gray-200 rounded-3xl hover:rounded-xl hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer'
                    >
                        Dummy Page
                    </button>
                </div>

                {notLoggedInMessage && <p className='text-base'>You are not logged in</p>}
            </nav>
            <div className='absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-500'>
                Escrow Dapp
            </div>
        </header>
    );
};