import {Dashboard, Adder, Home} from '../pages';
import {RouteType} from '@multiversx/sdk-dapp/types';
import {RouteNamesEnum} from "../localConstants/routes";

interface RouteWithTitleType extends RouteType {
    title: string;
}

export const routes: RouteWithTitleType[] = [
    {
        path: RouteNamesEnum.home,
        title: 'Home',
        component: Home,
    },
    {
        path: RouteNamesEnum.dashboard,
        title: 'Dashboard',
        component: Dashboard,
    },
    {
        path: RouteNamesEnum.adder,
        title: 'Adder',
        component: Adder,
    },
];
