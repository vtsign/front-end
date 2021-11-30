import axiosClient from './axiosClients';

const getContracts = (status, page) => {
	const url = `/document/filter?status=${status}&page=${page}&size=4`;

	return axiosClient.get(url);
};

const manageDocumentsApi = {
	getContractsCompleted: (page = 1) => {
		return getContracts('COMPLETED', page);
	},
	getContractsWaiting: (page = 1) => {
		return getContracts('WAITING', page);
	},
	getContractsNeedSign: (page = 1) => {
		return getContracts('ACTION_REQUIRE', page);
	},
	getContractsDeleted: (page = 1) => {
		return getContracts('DELETED', page);
	},
	getQuickViewContracts: () => {
		const url = `/document/count`;
		return axiosClient.get(url);
	},
	getContractById: (id) => {
		const url = `/document/contract?c=${id}`;
		return axiosClient.get(url);
	},
};

export default manageDocumentsApi;
