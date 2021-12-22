import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
import Typography from '../components/Typography';
import BannerIntroLayout from './BannerIntroLayout';
const backgroundImage =
	'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

export default function BannerIntro() {
	return (
		<BannerIntroLayout
			sxBackground={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundColor: '#7fc7d9',
				backgroundPosition: 'center',
			}}
		>
			<img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
			<Typography color="inherit" align="center" variant="h2" marked="center">
				Hệ thống ký kết văn bản trực tuyến
			</Typography>
			<Typography
				color="inherit"
				align="center"
				variant="h5"
				sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
			>
				Nhanh chóng - Đơn giản - Bảo mật
			</Typography>

			<Typography sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}>
				<NavLink to="/register" activeClassName="active">
					<Button
						color="secondary"
						variant="contained"
						size="large"
						sx={{ minWidth: 200, mr: 5 }}
					>
						Đăng ký
					</Button>
				</NavLink>
				<NavLink to="/login" activeClassName="active">
					<Button
						color="secondary"
						variant="contained"
						size="large"
						sx={{ minWidth: 200 }}
					>
						Đăng nhập
					</Button>
				</NavLink>
			</Typography>

			<Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
				Thêm thông tin bên dưới
			</Typography>
		</BannerIntroLayout>
	);
}
