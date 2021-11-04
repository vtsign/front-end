import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

const BASE_URL = process.env.REACT_APP_BASE_URL ||  'https://api.vtsign.tech';

const getAccessToken = async () => {
	const accessToken = localStorage.getItem("accessToken");
	// const accessTokenExpired =localStorage.getItem("accessTokenExpired");
	// const refreshToken = localStorage.getItem('refreshToken');
	// const refreshTokenExpired =localStorage.getItem("refreshTokenExpired");
	// if(accessTokenExpired > Date.now()) {
	// 	return accessToken;
	// }
	// if(refreshTokenExpired < Date.now())
	// {
	// 	localStorage.setItem("isLogin", false);
	// 	window.location.href = '/login';
	// 	return;
	// }
	// const {access_token, refresh_token, access_token_expired, refresh_token_expired} = await axios.post(BASE_URL + '/refresh-token', {
	// 	refresh_token: refreshToken
	//   });

	//   localStorage.setItem('accessToken', access_token);
	//   localStorage.setItem('refreshToken', refresh_token);
	//   localStorage.setItem('accessTokenExpired', access_token_expired);
	//   localStorage.setItem('refreshTokenExpired', refresh_token_expired);

	return accessToken;
}

const axiosClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
	async (config) => {
		// Handle token here ...
		const token = await getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	}
);
axiosClient.interceptors.response.use(
	(response) => {
		console.log(response);
		return response;
	},
	(error) => {
		console.log('error', error);
		// Handle errors
		throw error;
	}
);
export default axiosClient;
