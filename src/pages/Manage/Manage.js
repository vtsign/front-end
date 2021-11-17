import React, { useEffect, useState } from 'react';
import './manage.scss';
import { Container, Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import SideBar from './SideBar';
import DocumentCompleted from './content/completed';
import DocumentCompletedDetail from './content/completed/detail';
import DocumentWaiting from './content/waiting';
import DocumentWaitingDetail from './content/waiting/detail';
import DocumentNeedSign from './content/needSign';
import DocumentDeleted from './content/deleted';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

const Manage = () => {
	const match = useRouteMatch();
	return (
		<Grid container className="manage">
			<Grid item md={2} className="manage-sidebar">
				<SideBar />
			</Grid>
			<Grid item md={10} className="manage-content">
				<Route path={`${match.url}`} exact>
					<Redirect to="/manage/completed" />
				</Route>
				<Route path={`${match.url}/completed/:id`} component={DocumentCompletedDetail} />
				<Route path={`${match.url}/completed`} exact component={DocumentCompleted} />
				<Route path={`${match.url}/waiting/:id`} component={DocumentWaitingDetail} />
				<Route path={`${match.url}/waiting`} exact component={DocumentWaiting} />
				<Route path={`${match.url}/need-sign`} component={DocumentNeedSign} />
				<Route path={`${match.url}/deleted`} component={DocumentDeleted} />
				{/* <DocumentCompleted /> */}
			</Grid>
		</Grid>
	);
};

export default Manage;
