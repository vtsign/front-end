import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/Footer';
import MainRouter from './components/Layout/MainRouter';
import Activation from './pages/Activation/Activation';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
	return (
		<BrowserRouter>
			<div className="app__container">
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/activation/:id" component={Activation} />
					<Route path="/" component={MainRouter} />
				</Switch>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
