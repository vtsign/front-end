import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './components/toast/providers/ToastProvider.js';
import { PdfTronProvider } from './redux/constants/contexts/pdfTronContext';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastProvider>
				<PdfTronProvider>
					<App />
				</PdfTronProvider>
			</ToastProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
