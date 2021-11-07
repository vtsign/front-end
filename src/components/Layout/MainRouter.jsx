import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Activation from '../../pages/Activation/Activation';
import NotFound from '../../pages/Common/NotFound';
import Home from '../../pages/Home/Home';
import Manage from '../../pages/Manage/Manage';
import Sample from '../../pages/Sample/Sample';
import SignDocument2 from '../../pages/SignDocument/SignDocument2';
import Signing from '../../pages/Signing/Signing';
import Signing2 from '../../pages/Signing/Signing2';
import Layout from './Layout';

const MainRouter = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/home" />
				</Route>
				<Route path="/home" exact component={Home} />
				<Route path="/signing" component={Signing} />
				<Route path="/signing2" component={Signing2} />
				<Route path="/activation/:id" component={Activation} />
				<Route path="/manage" component={Manage} />
				<Route path="/template" component={Sample} />
				<Route path="/signDocument" component={SignDocument2} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Layout>
	);
};

export default MainRouter;
