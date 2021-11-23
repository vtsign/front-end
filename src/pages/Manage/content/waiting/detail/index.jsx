import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Grid } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getContractById } from '../../../../../redux/actions/manageAction';
import { convertTime } from '../../../../../utils/time';
import DialogCommon from '../../../common/dialog';
import DialogHistory from './DialogHistory';
import './style.scss';

const contentDialogDelete = {
	title: 'Xoá hợp đồng?',
	content:
		'Hơp đồng đã xóa sẽ có sẵn trong thùng Đã xóa của bạn trong một thời gian ngắn (tối đa 24 giờ) trước khi bị xóa hoàn toàn.',
};

const DetailDocumentwaiting = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const [sender, setSender] = useState({});
	const [receivers, setReceivers] = useState([]);
	const [showDialogDelete, setShowDialogDelete] = useState(false);

	const [showDialogHistory, setShowDialogHistory] = React.useState(false);

	const handleDialogHistory = () => {
		setShowDialogHistory(true);
	};
	const handleCloseDialogHistory = () => {
		setShowDialogHistory(false);
	};
	const openDialogDelete = () => {
		setShowDialogDelete(true);
	};

	const closeDialogDelete = () => {
		setShowDialogDelete(false);
	};

	const { contract } = useSelector((state) => state.manageDocDetail);

	const idDoc = params.id;
	useEffect(() => {
		dispatch(getContractById(idDoc));
	}, [dispatch, idDoc]);

	// set sender and list receiver every contract change
	useEffect(() => {
		if (contract != null) {
			const userContracts = contract.user_contracts;
			userContracts.forEach((uc) => {
				if (uc.owner) {
					setSender(uc.user);
				} else {
					setReceivers((state) => [...state, uc]);
				}
			});
		}
	}, [contract]);

	return (
		<Fragment>
			{contract != null && (
				<Grid container className="detail-waiting">
					<Grid item md={9} className="detail-waiting-main">
						<div className="content-header">
							<p className="content-header-title">Tài liệu đã hoàn thành</p>
						</div>
						<div className="content-info">
							<div className="content-info-title">{contract.title}</div>
							<p>Từ: {sender?.fullName}</p>
							<p>Thay đổi lần cuối: {convertTime(contract.last_modified_date)}</p>
							<p>Gửi ngày: {convertTime(contract.sent_date)}</p>
							<div className="content-info-ground-btn">
								<Button onClick={openDialogDelete} variant="outlined" color="error">
									Xóa
								</Button>
								<DialogCommon
									open={showDialogDelete}
									closeDialogKey={closeDialogDelete}
									title={contentDialogDelete.title}
									content={contentDialogDelete.content}
								/>
								<Button onClick={handleDialogHistory} variant="outlined">
									Lịch sử
								</Button>
								<Button variant="outlined">Tải xuống</Button>
							</div>
						</div>
						<div className="content-receivers">
							<div className="content-receivers-title">Receivers</div>
							{receivers.map((receiver) => (
								<div key={receiver.user.id} className="content-receivers-item">
									<div className="item-info">
										<div className="receiver-info">
											<h6>1</h6>
											{receiver.status === 'COMPLETED' && (
												<DoneIcon
													style={{ color: 'green', marginRight: 10 }}
												/>
											)}
											{receiver.status === 'ACTION_REQUIRE' && (
												<AccessTimeIcon style={{ marginRight: 10 }} />
											)}
											<div>
												<p>{receiver.user.fullName}</p>
												<p>{receiver.user.email}</p>
											</div>
										</div>
										{receiver.status === 'COMPLETED' && (
											<div className="receiver-sign-info">
												<p>Signed</p>
												<p>on 19/20/2021|13:30pm</p>
											</div>
										)}
										{receiver.status === 'ACTION_REQUIRE' && (
											<div className="receiver-sign-info">
												<p>Need to sign</p>
											</div>
										)}
									</div>
									<div className="receiver-private-message">
										<div className="private-message-title">
											Tin nhắn riêng tư
										</div>
										<div className="private-message">
											Đây là tin nhắn riêng tư
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="content-other">
							<div className="content-other-title">Tin nhắn</div>
							<p>Đọc kĩ và kí vào hợp đồng này</p>
						</div>
					</Grid>
					<Grid item md={3} className="detail-waiting-thumbnail">
						<div></div>
					</Grid>
				</Grid>
			)}
			<DialogHistory
				open={showDialogHistory}
				handleCloseDialogHistory={handleCloseDialogHistory}
			/>
		</Fragment>
	);
};

export default DetailDocumentwaiting;

// complete_date: null
// documents: [{…}]
// id: "f189474a-0ad5-4309-acc7-7892a1489056"
// last_modified_date: "2021-11-19T02:53:26.466+00:00"
// sent_date: "2021-11-19T02:53:26.466+00:00"
// signed: false
// title: "ky hop dong"
// user_contracts: Array(2)
// 0:
// id: "2490a1ed-0537-4313-948b-a22b055352ca"
// owner: true
// permission: null
// signed_date: "2021-11-19T02:53:26.474+00:00"
// status: "waiting"
// user: {id: '60929162-22d9-4c29-bab2-6bc9445c3a7e', email: 'minhvu01292918027@gmail.com', fullName: 'Hoang Vu', first_name: 'Hoang', last_name: 'Vu'}
// viewed_date: "2021-11-20T03:50:00.767+00:00"

// user_contracts: Array(2)
// 0:
// id: "2490a1ed-0537-4313-948b-a22b055352ca"
// owner: true
// permission: null
// signed_date: "2021-11-19T02:53:26.474+00:00"
// status: "waiting"
// user: {id: '60929162-22d9-4c29-bab2-6bc9445c3a7e', email: 'minhvu01292918027@gmail.com', fullName: 'Hoang Vu', first_name: 'Hoang', last_name: 'Vu'}
// viewed_date: "2021-11-20T03:51:13.645+00:00"
// [[Prototype]]: Object
// 1:
// id: "c037f4f9-1fe9-428f-bb6b-f2438642aa60"
// owner: false
// permission: "string"
// signed_date: null
// status: "ACTION_REQUIRE"
// user: {id: 'e1745e64-5458-4686-97ab-cc0d2ad13334', email: 'rrfpb.xuantuan1@inbox.testmail.app', fullName: 'Xuan Tuan', first_name: 'Xuan', last_name: 'Tuan'}
// viewed_date: null
