export const mergeAnnotations = async (docRef, xfdf) => {
	const PDFNet = window.PDFNet;
	const CoreControls = window.CoreControls;
	CoreControls.setWorkerPath('webviewer/core');

	const URL =
		'https://vtsign.blob.core.windows.net/document-dev/263b7c81-415f-478c-a1e4-d7af58b66cfd-Hop_dong_thue_nha_3.pdf';

	const main = async () => {
		const doc = await PDFNet.PDFDoc.createFromURL(URL);
		doc.initSecurityHandler();

		let i;
		for (i = 0; i < xfdf.length; i++) {
			console.log(xfdf[i]);
			let fdfDoc = await PDFNet.FDFDoc.createFromXFDF(xfdf[i]);
			await doc.fdfMerge(fdfDoc);
			await doc.flattenAnnotations();
		}

		const docbuf = await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);
		const blob = new Blob([docbuf], {
			type: 'application/pdf',
		});
		const file = new File([blob], doc.filename);

		// TODO: Update file to db

	};

	await PDFNet.runWithCleanup(main);
};
