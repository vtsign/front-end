import { AccountCircle, Create, Description, Home, Language, Settings } from '@mui/icons-material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { AppBar, Box, IconButton, Tab, Tabs, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo-white.png';
import './Header.scss';
const Header = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar className="tool-bar">
					<Tabs value={value} onChange={handleChange} textColor="inherit">
						<Tab
							label={
								<div>
									{/* <h3>VTSIGN</h3> */}
									<img
										src={Logo}
										alt="logo"
										style={{
											width: '130px',
											height: '50px',
											verticalAlign: 'middle',
										}}
									/>
								</div>
							}
						/>
					</Tabs>
					<NavLink to="/home" activeClassName="active">
						<Home style={{ verticalAlign: 'middle' }} />
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
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton size="large" aria-label="show 4 new mails" color="inherit">
							<Language />
						</IconButton>
						<IconButton size="large" color="inherit">
							<Settings />
						</IconButton>
						<IconButton size="large" edge="end" color="inherit">
							<AccountCircle />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
