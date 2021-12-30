import { Button, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import "./RequestResetPassword.scss"
import { Fragment, useState } from 'react';
import userApi from '../../api/userApi';
import Loading from '../../components/Loading/Loading';
import { useToast } from '../../components/toast/useToast';

const RequestResetPassword = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [errorMessage, setError] = useState(null);
    const [loading, setLoading] = useState(false);

	const { error } = useToast();

    const requestResetPassword = async () => {
        if (!email) {
            setError("Vui lòng nhập email!");
            return;
        }
        try {
            setLoading(true);
            await userApi.requestResetPassword(email);
            history.replace("/check-email")
        } catch (err) {
			switch (err.status) {
				case 404:
					error('Người dùng không tồn tại');
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
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    return (
		<Fragment>
			{loading && <Loading />}
			<div className="check-email">
				<div className="check-email__box">
					<p className="check-email__box__title">Lấy lại mật khẩu</p>
					<TextField
						id="outlined-basic"
						error={errorMessage !== null}
						label="Nhập email"
						value={email}
						fullWidth
						variant="outlined"
						style={{ marginBottom: '20px' }}
						helperText={errorMessage}
						onChange={handleChangeEmail}
					/>
					<Button
						variant="contained"
						style={{ width: '100%', marginBottom: '20px' }}
						onClick={requestResetPassword}
					>
						Tiếp theo
					</Button>
					<p className="check-email__box__redirect-login">
						<Link to="/login">
							<ArrowBackIcon /> Trang đăng nhập
						</Link>
					</p>
				</div>
			</div>
		</Fragment>
	);
}

export default RequestResetPassword
