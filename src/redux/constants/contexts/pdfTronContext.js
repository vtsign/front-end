import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const pdfTronContext = React.createContext();

const initialStae = {

}

export const PdfTronProvider = ({ children }) => {
	const [instance, setInstance] = useState(null);
	const [documentFields, setDocumentFields] = useState([]);

	const updateDocumentFieldsList = (index = -1) => {
		if (instance === null) return;
		const { docViewer } = instance;
		const annotManager = docViewer.getAnnotationManager();
		const xfdf = annotManager
			.getAnnotationsList()
			.filter((annot) => annot.Subject === "Free Text");

		if (index === -1 || documentFields.length === 0) {
			setDocumentFields([...documentFields, xfdf]);
		} else {
			documentFields[index] = xfdf;
			setDocumentFields([...documentFields]);
		}
		// documentFields[0].map(item => console.log(item.custom))
		console.log(documentFields)
	};

	const exportContext = {
		instance,
		setInstance,
		documentFields,

		updateDocumentFieldsList,
	};

	return <pdfTronContext.Provider value={exportContext}>{children}</pdfTronContext.Provider>;
}

PdfTronProvider.propTypes = {
	children: PropTypes.element,
};

PdfTronProvider.defaultProps = {
	children: <></>,
};
