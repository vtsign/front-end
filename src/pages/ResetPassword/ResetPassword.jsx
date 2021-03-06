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
                message: "M???t kh???u kh??ng tr??ng kh???p",
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
                    <p className='check-email__box__title'>L???y l???i m???t kh???u</p>
                    <form>
                        <InputLabel>
                            Nh???p m???t kh???u <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <TextField
                            name="password"
                            style={{ marginBottom: '20px' }}
                            fullWidth
                            type={hiddenPassword ? 'password' : 'text'}
                            placeholder="Nh???p m???t kh???u"
                            {...register('password', {
                                required: 'Nh???p m???t kh???u',
                                pattern: {
                                    value: REG_PASSWORD,
                                    message:
                                        'M???t kh???u ph???i t???i thi???u 8 k?? t??? bao g???m ch??? hoa, ch??? th?????ng, s???',
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
                            X??c th???c m???t kh???u <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <TextField
                            name="verifyPassword"
                            style={{ marginBottom: '20px' }}
                            fullWidth
                            type={hiddenVerifyPassword ? 'password' : 'text'}
                            placeholder="Nh???p x??c th???c m???t kh???u"
                            {...register('verifyPassword', {
                                required: 'Vui l??ng x??c nh???n m???t kh???u',
                                pattern: {
                                    value: REG_PASSWORD,
                                    message:
                                        'M???t kh???u ph???i t???i thi???u 8 k?? t??? bao g???m ch??? hoa, ch??? th?????ng, s???',
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
                        <Button type='submit' variant="contained" style={{ width: '100%', marginBottom: '20px' }} onClick={handleSubmit(doLogin)} >Ho??n th??nh</Button>
                    </form>
                    <p className='check-email__box__redirect-login'>
                        <Link to="/login">
                            <ArrowBackIcon /> Trang ????ng nh???p
                        </Link>
                    </p>
                </div>
            </div>)}
            {type === "EXPIRED" && <CancelError message="404: Li??n k???t ???? h???t h???n" path="/" />}
            {type === "NOTFOUND" && <NotFound message="404: Li??n k???t kh??ng t???n t???i ho???c ???? b??? g??? b???" path="/" />}
        </Fragment>
    )
}

export default ResetPassword
