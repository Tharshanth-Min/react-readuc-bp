import { ThemeProvider } from '@material-ui/core/styles';
import React  from 'react';


function TitumTheme(props) {

	// console.warn('TitumTheme:: rendered',mainTheme);
	return <ThemeProvider>{props.children}</ThemeProvider>;
}

export default React.memo(TitumTheme);
