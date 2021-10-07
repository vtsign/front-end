import React from "react";
import './Footer.scss'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'

const Footer = () => {
	return (
		// <AppBar position="static">
		// 	<Container maxWidth="xl">
		// 		<Toolbar style={{ display: 'flex', justifyContent: 'center'}}>
		// 			<Typography>
		// 				Bản quyền © 2021 VTSign, Inc. Bảo lưu mọi quyền.
		// 			</Typography>
		// 		</Toolbar>
		// 	</Container>
		// </AppBar>
		<footer>
			<p>Bản quyền © 2021 VTSign, Inc. Bảo lưu mọi quyền.</p>
		</footer>
	);
};

export default Footer;
