import BorderColorIcon from '@mui/icons-material/BorderColor';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import MenuIcon from '@mui/icons-material/Menu';
import NoteIcon from '@mui/icons-material/Note';
import { Box, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuMobile.scss';

const MenuMobile = () => {
	const [state, setState] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState(open);
	};

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
		>
			<List class="menu-mobile">
				<NavLink to="/home" activeClassName="active">
					<ListItem button key="Trang chủ">
						<ListItemIcon>
							<HomeOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Trang chủ" />
					</ListItem>
				</NavLink>
				<NavLink to="/signing" activeClassName="active">
					<ListItem button key="Ký kết">
						<ListItemIcon>
							<BorderColorIcon />
						</ListItemIcon>
						<ListItemText primary="Ký kết" />
					</ListItem>
				</NavLink>
				<NavLink to="/manage" activeClassName="active">
					<ListItem button key="Quản lý">
						<ListItemIcon>
							<ManageSearchIcon />
						</ListItemIcon>
						<ListItemText primary="Quản lý" />
					</ListItem>
				</NavLink>
				<NavLink to="/template" activeClassName="active">
					<ListItem button key="Bản mẫu">
						<ListItemIcon>
							<NoteIcon />
						</ListItemIcon>
						<ListItemText primary="Bản mẫu" />
					</ListItem>
				</NavLink>
			</List>
		</Box>
	);
	return (
		<Fragment>
            <SwipeableDrawer
				anchor="left"
				open={state}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				{list()}
			</SwipeableDrawer>
            <MenuIcon
                fontSize="large"
                onClick={toggleDrawer(true)}
                className = "menu-icon"
				sx={{
					display: { sm: 'inline', md: 'none' },
					mr: 2,
				}}
			/>
		</Fragment>
	);
};

export default MenuMobile;
