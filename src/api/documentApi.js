import axiosClient from './axiosClients';
import axiosClientNoToken from "./axiosClientNoToken"

const documentApi = {
    postSigning: (json, file) => {
        const url = `/document/signing`;

        const formData = new FormData();
        formData.append('data', JSON.stringify(json));
		file.forEach(item => {
			formData.append('files', item);
		})
        // formData.append("files", file);
        const header = {
            'content-type': 'application/octet-stream',
        };
        return axiosClient.post(url, formData, header);
    },
    getSigning: (c, r, s) => {
        const url = `/document/apt/signing?c=${c}&r=${r}&s=${s}`;
        return axiosClient.get(url);
    },

    signByReceiver: (signedObj, listFile) => {
        const url = `/document/apt/signing`;
        const formData = new FormData();
        formData.append('signed', JSON.stringify(signedObj));
        const header = {
            'content-type': 'application/octet-stream',
        };
        if (listFile.length > 0) {
            listFile.forEach((file) => {
                formData.append('documents', file);
            });
        }
        return axiosClientNoToken.post(url, formData, header);
    }
};

export default documentApi;
