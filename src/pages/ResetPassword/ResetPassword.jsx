import { Button, TextField, IconButton, InputAdornment, InputLabel } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import "./ResetPassword.scss"
import { Fragment, useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import Loading from '../../components/Loading/Loading';
import { REG_PASSWORD } from '../../components/constants/global.js';
import { useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import LinkExpire from '../../components/ResetPassword/LinkExpire';
import NotFound from '../Common/NotFound';
import CancelError from '../Common/CancelError';

const ResetPassword = () => {
    const history = useHistory();
    const location = useLocation();
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenVerifyPassword, setHiddenVerifyPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState();
    const queryParam = new URLSearchParams(location.search);
    const code = queryParam.get('code');


    useEffect(() => {
        if (code == null) {
            history.replace("/not-found");
            return;
        }

        (async () => {
            setLoading(true)
            try {
                await userApi.checkResetPassword(code);
                setType("SUCCESS");
            } catch (err) {
                if (err.status === 404) {
                    console.log("da vao 404");
                    setType("NOTFOUND")
                } else {
                    setType("EXPIRED");
                }
            }
            setLoading(false)
        })()
    }, []);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const doLogin = async (formData) => {
        if (formData.password !== formData.verifyPassword) {
            setError("verifyPassword", {
                type: "manual",
                message: "Mật khẩu không trùng khớp",
            });
            return;
        }
        try {
            await userApi.resetPassword({
                code,
                password: formData.password
            });
            history.replace("/reset-password-success")
        } catch (err) {
            if (err.status === 404) {
                setType("NOTFOUND")
            } else {
                setType("EXPIRED");
            }
        }
    };

    return (
        <Fragment>
            {loading && <Loading />}
            {type === "SUCCESS" && !loading && (<div className='check-email'>
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
            </div>)}
            {type === "EXPIRED" && <CancelError message="404: Liên kết đã hết hạn" path="/" />}
            {type === "NOTFOUND" && <NotFound message="404: Liên kết không tồn tại hoặc đã bị gỡ bỏ" path="/" />}
        </Fragment>
    )
}

export default ResetPassword
