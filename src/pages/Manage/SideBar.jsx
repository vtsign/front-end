import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import RestorePageOutlinedIcon from '@mui/icons-material/RestorePageOutlined';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './sideBar.scss';

const LeftManage = () => {

	const history = useHistory();
	const goBackHandler = () => {
		history.goBack();
	}

	return (
		<Fragment>
			<List className="sidebar">
				<ListItem className="sidebar-button-back" onClick={goBackHandler}>
					<ListItemButton className="item-button">
						<ListItemIcon className="item-icon">
							<ArrowBackIosRoundedIcon />
						</ListItemIcon>
						<ListItemText className = "item-text" primary="Quản lý tài liệu" />
					</ListItemButton>
				</ListItem>
				<NavLink to="/manage/completed" activeClassName="sidebar-item-active">
					<ListItem className="sidebar-item">
						<ListItemButton className="item-button">
							<ListItemIcon className="item-icon">
								<FactCheckOutlinedIcon />
							</ListItemIcon>
							<ListItemText className = "item-text" primary="Đã hoàn thành" />
						</ListItemButton>
					</ListItem>
				</NavLink>
				<NavLink to="/manage/waiting" activeClassName="sidebar-item-active">
					<ListItem className="sidebar-item">
						<ListItemButton className="item-button">
							<ListItemIcon className="item-icon">
								<RestorePageOutlinedIcon />
							</ListItemIcon>
							<ListItemText className = "item-text" primary="Chờ kí" />
						</ListItemButton>
					</ListItem>
				</NavLink>
				<NavLink to="/manage/need-sign" activeClassName="sidebar-item-active">
					<ListItem className="sidebar-item">
						<ListItemButton className="item-button">
							<ListItemIcon className="item-icon">
								<FileCopyOutlinedIcon />
							</ListItemIcon>
							<ListItemText className = "item-text" primary="Cần kí" />
						</ListItemButton>
					</ListItem>
				</NavLink>
				<NavLink to="/manage/deleted" activeClassName="sidebar-item-active">
					<ListItem className="sidebar-item">
						<ListItemButton className="item-button">
							<ListItemIcon className="item-icon">
								<DeleteOutlineRoundedIcon />
							</ListItemIcon>
							<ListItemText className = "item-text" primary="Đã xóa" />
						</ListItemButton>
					</ListItem>
				</NavLink>
			</List>
		</Fragment>
	);
};

export default LeftManage;
