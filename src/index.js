import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './components/toast/providers/ToastProvider.js'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastProvider>
			<App />
			</ ToastProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
