import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { getAllContracts } from '../../../redux/actions/manageAction';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ContentHeader from './contentHeader';
import NoData from "./NoData"
import { Pagination } from '@mui/material';
import ActionButton from './button/ActionButton';
import './style.scss';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 8,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === 'light' ? '#00ca1b' : '#308fe8',
	},
}));

const calculateReceiverCompleted = (userContracts) => {
	let totalReceiverCompleted = 0;

	userContracts.forEach((userContract) => {
		if (userContract.status === 'SIGNED' || userContract.status === 'COMPLETED' || userContract.status === 'READ') {
			totalReceiverCompleted++;
		}
	});

	return totalReceiverCompleted;
};

const ManageDocument = ({ status, path, cxtHeader }) => {
	const history = useHistory();
	const location = useLocation();
	const queryParam = new URLSearchParams(location.search);
	const fieldSort = queryParam.get("field");
	const sort = queryParam.get("sort");

	const manageDoc = useSelector((state) => state.manageDoc);
	const { total_pages, contracts } = manageDoc;
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllContracts({ status, page: 1 }));
	}, [dispatch]);

	const selectDocumentHandler = (id) => {
		const url = `${path}${id}`;
		history.push(url);
	};

	const handleOnPageChange = (event, page) => {
		dispatch(getAllContracts({ status, page }));
		setPage(page);
	};

	const showIconSort = (sort === 'desc' ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />
	)
	return (
		<div className="content">
			{/* {isLoading && <Loading />} */}

			<ContentHeader
				title={cxtHeader.title}
				description={cxtHeader.description}
				status={status}
			/>
			{contracts && contracts.length <= 0 && <NoData />}
			{contracts && contracts.length > 0 && (
				<div>
					<Table className="table-document">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: '30%', fontSize: 14, fontWeight: 600 }}>
									<p style={{ display: 'inline' }}>Tên tài liệu</p>
									{
										(fieldSort === null || fieldSort === "name") && showIconSort
									}
								</TableCell>
								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Người tạo
								</TableCell>
								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Ngày tạo
									{
										(fieldSort === "createDate") && showIconSort
									}
								</TableCell>
								{status !== "COMPLETED" && (<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Trạng thái
								</TableCell>)}
								{status === "COMPLETED" && (<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Ngày hoàn thành
									{
										(fieldSort === "completeDate") && showIconSort
									}
								</TableCell>)}
								<TableCell style={{ width: '19%', fontSize: 14, fontWeight: 600 }}>
									Thao tác
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className="table-document-body">
							{contracts != null &&
								contracts.map((row) => {
									const totalCompleted = calculateReceiverCompleted(
										row.user_contracts
									);
									const percentCompleted =
										(totalCompleted / (row.user_contracts.length - 1)) * 100;
									return (
										<TableRow
											key={row.id}
											onClick={() => selectDocumentHandler(row.id)}
										>
											<TableCell style={{ color: '#2F80ED', fontSize: 14 }}>
												{row.title}
											</TableCell>
											<TableCell>
												{
													row.user_contracts.find((uc) => uc.owner).user
														.full_name
												}
											</TableCell>
											<TableCell>
												{moment(row.complete_date).format('DD/MM/YYYY LT')}
											</TableCell>
											{status !== "COMPLETED" && (<TableCell>
												<div>
													<BorderLinearProgress
														variant="determinate"
														value={percentCompleted}
													/>
													<p style={{ textAlign: 'center' }}>
														{totalCompleted}/
														{row.user_contracts.length - 1} hoàn thành
													</p>
												</div>
											</TableCell>)}
											{status === "COMPLETED" && (<TableCell>
												{moment(row.sent_date).format('DD/MM/YYYY LT')}
											</TableCell>)}
											<TableCell onClick={(e) => e.stopPropagation()}>
												<ActionButton
													selectDocumentHandler={selectDocumentHandler}
													contract={row}
												/>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>
			)}
			{contracts.length > 0 && (
				<Pagination
					className="content-pagination"
					count={total_pages}
					defaultPage={page}
					onChange={handleOnPageChange}
					color="primary"
				/>
			)}
		</div>
	);
};

export default ManageDocument;
