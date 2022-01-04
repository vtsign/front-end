import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import Signing from '../../../../assets/images/signing.svg';
import Sending from '../../../../assets/images/sending.svg';
import Verify from '../../../../assets/images/verify.svg';

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
	height: 170,
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
				<Typography variant="h4" marked="center" component="h2" sx={{ mb: 3 }}>
					Hoạt động
				</Typography>
				<Typography align="center" variant="h5" sx={{ mb: 5 }}>
					VTSign cung cấp giải pháp đáng tin cậy chuyên nghiệp cho bạn. Bất kể bạn đang ở
					trong văn phòng hay tại nhà, chỉ 3 bước đơn giản bạn đã có thể ký kết trực
					tuyến.
				</Typography>
				<div>
					<Grid container spacing={5}>
						<Grid item xs={12} md={4}>
							<Box sx={item}>
								<Box sx={number}>1.</Box>
								<Box component="img" src={Signing} alt="Signing" sx={image} />
								<Typography variant="h5" align="center">
									Tải lên văn bản hợp đồng và thực hiện ký kết
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box sx={item}>
								<Box sx={number}>2.</Box>
								<Box component="img" src={Sending} alt="Sending" sx={image} />
								<Typography variant="h5" align="center">
									Gửi cho một hoặc nhiều đối tác qua địa chỉ email
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4}>
							<Box sx={item}>
								<Box sx={number}>3.</Box>
								<Box component="img" src={Verify} alt="Verify" sx={image} />
								<Typography variant="h5" align="center">
									Đối tác đăng nhập email, nhập mã SMS OTP và ký kết
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
