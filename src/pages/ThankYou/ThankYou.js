import React from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './thankyou.scss'
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div className='thank-register'>
            <div>
                <p className='thank-register__title'>Cảm ơn bạn đã đăng kí tài khoản hệ thống VTSign</p>
                <div className='thank-register__mail'>
                    <MailOutlineIcon sx={{ fontSize: "100px", opacity: 0.6 }} />
                </div>
                <p className='thank-register__check'>Hãy kiểm tra mail của bạn để kích hoạt tài khoản</p>
                <p className='thank-register__redirect-login'>
                    <Link to="/login">
                        <ArrowBackIcon /> Trang đăng nhập
                    </Link>
                </p>
                <p className='thank-register__question'>Nếu có bất kì câu hỏi nào, xin vui lòng liên hệ liên hệ</p>
            </div>
        </div>
    )
}

export default ThankYou
