import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import './actionButton.scss';

export default function ActionButton({ selectDocumentHandler, contract }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDetail = () => {
		selectDocumentHandler(contract.id);
	};

	const handleDownload = () => {
		contract.documents.forEach((doc) => {
			fetch(doc.url)
				.then((response) => response.blob())
				.then((blob) => {
					// 2. Create blob link to download
					const url = window.URL.createObjectURL(new Blob([blob]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', doc.origin_name);
					// 3. Append to html page
					document.body.appendChild(link);
					// 4. Force download
					link.click();
					// 5. Clean up and remove the link
					link.parentNode.removeChild(link);
				});
		});
	};

	return (
		<Fragment>
			<Button
				className="btn-action"
				variant="contained"
				endIcon={
					<ArrowDropDownRoundedIcon
						sx={{ color: '#2f80ed', fontSize: '25px !important' }}
					/>
				}
				onClick={handleClick}
			>
				Chọn thao tác
			</Button>
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
				<MenuItem onClick={handleDetail}>Chi tiết</MenuItem>
				<MenuItem onClick={handleClose}>Xóa</MenuItem>
				<MenuItem onClick={handleDownload}>Tải xuống</MenuItem>
			</Menu>
		</Fragment>
	);
}
