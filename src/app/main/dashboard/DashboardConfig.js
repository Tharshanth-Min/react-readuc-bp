import Dashboard from './Dashboard';

const dashboardConfig = {
    settings: {

    },
    auth:  ['customer'], // only customer can access this component
    routes: [
        {
            path: '/dashboard',
            exact : true,
            component: Dashboard
        }
    ]
};

export default dashboardConfig;
