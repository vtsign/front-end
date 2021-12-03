import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { Button, Grid } from '@mui/material';
import WebViewer from '@pdftron/webviewer';
import React, { Fragment, useEffect, useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { getContractById } from '../../../../redux/actions/manageAction';
import { convertTime } from '../../../../utils/time';
import DialogCommon from '../dialogDelete';
import { pdfTronContext } from '../../../../redux/constants/contexts/pdfTronContext';
import './style.scss';

const contentDialogDelete = {
    title: 'Xoá hợp đồng?',
    content:
        'Hơp đồng đã xóa sẽ có sẵn trong thùng Đã xóa của bạn trong một thời gian ngắn (tối đa 24 giờ) trước khi bị xóa hoàn toàn.',
};

const Detail = ({ status, title }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [sender, setSender] = useState({});
    const [receivers, setReceivers] = useState([]);
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const { contract } = useSelector((state) => state.manageDocDetail);
    const [documents, setDocuments] = useState([]);
    const { instance, setInstance } = useContext(pdfTronContext);
    const viewer = useRef(null);


    // useEffect(() => {
    //     if (contract != null) {
    //         WebViewer(
    //             {
    //                 path: 'webviewer',
    //                 disabledElements: [
    //                     'viewControlsButton',
    //                     'selectToolButton',
    //                     'leftPanelButton',
    //                     'ribbons',
    //                     'toggleNotesButton',
    //                     'searchButton',
    //                     'menuButton',
    //                     'rubberStampToolGroupButton',
    //                     'stampToolGroupButton',
    //                     'fileAttachmentToolGroupButton',
    //                     'calloutToolGroupButton',
    //                     'undo',
    //                     'redo',
    //                     'eraserToolButton',
    //                     'toolsHeader',
    //                 ],
    //                 fullAPI: true,
    //             },
    //             viewer.current
    //         ).then(async (instance) => {
    //             setInstance(instance);

    //             contract.documents.forEach((document) => setThumbnail(instance, document));
    //             // const currentDocument = userDocument.documents[0];
    //             // setCurrentDocument(currentDocument);
    //             // setPreviousDocument(currentDocument);
    //         });
    //     }
    // }, [contract, setInstance]);

    // const setThumbnail = async (instance, document) => {
    //     const coreControls = instance.CoreControls;
    //     coreControls.setWorkerPath('/webviewer/core');
    //     const doc = await coreControls.createDocument(document.url, {
    //         extension: 'pdf',
    //     });

    //     document.pageCount = doc.getPageCount();
    //     doc.loadCanvasAsync({
    //         pageNumber: 1,
    //         drawComplete: (canvas) => {
    //             document.thumbnailData = canvas.toDataURL();
    //             setDocuments((prev) => [...prev, document]);
    //         },
    //     });
    // };



    const openDialogDelete = () => {
        setShowDialogDelete(true);
    };

    const closeDialogDelete = () => {
        setShowDialogDelete(false);
    };

    //redirect to sign document
    const handleSignContract = () => {
        const r = JSON.parse(localStorage.getItem('user')).id;
        const userContract = contract.user_contracts.find((uc) => uc.user.id === r);
        const uc = userContract.id;
        const c = contract.id;
        const url = `/signDocument?r=${r}&c=${c}&uc=${uc}`;
        history.push(url);
    };

    const checkShowPrivateMessage = (receiver) => {
        const idUser = JSON.parse(localStorage.getItem('user')).id;
        if (!sender) return false;
        return (sender.id === idUser || receiver.user.id === idUser) && receiver.private_message
    }

    //dispatch get contract to show
    const idDoc = params.id;
    useEffect(() => {
        dispatch(getContractById(idDoc));
    }, [dispatch, idDoc]);

    // set sender and list receiver every contract change
    useEffect(() => {
        if (contract) {
            const userContracts = contract.user_contracts;
            setSender(userContracts.find((uc) => uc.owner).user);
            setReceivers(userContracts.filter((uc) => !uc.owner));
        }
    }, [contract]);

    const handleDownloadFile = () => {
        contract.documents.forEach((doc) => {
            fetch(doc.url)
                .then((response) => response.blob())
                .then((blob) => {
                    // 2. Create blob link to download
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', doc.origin_name);
                    // 3. Append to html page
                    document.body.appendChild(link);
                    // 4. Force download
                    link.click();
                    // 5. Clean up and remove the link
                    link.parentNode.removeChild(link);
                });
        });
    };

    return (
        <Fragment>
            {contract && (
                <Grid container className="detail-waiting">
                    <Grid item md={9} className="detail-waiting-main">
                        <div className="content-header">
                            <p className="content-header-title">{title}</p>
                        </div>
                        <div className="content-info">
                            <div className="content-info-title">Tên tài liệu: {contract.title}</div>
                            <p>Từ: {sender?.full_name}</p>
                            <p>Thay đổi lần cuối: {convertTime(contract.last_modified_date)}</p>
                            <p>Gửi ngày: {convertTime(contract.sent_date)}</p>
                            <div className="content-info-ground-btn">
                                {status === "ACTION_REQUIRE" && (<Button variant="contained" onClick={handleSignContract}>
                                    Kí tài liệu
                                </Button>)}
                                <Button onClick={openDialogDelete} variant="outlined" color="error">
                                    Xóa
                                </Button>
                                <DialogCommon
                                    open={showDialogDelete}
                                    closeDialogKey={closeDialogDelete}
                                    title={contentDialogDelete.title}
                                    content={contentDialogDelete.content}
                                />
                                <Button variant="outlined" onClick={handleDownloadFile}>
                                    Tải xuống
                                </Button>
                            </div>
                        </div>
                        <div className="content-receivers">
                            <div className="content-receivers-title">Danh sách người nhận</div>
                            {receivers.map((receiver, index) => (
                                <div key={receiver.user.id} className="content-receivers-item">
                                    <div className="item-info">
                                        <div className="receiver-info">
                                            <h6>{index + 1}</h6>
                                            {receiver.status === 'COMPLETED' && (
                                                <DoneIcon
                                                    style={{ color: 'green', marginRight: 10 }}
                                                />
                                            )}
                                            {receiver.status === 'ACTION_REQUIRE' && (
                                                <AccessTimeIcon style={{ marginRight: 10 }} />
                                            )}
                                            <div>
                                                <p>{receiver.user.full_name}</p>
                                                <p>{receiver.user.email}</p>
                                            </div>
                                        </div>
                                        {receiver.status === 'COMPLETED' && (
                                            <div className="receiver-sign-info">
                                                <p>Đã ký</p>
                                                <p>lúc {convertTime(receiver.signed_date)}</p>
                                            </div>
                                        )}
                                        {receiver.status === 'ACTION_REQUIRE' && (
                                            <div className="receiver-sign-info">
                                                <p>Cần ký</p>
                                            </div>
                                        )}
                                        {receiver.status === 'READ' && (
                                            <div className="receiver-sign-info">
                                                <p>Chỉ xem</p>
                                            </div>
                                        )}
                                    </div>
                                    {checkShowPrivateMessage(receiver) &&
                                        (<div className="receiver-private-message">
                                            <h6></h6>
                                            <CommentOutlinedIcon
                                                style={{ marginRight: 10, opacity: 0.6 }}
                                            />
                                            <div>
                                                <div className="private-message-title">
                                                    Tin nhắn riêng tư
                                                </div>
                                                <div className="private-message-content">
                                                    {receiver.private_message}
                                                </div>
                                            </div>

                                        </div>)}
                                </div>
                            ))}
                        </div>
                        <div className="content-other">
                            <div className="content-other-title">Tin nhắn</div>
                            <p>{receivers[0]?.public_message}</p>
                        </div>
                    </Grid>
                    <Grid item md={3} className="detail-waiting-thumbnail">
                        <div></div>
                    </Grid>
                    {/* <div className="webviewer" ref={viewer}></div> */}
                </Grid>
            )}
        </Fragment>
    );
};

export default Detail;
