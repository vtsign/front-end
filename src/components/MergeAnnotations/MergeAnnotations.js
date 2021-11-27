export const mergeAnnotations = async (docURL, xfdf) => {
    const PDFNet = window.PDFNet;
    const CoreControls = window.CoreControls;
    CoreControls.setWorkerPath('webviewer/core');

    const main = async () => {
        const doc = await PDFNet.PDFDoc.createFromURL(docURL);
        doc.initSecurityHandler();

        let i;
        for (i = 0; i < xfdf.length; i++) {
            let fdfDoc = await PDFNet.FDFDoc.createFromXFDF(xfdf[i]);
            await doc.fdfMerge(fdfDoc);
            await doc.flattenAnnotations();
        }

        const docbuf = await doc.saveMemoryBuffer(
            PDFNet.SDFDoc.SaveOptions.e_linearized
        );
        const blob = new Blob([docbuf], {
            type: 'application/pdf',
        });
        return blob;
    };

    return await PDFNet.runWithCleanup(main);
};

export const mergeAnnotations2 = async (docData, xfdf) => {
    const PDFNet = window.PDFNet;
    const CoreControls = window.CoreControls;
    CoreControls.setWorkerPath('webviewer/core');

    const main = async () => {
        const doc = await PDFNet.PDFDoc.createFromBuff(docData);
        doc.initSecurityHandler();

        let i;
        for (i = 0; i < xfdf.length; i++) {
            let fdfDoc = await PDFNet.FDFDoc.createFromXFDF(xfdf[i]);
            await doc.fdfMerge(fdfDoc);
            await doc.flattenAnnotations();
        }

        const docbuf = await doc.saveMemoryBuffer(
            PDFNet.SDFDoc.SaveOptions.e_linearized
        );
        const blob = new Blob([docbuf], {
            type: 'application/pdf',
        });
        return blob;
    };

    return await PDFNet.runWithCleanup(main);
};
