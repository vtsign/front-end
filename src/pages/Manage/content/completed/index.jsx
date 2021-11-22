import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getAllContracts } from '../../../../redux/actions/manageAction';
import ContentHeader from '../../common/contentHeader';
import NoData from '../../common/NoData';
import PaginationCommon from '../../common/Pagination';
import ActionButton from '../button/ActionButton';
import './style.scss';

const DocumentCompleted = () => {
	const history = useHistory();

	const manageDoc = useSelector((state) => state.manageDoc);
	const { isLoading, error, total_pages, contracts } = manageDoc;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllContracts('COMPLETED', 1));
	}, [dispatch]);

	const selectDocumentHandler = (id) => {
		const path = `/manage/completed/${id}`;
		history.push(path);
	};

	const handleOnPageChange = (event, value) => {
		dispatch(getAllContracts('COMPLETED', value));
	};

	return (
		<div className="content">
			{/* {isLoading && <Loading />} */}

			<ContentHeader
				title="Tài liệu đã hoàn thành"
				description="Quản lý tài liệu đã hoàn thành"
			/>
			{contracts.length <= 0 && <NoData></NoData>}
			{contracts.length > 0 && (
				<div>
					<Table className="table-document">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: '30%', fontSize: 14, fontWeight: 600 }}>
									Tên tài liệu
								</TableCell>
								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Người tạo
								</TableCell>
								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Ngày tạo
								</TableCell>
								<TableCell style={{ width: '17%', fontSize: 14, fontWeight: 600 }}>
									Ngày hoàn thành
								</TableCell>
								<TableCell style={{ width: '19%', fontSize: 14, fontWeight: 600 }}>
									Thao tác
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className="table-document-body">
							{contracts != null &&
								contracts.map((row) => {
									return (
										<TableRow
											key={row.id}
											onClick={() => selectDocumentHandler(row.id)}
										>
											<TableCell style={{ color: '#2F80ED', fontSize: 14 }}>
												{row.title}
											</TableCell>
											<TableCell> </TableCell>
											<TableCell>
												{moment(row.complete_date).format('DD/MM/YYYY LT')}
											</TableCell>
											<TableCell>
												{moment(row.sent_date).format('DD/MM/YYYY LT')}
											</TableCell>
											<TableCell onClick={(e) => e.stopPropagation()}>
												<ActionButton
													selectDocumentHandler={selectDocumentHandler}
													id={row.id}
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
				<PaginationCommon
					totalPages={total_pages}
					handleOnPageChange={handleOnPageChange}
				/>
			)}
		</div>
	);
};

export default DocumentCompleted;
