import React, { Suspense, useState } from 'react';
import { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import userApi from './api/userApi';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import { PdfTronProvider } from './redux/constants/contexts/pdfTronContext';

const NotFound = React.lazy(() => import('./pages/Common/NotFound'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const RequestResetPassword = React.lazy(() => import('./pages/ResetPassword/RequestResetPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword/ResetPassword'));
const CheckEmail = React.lazy(() => import('./pages/ResetPassword/CheckEmail'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const ThankYou = React.lazy(() => import('./pages/ThankYou/ThankYou'));
const Manage = React.lazy(() => import('./pages/Manage/Manage'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const SignDocument = React.lazy(() => import('./pages/SignDocument/SignDocument'));
const Signing = React.lazy(() => import('./pages/Signing/Signing'));
const PrivateRoute = React.lazy(() => import('./components/Layout/PrivateRoute'));
const Activation = React.lazy(() => import('./pages/Activation/Activation'));
const UserProfile = React.lazy(() => import('./pages/UserProfile/UserProfile'));
const Payment = React.lazy(() => import('./components/zalopay/payment'));
const ChangePassword = React.lazy(() => import('./pages/ChangePassword/ChangePassword'));
const TransactionHistory = React.lazy(() => import('./pages/TransactionHistory/TransactionHistory'));

const App = ({ location }) => {
	const headerExclusionArray = [
		'login',
		'register',
		'activation',
		'notfound',
		'signDocument',
		'check-email',
		'request-reset-password',
		'reset-password'
	];

	const isLoggedIn = localStorage.getItem("isLogin") === 'true';

	let splitPathName = location.pathname.split('/');

	return (
		<div className="app__container">
			<Suspense fallback={<Loading />}>
				{headerExclusionArray.indexOf(splitPathName[1]) < 0 && <Header />}
				<Switch>
					<Route path="/login">
						{!isLoggedIn ? <Login /> : <Redirect to="/home" />}
					</Route>
					<Route path="/check-email" component={CheckEmail} />
					<Route path="/request-reset-password" component={RequestResetPassword} />
					<Route path="/reset-password" component={ResetPassword} />
					<Route path="/register" component={Register} />
					<Route path="/thankyou" component={ThankYou} />
					<Route path="/activation/:id" component={Activation} />
					<PrivateRoute path="/home" exact component={Home} />
					<PrivateRoute path="/change-password" component={ChangePassword} />
					<PrivateRoute path="/transaction-history" component={TransactionHistory} />
					<Route path="/" exact>
						<Redirect to="/home" />
					</Route>
					<PrivateRoute path="/signing">
						<PdfTronProvider>
							<Signing />
						</PdfTronProvider>
					</PrivateRoute>
					<PrivateRoute path={'/manage'} component={Manage} />
					<PrivateRoute path="/payment" component={Payment} />
					<PrivateRoute path="/profile" component={UserProfile} />
					<Route path="/signDocument">
						<PdfTronProvider>
							<SignDocument />
						</PdfTronProvider>
					</Route>
					<Route path="/notfound" component={NotFound} />
					<Route path="*">
						<Redirect to="/notfound" />
					</Route>
				</Switch>
				<Footer />
			</Suspense>
		</div >
	);
};

export default withRouter(App);
