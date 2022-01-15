import * as React from 'react';
import ReactDOM from 'react-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import "./dialogContracTransaction.scss"
import { convertTime } from '../../../../utils/time';

export default function DialogContractTransaction({ open, closeDialog, contract, owner, receivers }) {

    const sortHistory = (h1, h2) => {
        return new Date(h1.time) - new Date(h2.time);
    }
    console.log(contract);

    return ReactDOM.createPortal(
        <Dialog
            open={open}
            keepMounted
            onClose={closeDialog}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle><h3 className='title'>Lịch sử</h3></DialogTitle>
            <DialogContent className="content_history">
                <div className='content_history__title'>Chi tiết</div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <p className="item__title">Tên tài liệu</p>
                        <p className="item__content"> {contract.title}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className="item__title">Chủ tài liệu</p>
                        <p className="item__content">{owner.full_name}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className="item__title">ID tài liệu</p>
                        <p className="item__content">{contract.id}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className="item__title">Người nhận</p>
                        <p className="item__content">{receivers.map((r, index) => (<span>{r.user.full_name}{index !== receivers.length - 1 && ', '}</span>))}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className="item__title">Ngày gửi</p>
                        <p className="item__content">{convertTime(contract.sent_date)}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className="item__title">Trạng thái</p>
                        <p className="item__content">{contract.signed ? "Hoàn thành" : "Chờ ký"}</p>
                    </Grid>
                </Grid>
                <div className='content_history__title'>Hoạt động</div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Thời gian</TableCell>
                                <TableCell>Người thực hiện</TableCell>
                                <TableCell>Hành động</TableCell>
                                <TableCell>Nội dung</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contract.contract_transactions
                                .sort(sortHistory)
                                .map((history) => (
                                    <TableRow
                                        key={history.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{convertTime(history.time)}</TableCell>
                                        <TableCell>
                                            {history.user &&
                                                <>
                                                    <p>{history.user.full_name}</p>
                                                    <p>({history.user.email})</p>
                                                </>
                                            }
                                        </TableCell>
                                        <TableCell>{history.action}</TableCell>
                                        <TableCell>{history.message}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} style={{ backgroundColor: 'gray' }} variant="contained">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog >,
        document.getElementsByTagName("body")[0]
    );
}
