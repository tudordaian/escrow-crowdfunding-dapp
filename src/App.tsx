import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {DappProvider} from "@multiversx/sdk-dapp/wrappers";

import {EnvironmentsEnum} from '@multiversx/sdk-dapp/types';
import {RouteNamesEnum} from "./localConstants/routes";
import {Unlock} from './pages/Unlock';
import {routes} from './routes/routes';
import './App.css'
import {Layout} from "./Layout/Layout.tsx";
import {SignTransactionsModals, TransactionsToastList } from '@multiversx/sdk-dapp/UI';


function App() {
    return (
        <Router>
            <DappProvider
                environment={EnvironmentsEnum.devnet}
                customNetworkConfig={{
                    name: 'myDappConfig',
                    walletConnectV2ProjectId: '9b1a9564f91cb659ffe21b73d5c4e2d8',
                    metamaskSnapWalletAddress: '0xACf3986351b268272e3fEEbEdf7Cd1562b368CD0'
                }}
            >
                <Layout>
                    <TransactionsToastList />
                    <SignTransactionsModals />
                    <Routes>
                        <Route path={RouteNamesEnum.unlock} element={<Unlock/>}/>
                        {routes.map((route) => (
                            <Route
                                path={route.path}
                                key={`route-key-'${route.path}`}
                                element={<route.component/>}
                            />
                        ))}
                    </Routes>
                </Layout>
            </DappProvider>
        </Router>
    );
}

export default App
