import { AccountCircle, Language, Settings, Password } from '@mui/icons-material';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { Box, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userApi from '../../api/userApi';
import { USER_LOGOUT } from '../../redux/constants/userConstants';

const LeftHeader = ({ userInfo }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logoutHandler = () => {
		dispatch({ type: USER_LOGOUT });
		localStorage.removeItem('user');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessTokenExpired');
		localStorage.removeItem('refreshTokenExpired');
		localStorage.setItem('isLogin', 'false');
		history.push("/login");

	}


	const profileRoute = () => {
		history.push("/profile");
	}

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<Fragment>
			<Box sx={{ display: 'flex' }}>
				{/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Language />
				</IconButton>
				<IconButton size="large" color="inherit">
					<Settings />
				</IconButton> */}

				{userInfo && (<p style={{ display: 'flex', alignItems: 'center' }}>{numberWithCommas(userInfo.balance)} VND</p>)}
				<IconButton onClick={handleClick} size="large" edge="end" color="inherit">
					<AccountCircle />
				</IconButton>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={profileRoute}>
					<Avatar /> Thông tin tài khoản
				</MenuItem>
				<MenuItem onClick={() => history.push("change-password")}>
					<Avatar /> Đổi mật khẩu
				</MenuItem>
				<MenuItem onClick={() => history.push("/payment")}>
					<Avatar /> Nạp tiền
				</MenuItem>
				<Divider />
				{/* <MenuItem>
					<ListItemIcon>
						<PersonAdd fontSize="small" />
					</ListItemIcon>
					Add another account
				</MenuItem> */}
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={logoutHandler}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Fragment>
	);
};

export default LeftHeader;
