import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoneIcon from '@mui/icons-material/Done';
import './style.scss';
import DialogCommon from '../../../common/dialog';

const contentDialogDelete = {
	title: 'Xoá hợp đồng?',
	content:
		'Hơp đồng đã xóa sẽ có sẵn trong thùng Đã xóa của bạn trong một thời gian ngắn (tối đa 24 giờ) trước khi bị xóa hoàn toàn.',
};

const DetailDocumentCompleted = () => {
	const [openKey, setOpenKey] = useState(false);
	const openDialogKey = () => {
		setOpenKey(true);
	};

	const closeDialogKey = () => {
		setOpenKey(false);
	};

	return (
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
						{/* <Button variant="contained">Kí tài liệu</Button> */}
						<Button onClick={openDialogKey} variant="outlined" color="error">
							Xóa
						</Button>
						<Button
							variant="outlined"
							endIcon={
								<ArrowDropDownRoundedIcon
									sx={{ color: '#2f80ed', fontSize: '25px !important' }}
								/>
							}
						>
							<DialogCommon
								open={openKey}
								closeDialogKey={closeDialogKey}
								title={contentDialogDelete.title}
								content={contentDialogDelete.content}
							/>
							Thêm
						</Button>
					</div>
				</div>
				<div className="content-receivers">
					<div className="content-receivers-title">Receivers</div>
					<div className="content-receivers-item">
						<div className="receiver-info">
							<h6>1</h6>
							<DoneIcon style={{ color: 'green', marginRight: 10 }} />
							<div>
								<p>Tho tuan</p>
								<p>nttuan@gmail.com</p>
							</div>
						</div>
						<div className="receiver-sign-info">
							<p>Signed</p>
							<p>on 19/20/2021|13:30pm</p>
						</div>
					</div>
					<div className="content-receivers-item">
						<div className="receiver-info">
							<h6>1</h6>
							<DoneIcon style={{ color: 'green', marginRight: 10 }} />
							<div>
								<p>Tho tuan</p>
								<p>nttuan@gmail.com</p>
							</div>
						</div>
						<div className="receiver-sign-info">
							<p>Signed</p>
							<p>on 19/20/2021|13:30pm</p>
						</div>
					</div>
					<div className="content-receivers-item">
						<div className="receiver-info">
							<h6>1</h6>
							<DoneIcon style={{ color: 'green', marginRight: 10 }} />
							<div>
								<p>Tho tuan</p>
								<p>nttuan@gmail.com</p>
							</div>
						</div>
						<div className="receiver-sign-info">
							<p>Signed</p>
							<p>on 19/20/2021|13:30pm</p>
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
	);
};

export default DetailDocumentCompleted;
