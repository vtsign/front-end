import { Button, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import "./RequestResetPassword.scss"
import { Fragment, useState } from 'react';
import userApi from '../../api/userApi';
import Loading from '../../components/Loading/Loading';

const RequestResetPassword = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const requestResetPassword = async () => {
        if (!email) {
            setError("Vui lòng nhập email!");
            return;
        }
        try {
            setLoading(true);
            await userApi.requestResetPassword(email);
            history.replace("/check-email")
        } catch (error) {
            setError("Nguời dùng không tồn tại!");
        }
        setLoading(false);
    }
    const handleChangeEmail = (event) => {
        setError(null)
        setEmail(event.target.value)
    }
    return (
        <Fragment>
            {loading && <Loading />}
            <div className='check-email'>
                <div className='check-email__box'>
                    <p className='check-email__box__title'>Lấy lại mật khẩu</p>
                    <TextField id="outlined-basic"
                        error={error !== null}
                        label="Nhập email"
                        value={email}
                        fullWidth variant="outlined" style={{ marginBottom: '20px' }}
                        helperText={error}
                        onChange={handleChangeEmail}
                    />
                    <Button variant="contained" style={{ width: '100%', marginBottom: '20px' }} onClick={requestResetPassword} >Tiếp theo</Button>
                    <p className='check-email__box__redirect-login'>
                        <Link to="/login">
                            <ArrowBackIcon /> Trang đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default RequestResetPassword
