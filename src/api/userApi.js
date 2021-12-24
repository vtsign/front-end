import axios from 'axios';
import axiosClient from './axiosClients';
import axiosClientNoToken from './axiosClientNoToken';

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
	async updateAvatar(data) {
		const url = "/user/update-avatar";
		const response = await axiosClient.post(url, data);
		return response;
	},
	payment: (method, amount) => {
		return axiosClient.post('/user/deposit', {
			method,
			amount
		})
	},
	async changePassword(data) {
		const url = "/user/change-password";
		const response = await axiosClient.post(url, data);
		return response;
	},
	async getTransactions(page, size) {
		const url = `/user/transactions?page=${page}&size=${size}`;
		const response = await axiosClient.get(url);
		return response;
	},
	async getMaxReceivers() {
		const url = '/user/max-receivers';
		const response = await axiosClient.get(url);
		return response;
	},
	requestResetPassword: (email) => {
		return axiosClientNoToken.get(`/user/apt/reset-password?email=${email}`)
	}
};

export default userApi;
