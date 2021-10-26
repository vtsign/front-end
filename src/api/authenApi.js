import axiosClient from './axiosClients';

const authenApi = {
	register(url, { email, password, phone, organization, address, first_name, last_name }) {
		return axiosClient.post(url, {
			email,
			password,
			phone,
			organization,
			address,
			first_name,
			last_name,
		});
	},
};
export default authenApi;
