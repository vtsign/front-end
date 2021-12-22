import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
const item = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	px: 5,
};
function FAQs() {
	return (
		<Container
			component="section"
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
		>
			<Button
				sx={{
					border: '4px solid currentColor',
					borderRadius: 0,
					height: 'auto',
					py: 2,
					px: 5,
				}}
			>
				<Typography variant="h4" component="span">
					Các câu hỏi thường gặp?
				</Typography>
			</Button>
			<Typography variant="subtitle1" sx={{ my: 3 }}>
				Chúng tôi sẵn sàng trả lời
			</Typography>
			<Grid container spacing={5}>
				<Grid item xs={12} md={4}>
					<Box sx={item}>
						<Typography variant="h6">
							<Link to="/privacy">Chính sách</Link>
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={4}>
					<Box sx={item}>
						<Typography variant="h6">
							<Link to="/failedpayment">Phí dịch vụ</Link>
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} md={4}>
					<Box sx={item}>
						<Typography variant="h6">
							<Link to="/failedsystem">Lỗi hệ thống</Link>
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default FAQs;
