import React from 'react'
import { Typography, Button, Paper, Box, Grid } from '@mui/material'
import SuccessIcon from '../../assets/images/success.svg';
import './Activation.scss';
import { useHistory } from 'react-router-dom'
import authenApi from '../../api/authenApi';
import { useToast } from '../../components/toast/useToast';

const Activation = ({ match }) => {
	const userId = match.params.id;

	const history = useHistory();

	const { error } = useToast();


	const handleActivateAccount = async () => {
		const { data, status } = await authenApi.activation(userId);
		if (data === true)
			history.push('/')
		else {
			switch (status) {
				case 400:
					error('Đường dẫn không còn tồn tại');
					break;
				case 410:
					error('Đường dẫn hết hạn');
					break;
				case 500:
					error('Máy chủ gặp trục trặc');
					break;
				default:
					error('Đã có lỗi xảy ra');
					break;
			}
			return;
		}
	}

	return (
		<Grid className="container">
			<Paper variant="outlined" className="activation__wrapper">
				<Box>
					<p>
						<Typography variant="subtitle1" style={{ textAlign: 'center' }}>
							<img src={SuccessIcon} alt="icon" />
						</Typography>
						<Typography
							variant="h4"
							style={{ fontWeight: 'bold', textAlign: 'center' }}
						>
							Chúc mừng bạn đã đăng ký tài khoản thành công!
						</Typography>
						<Typography variant="subtitle1" style={{ textAlign: 'center' }}>
							Tuyệt vời, bạn vừa tạo tài khoản thành công
							<br />
							Vui lòng kích hoạt tài khoản để sử dụng dịch vụ của chúng tôi.
						</Typography>
						<Typography variant="subtitle1" style={{ textAlign: 'center' }}>
							<br />
							<Button
								type="submit"
								variant="contained"
								color="primary"
								onClick={handleActivateAccount}
							>
								Kích hoạt tài khoản
							</Button>
						</Typography>
					</p>
				</Box>
			</Paper>
		</Grid>
	);
}

export default Activation
