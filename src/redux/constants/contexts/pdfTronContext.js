import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const pdfTronContext = React.createContext();

const initialStae = {

}

export const PdfTronProvider = ({ children }) => {
	const [instance, setInstance] = useState(null);

	const exportContext = {
		instance,
		setInstance
	}

	return <pdfTronContext.Provider value={exportContext}>{children}</pdfTronContext.Provider>;
}

PdfTronProvider.propTypes = {
	children: PropTypes.element,
};

PdfTronProvider.defaultProps = {
	children: <></>,
};
