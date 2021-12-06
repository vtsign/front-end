import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import './actionButton.scss';
import DialogCommon from '../dialog/dialogDelete';
import DialogRestore from '../dialog/dialogRestore'
import manageDocumentsApi from '../../../../api/manageApi';

const contentDialogDelete = {
	title: 'Xoá hợp đồng?',
	message:
		'Hơp đồng đã xóa sẽ có sẵn trong thùng Đã xóa của bạn.',
};

const contentDialogDeleteCompletely = {
	title: 'Xoá hợp đồng?',
	message:
		'Hơp đồng đã xóa sẽ không thể hoàn tác.',
};
const contentDialogResotre = {
	title: 'Hoàn tác hợp đồng?',
	message:
		'Hợp đồng hoàn tác sẽ ...',
};

export default function ActionButton({ selectDocumentHandler, contract, status, path }) {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [showDialogDelete, setShowDialogDelete] = useState(false);
	const [showDialogRestore, setShowDialogRestore] = useState(false);

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

	const handleOpenDialogRestore = () => {
		setAnchorEl(null);
		setShowDialogRestore(true);
	};

	const handleCloseDialogRestore = () => {
		setShowDialogRestore(false);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDetail = () => {
		const url = `${path}/${contract.id}`;
		history.push(url);
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
				{status === "DELETED" && (<MenuItem onClick={handleOpenDialogRestore}>Hoàn tác</MenuItem>)}
				{status === "ACTION_REQUIRE" && (<MenuItem onClick={handleSignContract}>Ký ngay</MenuItem>)}
				<MenuItem onClick={handleDetail}>Chi tiết</MenuItem>
				<MenuItem onClick={openDialogDelete}>Xóa</MenuItem>
				{status !== "DELETED" && (<MenuItem onClick={handleDownload}>Tải xuống</MenuItem>)}
			</Menu>
			<DialogCommon
				selectDocumentHandler={selectDocumentHandler}
				open={showDialogDelete}
				closeDialogKey={closeDialogDelete}
				content={status === "DELETED" ? contentDialogDeleteCompletely : contentDialogDelete}
				contract={contract}
				pathReturn={path}
			/>
			<DialogRestore
				selectDocumentHandler={selectDocumentHandler}
				open={showDialogRestore}
				closeDialogRestore={handleCloseDialogRestore}
				content={contentDialogResotre}
				contract={contract}
				pathReturn={path} />
		</Fragment>
	);
}
