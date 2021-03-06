import { AccountCircle, Password, AccountBalanceWallet } from '@mui/icons-material';
import Logout from '@mui/icons-material/Logout';
import { Box, Button, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { RESET_DOC_LIST } from '../../redux/constants/documentConstants';
import { RESET_RECEIVERS } from '../../redux/constants/receiverConstants';
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
		dispatch({ type: RESET_RECEIVERS });
		dispatch({ type: RESET_DOC_LIST });
		dispatch({ type: USER_LOGOUT });
		localStorage.removeItem('user');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessTokenExpired');
		localStorage.removeItem('refreshTokenExpired');
		localStorage.setItem('isLogin', 'false');
		history.push('/login');
	};

	const profileRoute = () => {
		history.push('/profile');
	};

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	return (
		<Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				{/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Language />
				</IconButton>
				<IconButton size="large" color="inherit">
					<Settings />
				</IconButton> */}
				{userInfo && (
					<p style={{ display: 'flex', alignItems: 'center' }}>
						{numberWithCommas(userInfo.balance)} VND
					</p>
				)}
				<Link to="/payment">
					<Button
						variant="outlined"
						style={{
							color: 'white',
							borderColor: '#fff',
							marginLeft: '20px',
							height: '30px',
						}}
					>
						N???p ti???n
					</Button>
				</Link>
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
					<Avatar /> Th??ng tin t??i kho???n
				</MenuItem>
				<MenuItem onClick={() => history.push('/change-password')}>
					<Avatar>
						<Password />
					</Avatar>{' '}
					?????i m???t kh???u
				</MenuItem>
				<MenuItem onClick={() => history.push('/transaction-history')}>
					<Avatar>
						<AccountBalanceWallet fontSize="medium" />
					</Avatar>
					L???ch s??? giao d???ch
				</MenuItem>
				<Divider />
				<MenuItem onClick={logoutHandler}>
					<ListItemIcon>
						<Logout fontSize="medium" />
					</ListItemIcon>
					????ng xu???t
				</MenuItem>
			</Menu>
		</Fragment>
	);
};

export default LeftHeader;
