import React from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './CheckEmail.scss'
import { Link } from 'react-router-dom';

const CheckEmail = () => {
    return (
        <div className='noitfy-check-mail'>
            <div>
                <p className='noitfy-check-mail__title'>Lấy lại mật khẩu</p>
                <div className='noitfy-check-mail__mail'>
                    <MailOutlineIcon sx={{ fontSize: "100px", opacity: 0.6 }} />
                </div>
                <p className='noitfy-check-mail__check'>Hệ thống đã gửi một email chứa đường link đến email của bạn<br />
                    Vui lòng kiểm tra mail và làm the hướng dẫn để lấy lại mật khẩu </p>
                <p className='noitfy-check-mail__redirect-login'>
                    <Link to="/login">
                        <ArrowBackIcon /> Trang đăng nhập
                    </Link>
                </p>
                <p className='noitfy-check-mail__question'>Nếu có bất kì câu hỏi nào, xin vui lòng liên hệ liên hệ</p>
            </div>
        </div>
    )
}

export default CheckEmail
