import React from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './CheckEmail.scss'
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const CheckMail = () => {
    return (
        <div className='check-mail'>
            <div>
                <p className='check-mail__title'>Lấy lại mật khẩu</p>
                <Box sx={{ textAlign: "center" }}>
                    <img
                        alt="Under development"
                        src="/images/mail_sent.svg"
                        className='check-mail__image'
                    />
                </Box>
                <p className='check-mail__check'>Hệ thống đã gửi một email chứa đường link đến email của bạn<br />
                    Vui lòng kiểm tra mail và làm theo hướng dẫn để lấy lại mật khẩu</p>
                <p className='check-mail__redirect-login'>
                    <Link to="/login">
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                            sx={{ mt: 1 }}
                            variant="contained"
                        >
                            Trở về trang đăng nhập
                        </Button>
                    </Link>
                </p>
                {/* <p className='check-mail__question'>Nếu có bất kì câu hỏi nào, xin vui lòng liên hệ liên hệ</p> */}
            </div>
        </div>
    )
}

export default CheckMail

// import React from 'react'
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import './CheckEmail.scss'
// import { Link } from 'react-router-dom';

// const CheckEmail = () => {
//     return (
//         <div className='noitfy-check-mail'>
//             <div>
//                 <p className='noitfy-check-mail__title'>Lấy lại mật khẩu</p>
//                 <div className='noitfy-check-mail__mail'>
//                     <MailOutlineIcon sx={{ fontSize: "100px", opacity: 0.6 }} />
//                 </div>
//                 <p className='noitfy-check-mail__check'>Hệ thống đã gửi một email chứa đường link đến email của bạn<br />
//                     Vui lòng kiểm tra mail và làm the hướng dẫn để lấy lại mật khẩu </p>
//                 <p className='noitfy-check-mail__redirect-login'>
//                     <Link to="/login">
//                         <ArrowBackIcon /> Trang đăng nhập
//                     </Link>
//                 </p>
//                 <p className='noitfy-check-mail__question'>Nếu có bất kì câu hỏi nào, xin vui lòng liên hệ liên hệ</p>
//             </div>
//         </div>
//     )
// }

// export default CheckEmail
