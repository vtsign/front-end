import * as React from 'react';
import ReactDOM from 'react-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './dialog.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCommon = ({ open, closeDialogKey, title, content }) => {


	return ReactDOM.createPortal(
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={closeDialogKey}
			aria-describedby="alert-dialog-slide-description"
			className="dialog-key"
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained" color="error">
					Xoá
				</Button>
				<Button onClick={closeDialogKey} color="primary" variant="contained">
					Hủy
				</Button>
			</DialogActions>
		</Dialog>,
		document.getElementsByTagName("body")[0]
	);
}
export default DialogCommon;