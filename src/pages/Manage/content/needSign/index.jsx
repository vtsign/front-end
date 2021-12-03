
import React from 'react'
import ManageDocument from '../../common/manageDocument'

const cxtHeader = {
	title: "Tài liệu cần ký",
	description: "Quản lý tài liệu cần ký"
}

const documentNeedSign = () => {
	return (
		<ManageDocument status='ACTION_REQUIRE' path="/manage/need-sign/" cxtHeader={cxtHeader} />
	)
}
export default documentNeedSign

// import { Pagination } from '@mui/material';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { makeStyles } from '@mui/styles';
// import moment from 'moment';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import { getAllContracts } from '../../../../redux/actions/manageAction';
// import ContentHeader from '../../common/contentHeader';
// import NoData from '../../common/NoData';
// import ActionButton from '../button/ActionButton';
// import { convertTime } from '../../../../utils/time';

// import './style.scss';

// const calculateReceiverCompleted = (userContracts) => {
// 	let totalReceiverCompleted = 0;

// 	userContracts.forEach((userContract) => {
// 		if (userContract.status === 'COMPLETED') {
// 			totalReceiverCompleted++;
// 		}
// 	});

// 	return totalReceiverCompleted;
// };

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
// 	height: 8,
// 	borderRadius: 5,
// 	[`&.${linearProgressClasses.colorPrimary}`]: {
// 		backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
// 	},
// 	[`& .${linearProgressClasses.bar}`]: {
// 		borderRadius: 5,
// 		backgroundColor: theme.palette.mode === 'light' ? '#00ca1b' : '#308fe8',
// 	},
// }));

// const DocumentNeedSign = () => {
// 	const history = useHistory();
// 	const [select, setSelect] = useState(10);

// 	const manageDoc = useSelector((state) => state.manageDoc);
// 	const { total_pages, contracts } = manageDoc;

// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		dispatch(getAllContracts({ status: 'ACTION_REQUIRE', page: 1 }));
// 	}, [dispatch]);

// 	const handleChange = (event) => {
// 		setSelect(event.target.value);
// 	};

// 	const selectDocumentHandler = (id) => {
// 		const path = `/manage/need-sign/${id}`;
// 		history.push(path);
// 	};

// 	const handleOnPageChage = (event, page) => {
// 		dispatch(getAllContracts({ status: 'ACTION_REQUIRE', page }));
// 	};
// 	return (
// 		<div className="content">
// 			<ContentHeader
// 				title="Tài liệu cần ký"
// 				description="Quản lý tài liệu cần ký"
// 				status="ACTION_REQUIRE"
// 			/>
// 			{contracts.length <= 0 && <NoData />}
// 			{contracts.length > 0 && (
// 				<div>
// 					<Table className="table-document">
// 						<TableHead>
// 							<TableRow>
// 								<TableCell style={{ width: '30%', fontSize: 14, fontWeight: 600 }}>
// 									Tên tài liệu
// 								</TableCell>
// 								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
// 									Ngày tạo
// 								</TableCell>
// 								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
// 									Trạng thái
// 								</TableCell>
// 								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
// 									Thay đổi cuối
// 								</TableCell>
// 								<TableCell style={{ width: '19%', fontSize: 14, fontWeight: 600 }}>
// 									Thao tác
// 								</TableCell>
// 							</TableRow>
// 						</TableHead>
// 						<TableBody className="table-document-body">
// 							{contracts != null &&
// 								contracts.map((row) => {
// 									const totalCompleted = calculateReceiverCompleted(
// 										row.user_contracts
// 									);
// 									const percentCompleted =
// 										(totalCompleted / (row.user_contracts.length - 1)) * 100;
// 									return (
// 										<TableRow
// 											key={row.id}
// 											onClick={() => selectDocumentHandler(row.id)}
// 										>
// 											<TableCell style={{ color: '#2F80ED', fontSize: 14 }}>
// 												{row.title}
// 											</TableCell>
// 											<TableCell>{convertTime(row.sent_date)}</TableCell>
// 											<TableCell>
// 												<div>
// 													<BorderLinearProgress
// 														variant="determinate"
// 														value={percentCompleted}
// 													/>
// 													<p style={{ textAlign: 'center' }}>
// 														{totalCompleted}/
// 														{row.user_contracts.length - 1} hoàn thành
// 													</p>
// 												</div>
// 											</TableCell>
// 											<TableCell>{convertTime(row.sent_date)}</TableCell>
// 											<TableCell onClick={(e) => e.stopPropagation()}>
// 												<ActionButton />
// 											</TableCell>
// 										</TableRow>
// 									);
// 								})}
// 						</TableBody>
// 					</Table>
// 				</div>
// 			)}
// 			{contracts.length > 0 && (
// 				<Pagination
// 					className="content-pagination"
// 					count={total_pages}
// 					onChange={handleOnPageChage}
// 					color="primary"
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default DocumentNeedSign;
