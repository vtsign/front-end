import React from 'react';
import { Avatar, Grid, Item } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './Footer2.scss';

const Footer2 = () => {
	return (
		<div className="footer-clean">
			<footer>
				<Grid container justifyContent="center" spacing={4}>
					<Grid item md={3} xs={12}>
						<h3>Liên lạc</h3>
						<ul>
							<li>
								<LocalPhoneIcon sx={{ marginRight: '10px' }} /> +86 986 744 501
							</li>
							<li>
								<MailIcon sx={{ marginRight: '10px' }} />
								VTSign@gmail.com
							</li>
							<li>
								<AccountBalanceIcon sx={{ marginRight: '10px' }} />
								255 Nguyễn Văn Cừ Q5 TPHCM
							</li>
						</ul>
					</Grid>
					<Grid item md={4} xs={12} className="footer-clean__intro">
						<h3>VTSign</h3>
						<p>
							Tổ chức của bạn hoạt động dựa trên hợp đồng và các loại thỏa thuận khác.
							Đã đến lúc thay đổi cách bạn chuẩn bị, ký, hành động và quản lý bằng sản
							phẩm của chúng tôi.
						</p>
					</Grid>
					<Grid item md={2} xs={12}>
						<h3>Theo dõi</h3>
						<div className="group-icon">
							<a href="#">
								<Avatar
									src="/images/facebook.png"
									alt=" icon-facebook"
									className="icon"
								/>
							</a>
							<a href="#">
								<Avatar
									src="/images/instagram.png"
									alt=" icon-instagram"
									className="icon"
								/>
							</a>
							<a href="#">
								<Avatar
									src="/images/twitter.png"
									alt=" icon-twitter"
									className="icon"
								/>
							</a>
						</div>
					</Grid>
				</Grid>
				<p className="copyright">Bản quyền © 2021 VTSign, Inc. Bảo lưu mọi quyền.</p>
			</footer>
		</div>
	);
};

export default Footer2;
