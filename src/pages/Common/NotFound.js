import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
	return (
		<div id="notfound">
			<div class="notfound">
				<div class="notfound-404"></div>
				<h1>404</h1>
				<h2>Oop! Không tìm thấy trang</h2>
				<p>
					Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa
				</p>
				<Link to="/" >Trở vể trang chủ</Link>
			</div>
		</div>
	);
};

export default NotFound;
