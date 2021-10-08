import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Signing from './pages/Signing/Signing';
import Manage from './pages/Manage/Manage';
import Sample from './pages/Sample/Sample';
const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/signing">
					<Signing />
				</Route>
				<Route path="/manage">
					<Manage />
				</Route>
				<Route path="/sample">
					<Sample />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
