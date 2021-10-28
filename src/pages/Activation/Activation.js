import React from 'react'
import { Typography, Button, Paper, Box } from '@mui/material'
import SuccessIcon from '../../assets/images/success.svg';
import './Activation.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Activation = ({ match }) => {
	const userId = match.params.id;

	const history = useHistory();


	const handleActivateAccount = async () => {
		const { data } = await axios.get(
			`https://api.vtsign.tech/user/apt/activation/${userId}`
		);
		if (data === true)
			history.push('/')
		else
			console.log("error activation ...");
			return;
	}

	return (
		<Paper variant="outlined" className="activationContainer" >
			<Box>
				<p>
					<Typography variant="subtitle1" style={{ textAlign: 'center' }}>
						<img src={SuccessIcon} alt="icon" />
					</Typography>
					<Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
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
	);
}

export default Activation
