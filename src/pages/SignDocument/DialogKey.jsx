import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Backdrop,
	Slide,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import documentApi from '../../api/documentApi';
import './dialogKey.scss';

// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

export default function DialogKey({ setUserDocument, setKey }) {
	const [keyCurrent, setKeyCurrent] = useState('');
	const [open, setOpen] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const location = useLocation();
	const queryParam = new URLSearchParams(location.search);
	const r = queryParam.get('r');
	const c = queryParam.get('c');
	const uc = queryParam.get('uc');

	const inputKeyHandler = (event) => {
		setKeyCurrent(event.target.value);
	};

	const handleSubmit = async () => {
		try {
			const response = await documentApi.getSigning(c, r, uc, keyCurrent);
			setUserDocument(response.data);
			setKey(keyCurrent);
			setOpen(false);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const closeDialogKey = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			keepMounted
			aria-describedby="alert-dialog-slide-description"
			className="dialog-key"
		>
			<DialogTitle>Nhập mã</DialogTitle>
			<DialogContent>
				<DialogContentText>Nhập mã để mở tài liệu</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="key"
					label="Key"
					type="text"
					fullWidth
					variant="standard"
					error={errorMessage !== ''}
					helperText={errorMessage}
					onChange={inputKeyHandler}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleSubmit} variant="contained" color="success">
					Đồng ý
				</Button>
				<Button onClick={closeDialogKey} variant="contained" color="error">
					Hủy
				</Button>
			</DialogActions>
		</Dialog>
	);
}

// helperText="Khoá không đúng"
