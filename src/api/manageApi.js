import axiosClient from './axiosClients';

const getContracts = (status, page) => {
    const url = `/document/filter?status=${status}&page=${page}&size=4`;

    return axiosClient.get(url);
}

const manageApi = {
    getContractsCompleted: (page = 1) => {
        return getContracts('COMPLETED', page);
    },
    getContractsWaiting: (page = 1) => {
        return getContracts('WAITING', page);
    }
}

export default manageApi;