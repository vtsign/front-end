import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PrivateRoute from './components/Layout/PrivateRoute';
import Activation from './pages/Activation/Activation';
import NotFound from './pages/Common/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Manage from './pages/Manage/Manage';
import Register from './pages/Register/Register';
import Sample from './pages/Sample/Sample';
import Signing2 from './pages/Signing/Signing2';
import { PdfTronProvider } from './redux/constants/contexts/pdfTronContext';

const App = ({ location }) => {
	// const headerExclusionArray = ['/home', '/', '/signing',
	// 	'/manage', '/manage/completed/', '/manage/waiting', '/manage/deleted', '/manage/need-sign', '/template', '/signDocument'];
	const headerExclusionArray = ['/login', '/register', '/activation/:id', '/notfound'];
	return (
		<div className="app__container">
			{headerExclusionArray.indexOf(location.pathname) < 0 && <Header />}
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/activation/:id" component={Activation} />
				<PrivateRoute path="/" exact component={Home} />
				<Route path="/home" exact>
					<Redirect to="/" />
				</Route>
				<PrivateRoute path="/signing">
					<PdfTronProvider>
						<Signing2 />
					</PdfTronProvider>
				</PrivateRoute>
				<PrivateRoute path={'/manage'} component={Manage} />
				<PrivateRoute path="/template" component={Sample} />
				<Route path="/signing2">
					<PdfTronProvider>
						<Signing2 />
					</PdfTronProvider>
				</Route>
				<Route path="/notfound" component={NotFound} />
				<Route path="*">
					<Redirect to="/notfound" />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
};

export default withRouter(App);
