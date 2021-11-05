import React, { useEffect, useState } from 'react';
import './manage.scss';
import { Container, Grid, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

const Manage = () => {
	return (
		<Container>
			<Grid>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Tên tài liệu</TableCell>
							<TableCell>Người tạo</TableCell>
							<TableCell>Ngày tạo</TableCell>
							<TableCell>Thay đổi cuối</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Sample</TableCell>
							<TableCell>Người tạo</TableCell>
							<TableCell>Ngày tạo</TableCell>
							<TableCell>Thay đổi cuối</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Grid>
		</Container>
	);
};

export default Manage;
