import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

const BASE_URL = process.env.REACT_APP_BASE_URL ||  'https://api.vtsign.tech';

const axiosClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
	async (config) => {
		// Handle token here ..
	}
);
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
