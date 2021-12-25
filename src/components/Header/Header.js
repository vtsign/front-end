import { Create, Home } from '@mui/icons-material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {
	AppBar,
	Box, Toolbar
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import userApi from '../../api/userApi';
import Logo from '../../assets/images/logo-white.png';
import './Header.scss';
import MenuMobile from './MenuMobile';
import RightHeader from './RightHeader';
const Header = () => {
	const location = useLocation();
	// const location = useLocation();
	// const [value, setValue] = useState(0);
	// const handleChange = (event, newValue) => {
	// 	setValue(newValue);
	// };

	// const checkActive = (match, location) => {
	// 	//some additional logic to verify you are in the home URI
	// 	if (!location) return false;
	// 	const { pathname } = location;
	// 	return pathname === "/";
	// }

	const isLoggedIn = localStorage.getItem("isLoggedIn");
	const listPathShowPayment = ["/", "/thank-you"];
	const listPathShowTab = ["/", "/thank-you", "/payment"];

	const [userInfo, setUserInfo] = useState();

	useEffect(() => {
		if (listPathShowPayment.indexOf(location.pathname) < 0) {
			(async () => {
				const response = await userApi.getUserProfile();
				setUserInfo(response.data);
				localStorage.setItem('user', JSON.stringify(response.data));
			})()
		}
	}, [])

	return (
		<Box>
			<AppBar className="header" position="static">
				<Toolbar className="header-toolbar">
					<div className="header-right">
						<MenuMobile />
						<Link to="/" style={{ margin: 'auto' }}>
							<img
								src={Logo}
								alt="logo"
								className="header-right-logo"
							/>
						</Link>

						{listPathShowTab.indexOf(location.pathname) < 0 && (
							<div className="header-right-menu">
								<NavLink to="/home" activeClassName="active" exact >
									<Home style={{ verticalAlign: 'middle', marginRight: '5px' }} />
									Trang chủ
								</NavLink>
								<NavLink to="/signing" activeClassName="active">
									<Create style={{ verticalAlign: 'middle' }} />
									Ký kết
								</NavLink>
								<NavLink to="/manage" activeClassName="active">
									<ManageSearchIcon style={{ verticalAlign: 'middle' }} />
									Quản lý
								</NavLink>
							</div>
						)}
					</div>
					{listPathShowPayment.indexOf(location.pathname) < 0 &&
						<RightHeader userInfo={userInfo} />
					}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
