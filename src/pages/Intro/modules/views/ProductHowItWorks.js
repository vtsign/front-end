import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const item = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	px: 5,
};

const number = {
	fontSize: 24,
	fontFamily: 'default',
	color: 'secondary.main',
	fontWeight: 'medium',
};

const image = {
	height: 55,
	my: 4,
};

function ProductHowItWorks() {
	return (
		<Box
			component="section"
			sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
		>
			<Container
				sx={{
					mt: 10,
					mb: 15,
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
					Hoạt động
				</Typography>
				<div>
					<Grid container spacing={5}>
						<Grid item xs={12} md={4}>
							<Box sx={item}>
								<Box sx={number}>1.</Box>
								<Box component="img" src="/" alt="Signing" sx={image} />
								<Typography variant="h5" align="center">
									Tải lên hợp đồng pdf và ký kết
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box sx={item}>
								<Box sx={number}>2.</Box>
								<Box component="img" src="/" alt="Sending" sx={image} />
								<Typography variant="h5" align="center">
									Gửi cho đối tác qua địa chỉ email
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box sx={item}>
								<Box sx={number}>3.</Box>
								<Box component="img" src="/" alt="Verify" sx={image} />
								<Typography variant="h5" align="center">
									Định danh bằng địa chỉ mail và SMS OTP
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</div>
			</Container>
		</Box>
	);
}

export default ProductHowItWorks;
