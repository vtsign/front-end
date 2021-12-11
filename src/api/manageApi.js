import axiosClient from './axiosClients';

const manageDocumentsApi = {
	getContracts: (query) => {
		const keys = Object.keys(query);
		let params = keys.reduce((acc, key) => {
			const value = query[key];
			if (value) {
				return `${acc}&${key}=${value}`;
			}
			return acc;
		}, '');
		params = params.slice(1);
		const url = `/document/filter?${params}`;
		console.log("uel", url)
		return axiosClient.get(url);
	},
	getQuickViewContracts: () => {
		const url = `/document/count`;
		return axiosClient.get(url);
	},
	getContractById: (id) => {
		const url = `/document/contract?c=${id}`;
		return axiosClient.get(url);
	},
	deleteContract: (body) => {
		return axiosClient.delete("/document/delete", {
			data: body
		});
	},
	deleteContractCompletely: (body) => {
		return axiosClient.delete("/document/hidden", {
			data: body
		});
	},
	restoreDocument: (body) => {
		return axiosClient.post("/document/restore", body);
	}
};

export default manageDocumentsApi;
