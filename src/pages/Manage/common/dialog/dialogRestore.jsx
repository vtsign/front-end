import * as React from 'react';
import ReactDOM from 'react-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './dialogRestore.scss';
import manageDocumentsApi from '../../../../api/manageApi';
import { useHistory } from 'react-router';
import { useToast } from '../../../../components/toast/useToast'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogRestore = ({ selectDocumentHandler, open, closeDialogRestore, content, contract, pathReturn }) => {
    const history = useHistory();
	const { error } = useToast();

    const handleOnRestore = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const userContract = contract.user_contracts.find((uc) => uc.user.id === userId);
        const restoreRes = await manageDocumentsApi.restoreDocument({ c: contract.id, uc: userContract.id })
		if(restoreRes.status !== 200) {
			switch (restoreRes.status) {
				case 400:
					error('Thiếu thông tin hoặc access token');
					break;
				case 404:
					error('Tài liệu hoặc người dùng không tồn tại hoặc người dùng không sở hữu tài liệu này');
					break;
				case 422:
					error('Người dùng không thể khôi phục tài liệu này');
					break;
				case 500:
					error('Máy chủ gặp trục trặc');
					break;
				default:
					error('Đã có lỗi xảy ra');
					break;
			}
			return;
		}
        if (selectDocumentHandler) {
            selectDocumentHandler();
        }
        closeDialogRestore();
        history.replace(pathReturn);
    }
    return ReactDOM.createPortal(
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialogRestore}
            aria-describedby="alert-dialog-slide-description"
            className="dialog-restore"
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
