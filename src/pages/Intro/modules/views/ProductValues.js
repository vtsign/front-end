import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TwoFA from '../../../../assets/images/2FA.svg';
import Easy from '../../../../assets/images/easy.svg';
import Fast from '../../../../assets/images/fast.svg';

const item = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	px: 5,
};

function ProductValues() {
	return (
		<Box component="section" sx={{ display: 'flex', overflow: 'hidden' }}>
			<Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative' }}>
				<Grid container spacing={5}>
					<Grid item xs={12} md={4}>
						<Box sx={item}>
							<Box component="img" src={Fast} alt="fast" sx={{ height: 170 }} />
							<Typography variant="h6" sx={{ my: 2 }}>
								Nhanh Chóng
							</Typography>
							<Typography variant="h5" align="center">
								{
									'Hệ thống VTSign cung cấp phương tiện ký kết nhanh chóng, gửi nhiều đối tác cùng một lúc'
								}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={item}>
							<Box component="img" src={Easy} alt="easy" sx={{ height: 170 }} />
							<Typography variant="h6" sx={{ my: 2 }}>
								Đơn giản
							</Typography>
							<Typography variant="h5" align="center">
								{
									'Hệ thống ký kết của chúng tôi gồm 3 bước đơn giản, dễ sử dụng cho nhiều đối tượng, tải lên tài liệu, ký kết và gửi'
								}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={item}>
							<Box component="img" src={TwoFA} alt="security" sx={{ height: 170 }} />
							<Typography variant="h6" sx={{ my: 2 }}>
								Bảo mật
							</Typography>
							<Typography variant="h5" align="center">
								{
									'An toàn và bảo mật, chúng tôi sử dụng xác thực định danh qua tài khoản email và SMS OTP với đối tác ký tài liệu'
								}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default ProductValues;
