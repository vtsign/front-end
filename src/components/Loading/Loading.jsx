import Backdrop from '@mui/material/Backdrop';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';
import ReactDOM from 'react-dom';

const LoadingBackdrop = () => {
	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={true}
		>
			<CircularProgress color="primary" />
		</Backdrop>
	);
}

const Loading = () => {
	return ReactDOM.createPortal(
		<LoadingBackdrop />,
		document.querySelector('body')
	);
};

export default Loading;
