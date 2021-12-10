import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import ReactDOM from 'react-dom';

const LoadingBackdrop = () => {
	return (
		<Backdrop
			sx={{ backgroundColor: 'rgb(255 255 255 /60%);', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={true}
		>
			<CircularProgress sx={{
				animationDuration: '550ms'
			}}/>
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
