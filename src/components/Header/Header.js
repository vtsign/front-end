import React, { useState } from 'react';
import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Menu,
	Tabs,
	Tab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Create, Description, Language, Settings, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="white"
						indicatorColor="secondary"
					>
						<Tab
							component={Link}
							label={
								<div>
									<Home style={{ verticalAlign: 'middle' }} /> Trang chủ
								</div>
							}
							to="/"
							exact
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
									<Description style={{ verticalAlign: 'middle' }} /> Quản lý
								</div>
							}
							to="/manage"
						/>
						<Tab
							component={Link}
							label={
								<div>
									<Description style={{ verticalAlign: 'middle' }} /> Bản mẫu
								</div>
							}
							to="/sample"
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
