import React from 'react';
import { useSelector } from 'react-redux';
import './home.scss';
const Home = () => {
	const userInfo = useSelector((state) => state.userInfo);
	console.log(userInfo);
	return <div></div>;
};

export default Home;
