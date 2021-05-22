import TitumSuspense from '@titum/core/TitumSuspense';
import AppContext from 'app/AppContext';
import Header from "./shared-components/Header";
import React, {useContext} from 'react';
import { renderRoutes } from 'react-router-config';
import Footer from "./shared-components/Footer";
import TitumMessage from '@titum/core/TitumMessage';

function Layout(props) {
	const appContext = useContext(AppContext);
	const { routes } = appContext;

	return (
		<>
			<div className="page-wrapper">
				<Header/>
				<TitumSuspense>{renderRoutes(routes)}</TitumSuspense>
				{props.children}
				<Footer/>
			</div>

			<TitumMessage/>
		</>
	);

}

export default React.memo(Layout);
