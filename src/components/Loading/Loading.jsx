import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import ReactDOM from 'react-dom';

const Loading = () => {
	return ReactDOM.createPortal(
		<div>
			<Backdrop
                sx={{ color: '#eeeeee', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
			>
				<CircularProgress />
			</Backdrop>
        </div>,
        document.querySelector('body'),
	);
};

export default Loading;
