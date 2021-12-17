import React, { useEffect, useState } from 'react';
import './TransactionHistory.scss';
import {
	Container,
	Card,
	Grid,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router';
import userApi from '../../api/userApi';
import PageHeader from './PageHeader';
import Loading from '../../components/Loading/Loading';
import { convertTime } from '../../utils/time';

const payments = {
	deposit: 'Nạp tiền vào tài khoản',
	payment: 'Thanh toán dịch vụ',
	refund: 'Hoàn tiền',
	init_balance: 'Đăng ký tài khoản',
};

const TransactionHistory = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	// const [rowsPerPage, setRowsPerPage] = useState(5);

	// const history = useHistory();
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get('page')) || 1;
	const size = parseInt(query.get('size')) || 5;
	const formatNumber = (num) => {
		num = Math.round((num ?? 0) * 10 + Number.EPSILON) / 10;
		return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const history = useHistory();

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				const transactionResponse = await userApi.getTransactions(page, size);

				if (transactionResponse.status === 200){
					setData(transactionResponse.data);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log(err);
			}
		})();
	}, [page, size]);

	const handleChangePage = async (e, page) => {
		history.replace(`/transaction-history?page=${page + 1}&size=${size}`);
	};

	const handleChangeRowsPerPage = async (e, rows) => {
		history.replace(`/transaction-history?page=1&size=${rows.props.value}`);
	};

	return (
		<Container>
			<Grid className="table__container">
				{loading && <Loading />}
				<PageHeader title="Lịch sử giao dịch" />

				<Card>
					<TableContainer sx={{ minWidth: 800 }}>
						<Table>
							<TableHead>
								<TableRow style={{ backgroundColor: '#F4F6F8' }}>
									<TableCell style={{ fontSize: 14, fontWeight: 600 }}>
										Mã giao dịch
									</TableCell>
									<TableCell style={{ fontSize: 14, fontWeight: 600 }}>
										Số tiền
									</TableCell>
									<TableCell style={{ fontSize: 14, fontWeight: 600 }}>
										Thời gian giao dịch
									</TableCell>
									<TableCell style={{ fontSize: 14, fontWeight: 600 }}>
										Loại giao dịch
									</TableCell>
									<TableCell style={{ fontSize: 14, fontWeight: 600 }}>
										Phương thức thanh toán
									</TableCell>
									<TableCell style={{ fontSize: 14, fontWeight: 600 }}>
										Mô tả
									</TableCell>
								</TableRow>
							</TableHead>
							{data && data?.transaction_monies?.length > 0 ? (
								<>
									<TableBody>
										{data?.transaction_monies?.map((transaction, index) => (
											<TableRow hover>
												<TableCell style={{ lineHeight: '24px' }}>
													{transaction.id}
												</TableCell>
												{transaction.status === 'deposit' ||
												transaction.status === 'init_balance' ? (
													<TableCell
														style={{
															lineHeight: '24px',
															color: 'green',
														}}
														align="right"
													>
														{`+ ${formatNumber(transaction.amount)} đ`}
													</TableCell>
												) : (
													<TableCell
														style={{ lineHeight: '24px', color: 'red' }}
														align="right"
													>
														{`- ${formatNumber(transaction.amount)} đ`}
													</TableCell>
												)}
												<TableCell style={{ lineHeight: '24px' }}>
													{convertTime(transaction.created_date) ?? ''}
												</TableCell>
												<TableCell style={{ lineHeight: '24px' }}>
													{payments[transaction.status]}
												</TableCell>
												<TableCell style={{ lineHeight: '24px' }}>
													{transaction.method || 'VTSign - Thanh toán dịch vụ'}
												</TableCell>
												<TableCell style={{ lineHeight: '24px' }}>
													{transaction.description}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25]}
										count={data.total_items}
										rowsPerPage={size}
										page={page - 1}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</>
							) : (
								<TableBody>
									<TableRow>
										<TableCell colSpan={3}>
											Không tìm thấy dữ liệu phù hợp
										</TableCell>
									</TableRow>
								</TableBody>
							)}
						</Table>
					</TableContainer>
				</Card>
			</Grid>
		</Container>
	);
};

export default TransactionHistory;
