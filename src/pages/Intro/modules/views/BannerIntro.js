import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '../components/Button';
import Typography from '../components/Typography';
import BannerIntroLayout from './BannerIntroLayout';
import Logo from '../../../../assets/images/logo-white.png';
import backgroundBanner from '../../../../assets/images/background1-large.jpg';

const item = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	marginTop: 15,
	marginBottom: 4,
};

export default function BannerIntro() {
	return (
		<BannerIntroLayout
			sxBackground={{
				backgroundImage: `url(${backgroundBanner})`,
				backgroundColor: '#7fc7d9',
				backgroundPosition: 'center',
			}}
		>
			<img style={{ display: 'none' }} src={backgroundBanner} alt="increase priority" />
			<Typography color="inherit" align="center" variant="h4" marked="center">
				Hệ thống ký kết văn bản trực tuyến
			</Typography>
			<Box component="img" src={Logo} alt="fast" sx={{ height: 110 }} />
			<Typography color="inherit" align="center" variant="h5" sx={{ mb: 4, mt: 10 }}>
				Nhanh chóng - Đơn giản - Bảo mật
			</Typography>
			<Typography sx={item}>
				<NavLink to="/register" activeClassName="active">
					<Button
						color="secondary"
						variant="contained"
						size="large"
						sx={{ minWidth: 170, maxWidth: 200, margin: 2 }}
					>
						Đăng ký
					</Button>
				</NavLink>
				<NavLink to="/login" activeClassName="active">
					<Button
						color="secondary"
						variant="contained"
						size="large"
						sx={{ minWidth: 170, maxWidth: 200, margin: 2 }}
					>
						Đăng nhập
					</Button>
				</NavLink>
			</Typography>
			<Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
				Thêm thông tin bên dưới
			</Typography>{' '}
			<Box
				component={ArrowDownwardIcon}
				height="16"
				width="12"
				alt="arrow down"
				sx={{ position: 'absolute', bottom: 65 }}
				onClick={() => {
					window.scrollTo({ top: 750, behavior: 'smooth' });
				}}
				cursor="pointer"
			/>
		</BannerIntroLayout>
	);
}
