import { Button, TextField, IconButton, InputAdornment, InputLabel } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import "./ResetPassword.scss"
import { Fragment, useState } from 'react';
import userApi from '../../api/userApi';
import Loading from '../../components/Loading/Loading';
import { REG_PASSWORD } from '../../components/constants/global.js';
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
    const history = useHistory();
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenVerifyPassword, setHiddenVerifyPassword] = useState(true);
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const doLogin = (formData) => {
        // console.log(formData);
        console.log("formData...", formData)
        // history.push('/login')
    };

    return (
        <Fragment>
            {loading && <Loading />}
            <div className='check-email'>
                <div className='check-email__box'>
                    <p className='check-email__box__title'>Lấy lại mật khẩu</p>
                    <form>
                        <InputLabel>
                            Nhập mật khẩu <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <TextField
                            name="password"
                            style={{ marginBottom: '20px' }}
                            fullWidth
                            type={hiddenPassword ? 'password' : 'text'}
                            placeholder="Nhập mật khẩu"
                            {...register('password', {
                                required: 'Nhập mật khẩu',
                                pattern: {
                                    value: REG_PASSWORD,
                                    message:
                                        'Mật khẩu phải tối thiểu 8 ký tự bao gồm chữ hoa, chữ thường, số',
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setHiddenPassword(!hiddenPassword);
                                            }}
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                            }}
                                            edge="end"
                                        >
                                            {hiddenPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <InputLabel>
                            Xác thực mật khẩu <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <TextField
                            name="verifyPassword"
                            style={{ marginBottom: '20px' }}
                            fullWidth
                            type={hiddenVerifyPassword ? 'password' : 'text'}
                            placeholder="Nhập xác thực mật khẩu"
                            {...register('verifyPassword', {
                                required: 'Vui lòng xác nhận mật khẩu',
                                pattern: {
                                    value: REG_PASSWORD,
                                    message:
                                        'Mật khẩu phải tối thiểu 8 ký tự bao gồm chữ hoa, chữ thường, số',
                                },
                            })}
                            error={!!errors.verifyPassword}
                            helperText={errors?.verifyPassword?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setHiddenVerifyPassword(!hiddenVerifyPassword);
                                            }}
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                            }}
                                            edge="end"
                                        >
                                            {hiddenVerifyPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type='submit' variant="contained" style={{ width: '100%', marginBottom: '20px' }} onClick={handleSubmit(doLogin)} >Hoàn thành</Button>
                    </form>
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

export default ResetPassword
