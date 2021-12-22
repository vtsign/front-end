import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.vtsign.tech';

const getAccessToken = async () => {
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	const accessTokenExpired = localStorage.getItem('accessTokenExpired');
	const refreshTokenExpired = localStorage.getItem('refreshTokenExpired');
	if (accessTokenExpired > Date.now()) {
		return accessToken;
	}
	if (refreshTokenExpired < Date.now()) {
		console.log('api axios....');
		localStorage.setItem('isLogin', 'false');
		window.location.href = '/';
		return;
	}
	const res = await axios.post(BASE_URL + '/auth/refresh-token', {
		refresh_token: refreshToken,
	});

	localStorage.setItem('accessToken', res.data.access_token);
	localStorage.setItem('refreshToken', res.data.refresh_token);
	localStorage.setItem('accessTokenExpired', Date.now() + 44 * 60 * 1000);
	localStorage.setItem('refreshTokenExpired', Date.now() + 59 * 60 * 1000);

	return accessToken;
};

const axiosClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	// Handle token here ...
	const token = await getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
);
export default axiosClient;
