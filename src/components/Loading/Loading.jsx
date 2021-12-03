import Backdrop from '@mui/material/Backdrop';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import React from 'react';
import ReactDOM from 'react-dom';

const Loading = () => {
	return ReactDOM.createPortal(
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			invisible={true}
			open={true}
		>
			<CircularProgress
				disableShrink
				sx={{
					color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
					animationDuration: '350ms',
					[`& .${circularProgressClasses.circle}`]: {
						strokeLinecap: 'round',
					},
				}}
				size={50}
				thickness={5}
			/>
		</Backdrop>,
		document.querySelector('body')
	);
};

export default Loading;
