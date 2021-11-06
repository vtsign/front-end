import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path }) => {
	 return (<Route
		path={path}
		exact
		render={() =>
			localStorage.getItem("isLogin") === 'true' ? (
				<Component />
			) : (
				<Redirect to="/login" />
			)
		}
	/>)
};
export default PrivateRoute;
