import { Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { ToastContext } from '../useToast.js';
import styles from './toast.module.css';
export const ToastProvider = (props) => {
	const { children } = props;
	const [state, setState] = useState({ isOpen: false });

	const show = (message) => {
		setState({ isOpen: true, message });
	};

	const hide = () => setState({ isOpen: false });

	const error = (message) => {
		show({ type: 'error', text: message });
	};

	const warn = (message) => {
		show({ type: 'warning', text: message });
	};

	const info = (message) => {
		show({ type: 'info', text: message });
	};

	const success = (message) => {
		show({ type: 'success', text: message });
	};
	const { isOpen, message } = state;
	return (
		<ToastContext.Provider
			value={{
				error: error,
				warn: warn,
				info: info,
				success: success,
				hide: hide,
			}}
		>
			{children}
			{message && (
				<Snackbar
					open={isOpen}
					autoHideDuration={3000}
					onClose={hide}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					className={styles.customWidthToast}
				>
					<Alert elevation={6} variant="filled" onClose={hide} severity={message.type}>
						{message.text}
					</Alert>
				</Snackbar>
			)}
		</ToastContext.Provider>
	);
};
