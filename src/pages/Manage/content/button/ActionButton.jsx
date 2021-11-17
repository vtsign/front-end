import React, { Fragment} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import "./actionButton.scss"

export default function ActionButton({selectDocumentHandler, id}) {
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
		selectDocumentHandler(id);
	}

	const handleDownload = () => {
		
	}

	return (
		<Fragment>
			<Button
                className="btn-action"
                variant="contained"
                endIcon= {<ArrowDropDownRoundedIcon sx={{color: '#2f80ed', fontSize: '25px !important'}} />}
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
				<MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
                <MenuItem onClick={handleClose}>Xóa</MenuItem>
				<MenuItem onClick={handleDownload}>Tải xuống</MenuItem>
			</Menu>
		</Fragment>
	);
}
