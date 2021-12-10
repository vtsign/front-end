import axiosClient from './axiosClients';
const userApi = {
	async checkUserExists(email) {
		const url = `/user/check_exists?email=${email}`;
		const response = await axiosClient.get(url);
		return response;
	},
	async getUserProfile() {
		const url = "/user/profile";
		const response = await axiosClient.get(url);
		return response;
	},
	async updateUserProfile(data) {
		const url = "/user/profile";
		const response = await axiosClient.post(url, data);
		return response;
	},
	payment: (method, amount) => {
		return axiosClient.post('/user/deposit', {
			method,
			amount
		})
	}
};

export default userApi;
