import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import './home.scss';
import { Link } from 'react-router-dom';
import manageApi from '../../api/manageApi';

const Home = () => {
	const [quickDoc, setQuickDoc] = useState({});
	useEffect(() => {
		const getQuickViewDocument = async () => {
			const res = await manageApi.getQuickViewContracts();
			setQuickDoc(res.data);
		};

		getQuickViewDocument();
	}, []);
	return (
		<div className="home">
			<div className="home__manage">
				<div className="home__manage__signature">
					<Avatar src="/user-man.png" alt="avatar-user" className="avatar" />
				</div>
				<Link to="/manage/completed">
					<div className="home__manage__action">
						<p className="action__quantity">{quickDoc.COMPLETED}</p>
						<p className="action__name">Đã hoàn thành</p>
					</div>
				</Link>
				<Link to="/manage/waiting">
					<div className="home__manage__action">
						<p className="action__quantity">{quickDoc.WAITING}</p>
						<p className="action__name">Chờ ký</p>
					</div>
				</Link>
				<Link to="/manage/need-sign">
					<div className="home__manage__action">
						<p className="action__quantity">{quickDoc.ACTION_REQUIRE}</p>
						<p className="action__name">Cần ký</p>
					</div>
				</Link>
				<Link to="/manage/deleted">
					<div className="home__manage__action">
						<p className="action__quantity">{quickDoc.DELETED}</p>
						<p className="action__name">Đã xóa</p>
					</div>
				</Link>
			</div>
			<div className="home__start">
				<div className="home__start__box">
					<Link to="/signing">
						<Button variant="contained">Kí ngay</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
