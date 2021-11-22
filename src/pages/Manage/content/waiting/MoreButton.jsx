import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { Fragment } from 'react';
import "./moreButton.scss"

export default function MoreButton({ anchorEl, handleClose }) {
	const open = Boolean(anchorEl);

	const handleDownload = () => {};

	return (
		<Fragment>
			<Menu
				className="list-action"
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClose}>Lịch sử</MenuItem>
				<MenuItem onClick={handleDownload}>Tải xuống</MenuItem>
			</Menu>
		</Fragment>
	);
}
