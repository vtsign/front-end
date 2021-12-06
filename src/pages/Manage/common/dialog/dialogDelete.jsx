import * as React from 'react';
import ReactDOM from 'react-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './dialogDelete.scss';
import manageDocumentsApi from '../../../../api/manageApi';
import { useHistory } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCommon = ({ selectDocumentHandler, open, closeDialogKey, content, contract, pathReturn }) => {
	const history = useHistory();
	const handleOnDelete = async () => {
		const userId = JSON.parse(localStorage.getItem('user')).id;
		const userContract = contract.user_contracts.find((uc) => uc.user.id === userId);
		if (userContract.status === "DELETED") {
			await manageDocumentsApi.deleteContractCompletely({ c: contract.id, uc: userContract.id })
		} else {
			await manageDocumentsApi.deleteContract({ c: contract.id, uc: userContract.id })
		}

		//if selectDocumentHandler != null => delete on page manage => notification to dispatch get new data
		if (selectDocumentHandler) {
			selectDocumentHandler();
		}
		closeDialogKey();
		history.replace(pathReturn);
	}
	return ReactDOM.createPortal(
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={closeDialogKey}
			aria-describedby="alert-dialog-slide-description"
			className="dialog-delete"
		>
			<DialogTitle>{content.title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content.message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleOnDelete}
					variant="contained" color="error">
					Xoá
				</Button>
				<Button onClick={closeDialogKey} style={{ backgroundColor: 'gray' }} variant="contained">
					Hủy
				</Button>
			</DialogActions>
		</Dialog>,
		document.getElementsByTagName("body")[0]
	);
}
export default DialogCommon;