import React from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './thankyou.scss'
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const ThankYou = () => {
    return (
        <div className='thank-register'>
            <div>
                <p className='thank-register__title'>Cảm ơn bạn đã đăng kí tài khoản hệ thống VTSign</p>
                <Box sx={{ textAlign: "center" }}>
                    <img
                        alt="Under development"
                        src="/images/mail_sent.svg"
                        className='thank-register__image'
                    />
                </Box>
                <p className='thank-register__check'>Hãy kiểm tra mail của bạn để kích hoạt tài khoản</p>
                <p className='thank-register__redirect-login'>
                    <Link to="/">
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                            sx={{ mt: 1 }}
                            variant="contained"
                        >
                            Trở về trang chủ
                        </Button>
                    </Link>
                </p>
                {/* <p className='thank-register__question'>Nếu có bất kì câu hỏi nào, xin vui lòng liên hệ liên hệ</p> */}
            </div>
        </div>
    )
}

export default ThankYou
