import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Grid} from "@material-ui/core";


function TitumLoading() {

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			style={{ paddingTop : '40px', paddingBottom : '20px'}}
		>
			<CircularProgress size={25} />

		</Grid>
	);
}

export default TitumLoading;
