import {Dashboard, Dummy, Home} from '../pages';
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
        //authenticatedRoute: true
    },
    {
        path: RouteNamesEnum.dummy,
        title: 'Dummy',
        component: Dummy,
        //authenticatedRoute: true
    },
];
