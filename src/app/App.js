import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import Provider from 'react-redux/es/components/Provider';
import AppContext from './AppContext';
// import TitumTheme from '@titum/core/TitumTheme';
import TitumAuthorization from '@titum/core/TitumAuthorization';
import Layout from 'app/Titum-layouts/Layout';
import routes from '../titum-configs/routesConfig';
import store from './store';
import { Auth } from './auth';

const App = () => {

    return (
        <AppContext.Provider
            value={{
                routes
            }}
        >
            <Provider store={store}>
                <Auth>
                    <Router>
                        <TitumAuthorization>
                            {/*<TitumTheme>*/}
                                <Layout/>
                            {/*</TitumTheme>*/}
                        </TitumAuthorization>
                    </Router>
                </Auth>
            </Provider>
        </AppContext.Provider>
    );
};

export default App;
