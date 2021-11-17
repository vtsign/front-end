import DirectionsIcon from '@mui/icons-material/Directions';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Pagination } from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Loading from '../../../../components/Loading/Loading';
import { getAllContracts } from '../../../../redux/actions/manageAction';
import ContentHeader from '../../common/contentHeader';
import ActionButton from '../button/ActionButton';
import './style.scss';

const DocumentCompleted = () => {
	const history = useHistory();

	const manageDoc = useSelector((state) => state.manageDoc);
	const { isLoading, error, total_pages, current_page, total_items, contracts } = manageDoc;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllContracts('COMPLETED', 1));
	}, [dispatch]);



	const selectDocumentHandler = (id) => {
		const path = `/manage/completed/${id}`;
		history.push(path);
	};

	const handleOnPageChage = (event, value) => {
		dispatch(getAllContracts('COMPLETED', value));
	}

	return (
		<div className="content">
			{/* {isLoading && <Loading />} */}
			<ContentHeader  title="Tài liệu chờ kí" description="Quản lý tài liệu chờ kí" />
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
						{contracts != null && contracts.map((row) => {
							
							return (
								<TableRow
									key={row.id}
									onClick={() => selectDocumentHandler(row.id)}
								>
									<TableCell style={{ color: '#2F80ED', fontSize: 14 }}>
										{row.title}
									</TableCell>
									<TableCell> </TableCell>
									<TableCell>{moment(row.complete_date).format("DD/MM/YYYY LT")}</TableCell>
									<TableCell>{moment(row.sent_date).format("DD/MM/YYYY LT")}</TableCell>
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
			<Pagination className="content-pagination" count={total_pages} onChange={handleOnPageChage} color="primary" />
		</div>
	);
};

export default DocumentCompleted;
