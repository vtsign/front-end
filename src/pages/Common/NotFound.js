
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import './NotFound.scss';

const NotFound = ({ message, path }) => (
	<>
		<Box
			component="main"
			className="not-found"
			sx={{
				alignItems: "center",
				display: "flex",
				flexGrow: 1,
				minHeight: '100vh'
			}}
		>
			<Container maxWidth="md">
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography align="center" color="textPrimary" variant="h2">
						{message ? message : '404: Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa'}
					</Typography>
					<Typography align="center" color="textPrimary" variant="subtitle2">
					</Typography>
					<Box sx={{ textAlign: "center" }}>
						<img
							alt="Under development"
							src="/images/404.svg"
							style={{
								marginTop: 50,
								display: "inline-block",
								maxWidth: "100%",
								width: 560,
							}}
						/>
					</Box>
					<Link to={path ? path : "/"}>
						<Button
							component="a"
							startIcon={<ArrowBackIcon fontSize="small" />}
							sx={{ mt: 3 }}
							variant="contained"
						>
							Trở về trang chủ
						</Button>
					</Link>
				</Box>
			</Container>
		</Box>
	</>
);

export default NotFound;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NotFound.css';

// const NotFound = () => {
// 	return (
// 		<div id="notfound">
// 			<div class="notfound">
// 				<div class="notfound-404"></div>
// 				<h1>404</h1>
// 				<h2>Oop! Không tìm thấy trang</h2>
// 				<p>
// 					Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa
// 				</p>
// 				<Link to="/" >Trở vể trang chủ</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default NotFound;
