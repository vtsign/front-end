import { Pagination } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getAllContracts } from '../../../../redux/actions/manageAction';
import ContentHeader from '../../common/contentHeader';
import ActionButton from '../button/ActionButton';
import './style.scss';


const useStyles = makeStyles({
	contentSelectTile: {
		marginBottom: '10px',
	},

	contentSelectBtn: {
		minWidth: '200px',
	},
});


const calculateReceiverCompleted = (userContracts) => {
	let totalReceiverCompleted = 0;

	userContracts.forEach(userContract => {
		if (userContract.status === "COMPLETED") {
			totalReceiverCompleted++;
		}
	})

	return totalReceiverCompleted;
}

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

const DocumentCompleted = () => {
	const history = useHistory();
	const [select, setSelect] = useState(10);


	const manageDoc = useSelector(state => state.manageDoc);
	const { isLoading, error, total_pages, current_page, total_items, contracts } = manageDoc;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllContracts("WAITING", 1));
	}, [dispatch]);

	const handleChange = (event) => {
		setSelect(event.target.value);
	};

	const selectDocumentHandler = (id) => {
		const path = `/manage/waiting/${id}`;
		history.push(path);
	};

	const handleOnPageChage = (event, value) => {
		dispatch(getAllContracts("WAITING", value))
	}
	console.log("contracts: ");
	console.log(contracts);
	return (
		<div className="content">
			{/* {isLoading && <Loading />} */}
			<ContentHeader title="Tài liệu chờ kí" description="Quản lý tài liệu chờ kí" />
			<div>
				<Table className="table-document">
					<TableHead>
						<TableRow>
							<TableCell style={{ width: '30%', fontSize: 14, fontWeight: 600 }}>
								Tên tài liệu
							</TableCell>
							<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
								Ngày tạo
							</TableCell>
							<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
								Trạng thái
							</TableCell>
							<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
								Thay đổi cuối
							</TableCell>
							<TableCell style={{ width: '19%', fontSize: 14, fontWeight: 600 }}>
								Thao tác
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className="table-document-body">
						{contracts != null && contracts.map((row) => {
							const totalCompleted = calculateReceiverCompleted(row.user_contracts);
							const percentCompleted = totalCompleted / (row.user_contracts.length - 1) * 100;
							console.log(totalCompleted);
							return (
								<TableRow key={row.id} onClick={() => selectDocumentHandler(row.id)}>
									<TableCell style={{ color: '#2F80ED', fontSize: 14 }}>
										{row.title}
									</TableCell>
									<TableCell>{moment(row.sent_date).format("DD/MM/YYYY LT")}</TableCell>
									<TableCell>
											<div>
											<BorderLinearProgress
												variant="determinate"
												value={percentCompleted}
											/>
											<p style={{ textAlign: 'center' }}>{ totalCompleted }/{row.user_contracts.length -1} hoàn thành</p>
										</div>
										
									</TableCell>
									<TableCell>{moment(row.sent_date).format("DD/MM/YYYY LT")}</TableCell>
									<TableCell onClick={(e) => e.stopPropagation()}>
										<ActionButton />
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
			<Pagination className="content-pagination" count={total_pages} onChange={handleOnPageChage} color="primary" />
		</div>
	);
};

export default DocumentCompleted;
