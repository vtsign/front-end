import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import './dialogKey.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDownload({ open, closeDialogKey }) {
	const [key, setKey] = React.useState("");

	const inputKeyHandler = (event) => {
		setKey(event.target.valeue);
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
			<DialogTitle>Tải tài liệu</DialogTitle>
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
