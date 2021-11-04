import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../middleware/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    const isLogin = localStorage.getItem("isLogin");
    <Route {...rest} render={props => (isLogin ? <Component {...props}/> :  
    <Redirect to="/" />)} />                         
)


export default PrivateRoute;