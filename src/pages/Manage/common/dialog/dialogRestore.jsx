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
import manageDocumentsApi from '../../../../api/manageApi';
import { useHistory } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogRestore = ({ open, closeDialogRestore, content, contract, pathReturn }) => {
    const history = useHistory();
    const handleOnRestore = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const userContract = contract.user_contracts.find((uc) => uc.user.id === userId);
        await manageDocumentsApi.restoreDocument({ contractId: contract.id, userContractId: userContract.id })
        history.replace(pathReturn);
    }
    return ReactDOM.createPortal(
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialogRestore}
            aria-describedby="alert-dialog-slide-description"
            className="dialog-key"
        >
            <DialogTitle>{content.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleOnRestore}
                    variant="contained" color="success">
                    Hoàn tác
                </Button>
                <Button onClick={closeDialogRestore} style={{ backgroundColor: 'grey' }} variant="contained">
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>,
        document.getElementsByTagName("body")[0]
    );
}
export default DialogRestore;