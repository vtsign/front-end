import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Tabs, Tab } from '@mui/material';
import { Home, Create, Description, Language, Settings, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-white.png';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
const Header = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Tabs value={value} onChange={handleChange} textColor="inherit">
						<Tab
							label={
								<div>
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
						<Tab
							component={Link}
							label={
								<div>
									<Home style={{ verticalAlign: 'middle' }} /> Trang chủ
								</div>
							}
							to="/"
						/>
						<Tab
							component={Link}
							label={
								<div>
									<Create style={{ verticalAlign: 'middle' }} /> Ký kết
								</div>
							}
							to="/signing"
						/>
						<Tab
							component={Link}
							label={
								<div>
									<ManageSearchIcon style={{ verticalAlign: 'middle' }} /> Quản lý
								</div>
							}
							to="/signing"
						/>
						<Tab
							component={Link}
							label={
								<div>
									<Description style={{ verticalAlign: 'middle' }} /> Bản mẫu
								</div>
							}
							to="/signing"
						/>
					</Tabs>
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
