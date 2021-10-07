import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Signing from './pages/Signing/Signing';

const App = () => {
	return (
		<BrowserRouter>
			{/* <Header /> */}
			<main>
				<Route path="/" exact component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/signing" component={Signing} />
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
