import { Create, Description, Home } from '@mui/icons-material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {
	AppBar,
	Box, Toolbar
} from '@mui/material';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo-white.png';
import './Header.scss';
import MenuMobile from './MenuMobile';
import RightHeader from './RightHeader';
const Header = () => {
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const checkActive = (match, location) => {
		//some additional logic to verify you are in the home URI
		if(!location) return false;
		const {pathname} = location;
		return pathname === "/";
	}

	return (
		<Box>
			<AppBar className="header" position="static">
				<Toolbar className="header-toolbar">
					<div className="header-right">
						<MenuMobile />
						<Link to="/">
							<img
								src={Logo}
								alt="logo"
								className="header-right-logo"
							/>
						</Link>

						<div className="header-right-menu">
							<NavLink to="/" activeClassName="active" exact >
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
							<NavLink to="/template" activeClassName="active">
								<Description style={{ verticalAlign: 'middle' }} />
								Bản mẫu
							</NavLink>
						</div>
					</div>
					<RightHeader />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
