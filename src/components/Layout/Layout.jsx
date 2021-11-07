import React, { Fragment } from 'react';
import Header from '../Header/Header';

const Layout = (props) => {
	return (
		<>
			<Header />
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
