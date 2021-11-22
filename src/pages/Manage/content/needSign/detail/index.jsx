import React, { Fragment, useState } from 'react';
import { Button, Grid } from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import './style.scss';
import DialogKey from './DialogKey';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreButton from '../MoreButton';

const DetailDocumentCompleted = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [openKey, setOpenKey] = useState(false);
	const openDialogKey = () => {
		setOpenKey(true);
	};

	const closeDialogKey = () => {
		setOpenKey(false);
	};
	return (
		<Fragment>
			<Grid container className="detail-completed">
				<Grid item md={9} className="detail-completed-main">
					<div className="content-header">
						<p className="content-header-title">Tài liệu đã hoàn thành</p>
					</div>
					<div className="content-info">
						<div className="content-info-title">Hợp đồng thuê nhà</div>
						<p>Từ: Nguyễn Tuấn</p>
						<p>Thay đổi lần cuối: 19/12/2021</p>
						<p>Gửi ngày: 10/12/2021</p>
						<div className="content-info-ground-btn">
							<Button variant="contained" onClick={openDialogKey}>
								Kí tài liệu
							</Button>
							<Button variant="outlined" color="error">
								Xóa
							</Button>
							<Button
								variant="outlined"
								onClick={handleClick}
								endIcon={
									<ArrowDropDownRoundedIcon
										sx={{ color: '#2f80ed', fontSize: '25px !important' }}
									/>
								}
							>
								Thêm
							</Button>
							<MoreButton anchorEl={anchorEl} handleClose={handleClose} />
						</div>
					</div>
					<div className="content-receivers">
						<div className="content-receivers-title">Receivers</div>
						<div className="content-receivers-item">
							<div className="receiver-info">
								<h6>1</h6>
								<div>
									<p>Tho tuan</p>
									<p>nttuan@gmail.com</p>
								</div>
							</div>
							<div className="receiver-sign-info">
								<p>Need to sign</p>
							</div>
						</div>
						<div className="content-receivers-item">
							<div className="receiver-info">
								<h6>1</h6>
								<div>
									<p>Tho tuan</p>
									<p>nttuan@gmail.com</p>
								</div>
							</div>
							<div className="receiver-sign-info">
								<p>Need to sign</p>
							</div>
						</div>
						<div className="content-receivers-item">
							<div className="receiver-info">
								<h6>1</h6>
								<div>
									<p>Tho tuan</p>
									<p>nttuan@gmail.com</p>
								</div>
							</div>
							<div className="receiver-sign-info">
								<p>Need to sign</p>
							</div>
						</div>
					</div>
					<div className="content-other">
						<div className="content-other-title">Tin nhắn</div>
						<p>Đọc kĩ và kí vào hợp đồng này</p>
					</div>
				</Grid>
				<Grid item md={3} className="detail-completed-thumbnail">
					<div></div>
				</Grid>
			</Grid>
			<DialogKey open={openKey} closeDialogKey={closeDialogKey} />
		</Fragment>
	);
};

export default DetailDocumentCompleted;
