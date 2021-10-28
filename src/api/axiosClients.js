import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

const axiosClient = axios.create({
	baseURL: 'https://api.vtsign.tech',
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
	async (config) =>
		// Handle token here ...
		config
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
