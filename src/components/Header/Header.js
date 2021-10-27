import { AccountCircle, Create, Description, Home, Language, Settings } from '@mui/icons-material';
import {
	AppBar,
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	Tab,
	Tabs,
	Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo-white.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NoteIcon from '@mui/icons-material/Note';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import './Header.scss';
import LeftHeader from './LeftHeader';
import MenuMobile from './MenuMobile';
const Header = () => {
	const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	

	return (
		<Box>
			<AppBar className="header" position="static">
		
				<Toolbar className="header-toolbar">
					
					<div>
						{/* <img
							src={Logo}
							alt="logo"
							style={{
								width: '130px',
								height: '50px',
								verticalAlign: 'middle',
							}}
						/> */}
						<MenuMobile />
						<Link className="header-toolbar-logo" to="/">
							VTSIGN
						</Link>
					</div>
					<div className="header-menu">
						<NavLink to="/home" activeClassName="active">
							{/* <Home style={{ verticalAlign: 'middle' }} /> */}
							Trang chủ
						</NavLink>
						<NavLink to="/signing" activeClassName="active">
							{/* <Create style={{ verticalAlign: 'middle' }} /> */}
							Ký kết
						</NavLink>
						<NavLink to="/manage" activeClassName="active">
							{/* <ManageSearchIcon style={{ verticalAlign: 'middle' }} /> */}
							Quản lý
						</NavLink>
						<NavLink to="/template" activeClassName="active">
							{/* <Description style={{ verticalAlign: 'middle' }} /> */}
							Bản mẫu
						</NavLink>
					</div>

					<LeftHeader />
					
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
