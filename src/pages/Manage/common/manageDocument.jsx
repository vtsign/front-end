import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { Pagination } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { getAllContracts } from '../../../redux/actions/manageAction';
import Loading from '../../../components/Loading/Loading';
import ActionButton from './button/ActionButton';
import ContentHeader from './contentHeader';
import NoData from "./NoData";
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
	const manageDoc = useSelector((state) => state.manageDoc);
	const { total_pages, contracts, isLoading } = manageDoc;
	const [hasOnChange, setHasOnChange] = useState(false);
	const dispatch = useDispatch();
	const queryParam = new URLSearchParams(location.search);
	const page = queryParam.get('page') || 1;
	const sortField = queryParam.get('sortField') || 'title';
	const sortType = queryParam.get('sortType') || 'asc';

	useEffect(() => {
		dispatch(getAllContracts({ status, page, sortField, sortType }));
	}, [hasOnChange, dispatch, page, sortField, status, sortType]);


	const selectDocumentHandler = () => {
		setHasOnChange(preState => !preState);
	};


	const handleDetail = (id) => {
		const url = `${path}/${id}`;
		history.push(url);
	};

	const handleOnPageChange = (event, page) => {
		history.replace(`${path}?sortField=${sortField}&sortType=${sortType}&status=${status}&page=${page}`)
	};

	const handleSort = (field) => {
		let type = 'asc';
		if (sortField === field && sortType === 'asc') {
			type = 'desc';
		}
		history.replace(`${path}?sortField=${field}&sortType=${type}&status=${status}&page=${page}`)
	}

	const showIconSort = (sortType === 'desc' ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />
	)
	return (
		<div className="content">

			<ContentHeader
				title={cxtHeader.title}
				description={cxtHeader.description}
				status={status}
			/>
			{isLoading && <Loading />}
			{contracts && contracts.length <= 0 && !isLoading && <NoData />}
			{contracts && contracts.length > 0 && (
				<div>
					<Table className="table-document">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: '30%', fontSize: 14, fontWeight: 600 }}>
									<div onClick={() => handleSort("title")} style={{ display: 'inline', cursor: 'pointer' }}>
										Tên tài liệu
										{
											(sortField === null || sortField === "title") && showIconSort
										}
									</div>
								</TableCell>
								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Người tạo
								</TableCell>
								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									<div onClick={() => handleSort("createdDate")} style={{ display: 'inline', cursor: 'pointer' }}>
										Ngày tạo
										{
											(sortField === "createdDate") && showIconSort
										}
									</div>
								</TableCell>
								{status !== "COMPLETED" && (<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Trạng thái
								</TableCell>)}
								{status === "COMPLETED" && (<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									<div onClick={() => handleSort("completeDate")} style={{ display: 'inline', cursor: 'pointer' }}>
										Ngày hoàn thành
										{
											(sortField === "completeDate") && showIconSort
										}
									</div>
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
											onClick={() => handleDetail(row.id)}
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
												{moment(row.sent_date).format('DD/MM/YYYY LT')}
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
												{moment(row.complete_date).format('DD/MM/YYYY LT')}
											</TableCell>)}
											<TableCell onClick={(e) => e.stopPropagation()}>
												<ActionButton
													selectDocumentHandler={selectDocumentHandler}
													contract={row}
													status={status}
													path={path}
												/>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>
			)}
			{contracts && contracts.length > 0 && (
				<Pagination
					className="content-pagination"
					count={total_pages}
					page={typeof page === "string" ? parseInt(page) : page}
					onChange={handleOnPageChange}
					color="primary"
				/>
			)}
		</div>
	);
};

export default ManageDocument;
