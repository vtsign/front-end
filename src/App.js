import React, { Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import { PdfTronProvider } from './redux/constants/contexts/pdfTronContext';

const NotFound = React.lazy(() => import('./pages/Common/NotFound'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Manage = React.lazy(() => import('./pages/Manage/Manage'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Sample = React.lazy(() => import('./pages/Sample/Sample'));
const SignDocument = React.lazy(() => import('./pages/SignDocument/SignDocument'));
const Signing = React.lazy(() => import('./pages/Signing/Signing'));
const PrivateRoute = React.lazy(() => import('./components/Layout/PrivateRoute'));
const Activation = React.lazy(() => import('./pages/Activation/Activation'));

const App = ({ location }) => {
	// const headerExclusionArray = ['/home', '/', '/signing',
	// 	'/manage', '/manage/completed/', '/manage/waiting', '/manage/deleted', '/manage/need-sign', '/template', '/signDocument'];
	const headerExclusionArray = [
		'/login',
		'/register',
		'/activation/:id',
		'/notfound',
		'/signDocument',
	];
	return (
		<div className="app__container">
			<Suspense fallback={<Loading />}>
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
							<Signing />
						</PdfTronProvider>
					</PrivateRoute>
					<PrivateRoute path={'/manage'} component={Manage} />
					<PrivateRoute path="/template" component={Sample} />
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
		</div>
	);
};

export default withRouter(App);
