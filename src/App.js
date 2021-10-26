import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/Footer';
import MainRouter from './components/Layout/MainRouter';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/" component={MainRouter} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
