import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import './dialogKey.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogKey({ open, closeDialogKey }) {
	const [key, setKey] = React.useState('');


	const inputKeyHandler = (event) => {
		setKey(event.target.value);
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={closeDialogKey}
			aria-describedby="alert-dialog-slide-description"
			className="dialog-key"
		>
			<DialogTitle>Nhập mã</DialogTitle>
			<DialogContent>
				<DialogContentText>Nhập mã để mở tài liệu</DialogContentText>
				<TextField
					autoFocus
					error
					margin="dense"
					id="key"
					label="Key"
					type="text"
					fullWidth
					variant="standard"
					helperText="Incorrect entry."
					onChange={inputKeyHandler}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={inputKeyHandler} variant="contained" color="success">
					Đồng ý
				</Button>
				<Button onClick={closeDialogKey} variant="contained" color="error">
					Hủy
				</Button>
			</DialogActions>
		</Dialog>
	);
}
