import axios from 'axios';

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.vtsign.tech';

const authenApi = {
	register(data) {
		return axios.post(
			BASE_URL + '/auth/register',
			{
				...data,
			},
			config
		);
	},
	async login(email, password) {
		const res = await axios.post(
			BASE_URL + '/auth/login',
			{
				email,
				password,
			},
			config
		);
		const { data } = res;
		localStorage.setItem('user', data);
		localStorage.setItem('accessToken', data.access_token);
		localStorage.setItem('refreshToken', data.refresh_token);
		localStorage.setItem('accessTokenExpired', Date.now() + 44 * 60 * 1000);
		localStorage.setItem('refreshTokenExpired', Date.now() + 59 * 60 * 1000);
		localStorage.setItem('isLogin', 'true');
		return res;
	},
};
export default authenApi;
