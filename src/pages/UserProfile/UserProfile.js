import React, { useContext, useState, useEffect } from 'react';
import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Step,
	StepLabel,
	Stepper,
	CircularProgress,
	Card,
	InputLabel,
	TextField,
	Box
} from '@mui/material';
import '@pdftron/webviewer/public/core/CoreControls';
import Loading from '../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useToast } from '../../components/toast/useToast.js';
import './UserProfile.scss';
import UserAvatar from '../../components/Profiles/UserAvatar';
import UserProfileDetails from '../../components/Profiles/UserProfileDetails';
import userApi from '../../api/userApi';

const UserProfile = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				const response = await userApi.getUserProfile();
				setUserInfo(response.data);
				setLoading(false);
			} catch(err) {
				console.log(err);
			}
		})();
	}, [])

	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8,
			}}
		>
			{loading && <Loading />}
			<Container maxWidth={false}>
				<Grid container className="profile__container">
					<Grid container spacing={3}>
						<Grid item lg={4} md={6} xs={12}>
							{userInfo && <UserAvatar userInfo={userInfo} />}
						</Grid>
						<Grid item lg={8} md={6} xs={12}>
							{userInfo && <UserProfileDetails userInfo={userInfo} />}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default UserProfile
