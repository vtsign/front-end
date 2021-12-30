import React, { Fragment, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Alert } from '@mui/material';
import './home.scss';
import { Link } from 'react-router-dom';
import manageApi from '../../api/manageApi';
import Loading from '../../components/Loading/Loading';
import { useToast } from '../../components/toast/useToast'

const Home = (props) => {
	const [quickDoc, setQuickDoc] = useState({});
	const [loading, setLoading] = useState(false);

	const jsonUser = localStorage.getItem("user");
	const user = JSON.parse(jsonUser);

	const { error } = useToast();

	useEffect(() => {
		const getQuickViewDocument = async () => {
			setLoading(true);
			const res = await manageApi.getQuickViewContracts();
			if(res.status !== 200) {
				switch (res.status) {
					case 400:
						error('Thiếu thông tin hoặc access token');
						break;
					case 500:
						error('Máy chủ gặp trục trặc');
						break;
					default:
						error('Đã có lỗi xảy ra');
						break;
				}
				setLoading(false);
				return;
			}
			setLoading(false)
			setQuickDoc(res.data);
		};
		getQuickViewDocument();
	}, []);
	return (
		<Fragment>
			{loading && <Loading />}
			<div className="home">
				{props?.message && <Alert severity="error">{props.message}</Alert>}
				<div className="home__manage">
					<div className="home__manage__signature">
						<Avatar src={user.avatar ? user.avatar : "/user-man.png"} alt="avatar-user" className="avatar" />
					</div>
					<Link to="/manage/completed">
						<div className="home__manage__action">
							<p className="action__quantity">{quickDoc.completed}</p>
							<p className="action__name">Đã hoàn thành</p>
						</div>
					</Link>
					<Link to="/manage/waiting">
						<div className="home__manage__action">
							<p className="action__quantity">{quickDoc.waiting}</p>
							<p className="action__name">Chờ ký</p>
						</div>
					</Link>
					<Link to="/manage/need-sign">
						<div className="home__manage__action">
							<p className="action__quantity">{quickDoc.action_require}</p>
							<p className="action__name">Cần ký</p>
						</div>
					</Link>
					<Link to="/manage/deleted">
						<div className="home__manage__action">
							<p className="action__quantity">{quickDoc.deleted}</p>
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
		</Fragment>
	);
};

export default Home;
