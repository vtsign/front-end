import { useHistory } from 'react-router';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.vtsign.tech';

const useApi = () => {
	const history = useHistory();
	const accessToken = localStorage.getItem('accessToken');
	const accessTokenExpired = localStorage.getItem('accessTokenExpired');
	const refreshToken = localStorage.getItem('refreshToken');
	const refreshTokenExpired = localStorage.getItem('refreshTokenExpired');
	if (accessTokenExpired > Date.now()) {
		return accessToken;
	}
	if (refreshTokenExpired < Date.now()) {
		localStorage.setItem('isLogin', false);
		history.push('/login');
		return;
	}

	axios.post(BASE_URL + '/refresh-token', { refresh_token: refreshToken }).then((data) => {
		localStorage.setItem('accessToken', data.access_token);
		localStorage.setItem('refreshToken', data.refresh_token);
		localStorage.setItem('accessTokenExpired', data.access_token_expired);
		localStorage.setItem('refreshTokenExpired', data.refresh_token_expired);
	});

	return accessToken;
};

export default useApi;
