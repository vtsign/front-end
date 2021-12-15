import axios from './axiosClientNoToken';

const authenApi = {
	async activation(userId) {
		const url = `/user/apt/activation/${userId}`;
		const response = await axios.get(url);
		return response;
	},
	register(data) {
		return axios.post('/auth/register', {
			...data,
		});
	},
	async login(email, password) {
		const res = await axios.post('/auth/login', {
			email,
			password,
		});
		const { data } = res;
		localStorage.setItem('user', JSON.stringify(data));
		localStorage.setItem('accessToken', data.access_token);
		localStorage.setItem('refreshToken', data.refresh_token);
		localStorage.setItem('accessTokenExpired', Date.now() + 44 * 60 * 1000);
		localStorage.setItem('refreshTokenExpired', Date.now() + 59 * 60 * 1000);
		localStorage.setItem('isLogin', 'true');
		return res;
	},
};
export default authenApi;
