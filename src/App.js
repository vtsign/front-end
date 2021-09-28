import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
	return (
		<BrowserRouter>
			{/* <Header /> */}
			<main>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
