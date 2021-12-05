import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import './actionButton.scss';
import DialogCommon from '../dialogDelete';

const contentDialogDelete = {
	title: 'Xoá hợp đồng?',
	content:
		'Hơp đồng đã xóa sẽ có sẵn trong thùng Đã xóa của bạn trong một thời gian ngắn (tối đa 24 giờ) trước khi bị xóa hoàn toàn.',
};

export default function ActionButton({ selectDocumentHandler, contract, status }) {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [showDialogDelete, setShowDialogDelete] = useState(false);

	const handleClick = (event) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const openDialogDelete = () => {
		setAnchorEl(null);
		setShowDialogDelete(true);
	};

	const closeDialogDelete = () => {
		setShowDialogDelete(false);
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
		setAnchorEl(null);
	};

	const handleReStore = () => {

	}

	const handleSignContract = () => {
		const r = JSON.parse(localStorage.getItem('user')).id;
		const userContract = contract.user_contracts.find((uc) => uc.user.id === r);
		const uc = userContract.id;
		const c = contract.id;
		const url = `/signDocument?r=${r}&c=${c}&uc=${uc}`;
		history.push(url);
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
				{status === "DELETED" && (<MenuItem onClick={handleReStore}>Hoàn tác</MenuItem>)}
				{status === "ACTION_REQUIRE" && (<MenuItem onClick={handleSignContract}>Ký ngay</MenuItem>)}
				<MenuItem onClick={handleDetail}>Chi tiết</MenuItem>
				<MenuItem onClick={openDialogDelete}>Xóa</MenuItem>
				<MenuItem onClick={handleDownload}>Tải xuống</MenuItem>
			</Menu>
			<DialogCommon
				open={showDialogDelete}
				closeDialogKey={closeDialogDelete}
				title={contentDialogDelete.title}
				content={contentDialogDelete.content}
			/>
		</Fragment>
	);
}
