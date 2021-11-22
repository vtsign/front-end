import axiosClient from './axiosClientNoToken';
const userApi = {
	register(data) {
		const url = '/auth/register';
		return axiosClient.post(url, {
			...data,
		});
	},
	async login(email, password) {
		const url = '/auth/login';
		const res = await axiosClient.post(url, {
			email,
			password,
		});
		const { data } = res;
		localStorage.setItem('user', data);
		localStorage.setItem('accessToken', data.access_token);
		localStorage.setItem('refreshToken', data.refresh_token);
		localStorage.setItem('accessTokenExpired', Date.now() + 4 * 60 * 1000);
		localStorage.setItem('refreshTokenExpired', Date.now() + 9 * 60 * 1000);
		localStorage.setItem('isLogin', 'true');
		return res;
	},
};

export default userApi;
