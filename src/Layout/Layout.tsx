import type {PropsWithChildren} from 'react';
import {useLocation} from 'react-router-dom';
import {AuthenticatedRoutesWrapper} from '@multiversx/sdk-dapp/wrappers';
import {routes} from '../routes';
import {Nav} from "../components/Nav.tsx";
import {RouteNamesEnum} from "../localConstants/routes";

export const Layout = ({children}: PropsWithChildren) => {
    const {search} = useLocation();
    return (
        <div className='flex min-h-screen flex-col bg-slate-300'>
            <Nav/>
            <main className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600  mx-0'>
                <AuthenticatedRoutesWrapper
                    routes={routes}
                    unlockRoute={`${RouteNamesEnum.unlock}${search}`}
                >
                    {children}
                </AuthenticatedRoutesWrapper>
            </main>
        </div>
    );
};
