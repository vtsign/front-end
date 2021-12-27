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
	Box
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material"
import { useHistory, useLocation } from 'react-router';
import userApi from '../../api/userApi';
import PageHeader from './PageHeader';
import Loading from '../../components/Loading/Loading';
import { convertTime } from '../../utils/time';
import { useToast } from '../../components/toast/useToast';

const payment = {
	status: {
		deposit: 'Nạp tiền vào tài khoản',
		payment: 'Thanh toán dịch vụ',
		refund: 'Hoàn tiền',
		init_balance: 'Đăng ký tài khoản',
	},
	method: {
		zalopayapp: "ZaloPay App",
		ATM: "Thẻ ATM",
		CC: "Thẻ tín dụng",
		INIT: "VTSign - Đăng ký tài khoản",
		PAYMENT: "VTSign - Thanh toán dịch vụ",
		REFUND: "VTSign - Hoàn tiền",
	}
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
	const sort_field = query.get('sort_field') || "";
	const sort_type = query.get('sort_type') || "";
	const formatNumber = (num) => {
		num = Math.round((num ?? 0) * 10 + Number.EPSILON) / 10;
		return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const history = useHistory();

	const { error } = useToast();

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				const transactionResponse = await userApi.getTransactions({
					page,
					size,
					sort_field,
					sort_type
				});

				if (transactionResponse.status === 200){
					setData(transactionResponse.data);
				} else {
					switch (transactionResponse.status) {
						case 400:
							error('Thiếu thông tin hoặc access token');
							break;
						case 403:
							error('Người dùng không có quyền truy cập nội dung này');
							break;
						case 419:
							error('Thiếu một số trường thông tin bắt buộc');
							break;
						case 500:
							error('Máy chủ gặp trục trặc');
							break;
						default:
							error('Đã có lỗi xảy ra');
							break;
					}
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log(err);
			}
		})();
	}, [page, size, sort_field, sort_type]);

	const handleChangePage = async (e, page) => {
		history.replace(`/transaction-history?page=${page + 1}&size=${size}`);
	};

	const handleChangeRowsPerPage = async (e, rows) => {
		history.replace(`/transaction-history?page=1&size=${rows.props.value}`);
	};

	const handleSort = (field) => {
		let type = 'asc';
		if (sort_type === 'asc') type = 'desc';
		let query = '';
		if (size) query += `&size=${size}`;
		history.push(`/transaction-history?page=${1}${query}&sort_field=${field}&sort_type=${type}`);
	};

	function displayLabel(data) {
		data.from = data.page * parseInt(size) + 1;
		data.to = data.from + parseInt(size) - 1;
		return (
			<span>
				từ <b>{Math.min(data.from, data.count)}</b> đến{' '}
				<b>{Math.min(data.to, data.count)}</b> trong <b>{data.count}</b>
				{' giao dịch'}
			</span>
		);
	}

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
									<TableCell
										style={{ fontSize: 14, fontWeight: 600 }}
										onClick={() => handleSort('id')}
									>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												cursor: 'pointer',
											}}
										>
											<p>Mã giao dịch</p>
											{sort_field === 'id' && sort_type === 'asc' ? (
												<KeyboardArrowUp />
											) : (
												<KeyboardArrowDown />
											)}
										</Box>{' '}
									</TableCell>
									<TableCell
										style={{ fontSize: 14, fontWeight: 600 }}
										onClick={() => handleSort('amount')}
									>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												cursor: 'pointer',
											}}
										>
											<p>Số tiền</p>
											{sort_field === 'amount' && sort_type === 'asc' ? (
												<KeyboardArrowUp />
											) : (
												<KeyboardArrowDown />
											)}
										</Box>{' '}
									</TableCell>
									<TableCell
										style={{ fontSize: 14, fontWeight: 600 }}
										onClick={() => handleSort('createdDate')}
									>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												cursor: 'pointer',
											}}
										>
											<p>Thời gian giao dịch</p>
											{sort_field === 'createdDate' && sort_type === 'asc' ? (
												<KeyboardArrowUp />
											) : (
												<KeyboardArrowDown />
											)}
										</Box>{' '}
									</TableCell>
									<TableCell
										style={{ fontSize: 14, fontWeight: 600 }}
										onClick={() => handleSort('status')}
									>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												cursor: 'pointer',
											}}
										>
											<p>Loại giao dịch</p>
											{sort_field === 'status' && sort_type === 'asc' ? (
												<KeyboardArrowUp />
											) : (
												<KeyboardArrowDown />
											)}
										</Box>{' '}
									</TableCell>
									<TableCell
										style={{ fontSize: 14, fontWeight: 600 }}
										onClick={() => handleSort('method')}
									>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												cursor: 'pointer',
											}}
										>
											<p>Phương thức thanh toán</p>
											{sort_field === 'method' && sort_type === 'asc' ? (
												<KeyboardArrowUp />
											) : (
												<KeyboardArrowDown />
											)}
										</Box>{' '}
									</TableCell>
									<TableCell
										style={{ fontSize: 14, fontWeight: 600 }}
										onClick={() => handleSort('description')}
									>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												cursor: 'pointer',
											}}
										>
											<p>Mô tả</p>
											{sort_field === 'description' && sort_type === 'asc' ? (
												<KeyboardArrowUp />
											) : (
												<KeyboardArrowDown />
											)}
										</Box>{' '}
									</TableCell>
								</TableRow>
							</TableHead>
							{data && data?.list?.length > 0 ? (
								<>
									<TableBody>
										{data?.list?.map((transaction, index) => (
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
													{payment.status[transaction.status]}
												</TableCell>
												<TableCell style={{ lineHeight: '24px' }}>
													{payment.method[transaction.method]}
												</TableCell>
												<TableCell style={{ lineHeight: '24px' }}>
													{transaction.description}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25]}
										labelRowsPerPage="Hiển thị mỗi trang"
										labelDisplayedRows={displayLabel}
										count={data.total_elements}
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
