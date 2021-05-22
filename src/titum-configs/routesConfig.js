import React from 'react';
import { Redirect } from 'react-router-dom';
import TitumUtils from '@titum/utils';
import HomeConfig from "../app/main/Home/HomeConfig";
import DashboardConfig from "../app/main/dashboard/DashboardConfig";

const routeConfigs = [
    HomeConfig,
    DashboardConfig
];

const routes = [
    ...TitumUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        component: () => <Redirect to="/dashboard" />,
        exact : true

    }
];

export default routes;
