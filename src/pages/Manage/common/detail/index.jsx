import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import WebViewer from '@pdftron/webviewer';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import manageDocumentsApi from '../../../../api/manageApi';
import { getContractById } from '../../../../redux/actions/manageAction';
import { pdfTronContext } from '../../../../redux/constants/contexts/pdfTronContext';
import { convertTime } from '../../../../utils/time';
import DialogDelete from '../dialog/dialogDelete';
import DialogRestore from '../dialog/dialogRestore';
import Loading from '../../../../components/Loading/Loading';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import './style.scss';

const contentDialogDelete = {
    title: 'Xoá hợp đồng?',
    message:
        'Hơp đồng đã xóa sẽ có sẵn trong thư mục Đã xóa của bạn.',
};

const contentDialogDeleteCompletely = {
    title: 'Xoá hợp đồng?',
    message:
        'Hơp đồng đã xóa sẽ không thể hoàn tác.',
};

const contentDialogResotre = {
    title: 'Hoàn tác hợp đồng?',
    message:
        'Hợp đồng hoàn tác sẽ ...',
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Detail = ({ status, title, pathReturn }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [sender, setSender] = useState({});
    const [receivers, setReceivers] = useState([]);
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [showDialogRestore, setShowDialogRestore] = useState(false);
    const [contract, setContract] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [instance, setInstance] = useState();
    const [loading, setLoading] = useState(true);
    const viewer = useRef(null);
    const [openDocument, setOpenDocument] = React.useState(false);

    const handleClickOpenDocument = () => {
        setOpenDocument(true);
    };

    const handleCloseDocument = () => {
        setOpenDocument(false);
    };

    //dispatch get contract to show
    const idDoc = params.id;
    useEffect(() => {
        (async () => {
            const res = await manageDocumentsApi.getContractById(idDoc);
            setContract(res.data);
        })();
    }, [dispatch, idDoc]);

    // set sender and list receiver every contract change
    useEffect(() => {
        if (contract) {
            const userContracts = contract.user_contracts;
            setSender(userContracts.find((uc) => uc.owner).user);
            setReceivers(userContracts.filter((uc) => !uc.owner));
        }
    }, [contract]);

    useEffect(() => {
        if (contract != null) {
            setLoading(true);
            WebViewer(
                {

                    path: '/webviewer',
                    disabledElements: [
                        'viewControlsButton',
                        'selectToolButton',
                        'leftPanelButton',
                        'ribbons',
                        'toggleNotesButton',
                        'searchButton',
                        'menuButton',
                        'rubberStampToolGroupButton',
                        'stampToolGroupButton',
                        'fileAttachmentToolGroupButton',
                        'calloutToolGroupButton',
                        'undo',
                        'redo',
                        'eraserToolButton',
                        'toolsHeader',
                    ],
                    isReadOnly: "true"
                },
                viewer.current
            ).then(async (instance) => {
                setInstance(instance);
                for (const document of contract.documents) {
                    await setThumbnail(instance, document)
                }
                setLoading(false);
                //contract.documents.forEach((document) => setThumbnail(instance, document));
            });
        }
    }, [contract]);

    const setThumbnail = async (instance, document) => {
        const coreControls = instance.CoreControls;
        coreControls.setWorkerPath('/webviewer/core');
        const doc = await coreControls.createDocument(document.url, {
            extension: 'pdf',
        });

        document.pageCount = doc.getPageCount();
        doc.loadCanvasAsync({
            pageNumber: 1,
            drawComplete: (canvas) => {
                document.thumbnailData = canvas.toDataURL();
                setDocuments((prev) => [...prev, document]);
            },
        });
    };

    const openDialogDelete = () => {
        setShowDialogDelete(true);
    };

    const closeDialogDelete = () => {
        setShowDialogDelete(false);
    };

    const handleOpenDialogRestore = () => {
        setShowDialogRestore(true);
    };

    const handleCloseDialogRestore = () => {
        setShowDialogRestore(false);
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

    const handleClickThumbnail = async (document) => {
        setLoading(true);
        handleClickOpenDocument();
        const { docViewer, annotManager, Annotations } = instance;
        await docViewer.loadDocument(document.url);
        setLoading(false);

        annotManager.on('annotationChanged', (annotations, action, { imported }) => {
            if (imported && action === 'add') {
                annotations.forEach(function (annot) {
                    if (annot instanceof Annotations.WidgetAnnotation) {
                        annot.Hidden = true;
                        annot.Listable = false;
                    }
                });
            }
        });
    }

    return (
        <Fragment>
            {loading && <Loading />}
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
                                {status === "DELETED" && (<Button variant="contained" onClick={handleOpenDialogRestore}>
                                    Hoàn tác
                                </Button>)}
                                <DialogRestore open={showDialogRestore}
                                    closeDialogRestore={handleCloseDialogRestore}
                                    content={contentDialogResotre}
                                    contract={contract}
                                    pathReturn={pathReturn} />
                                <Button onClick={openDialogDelete} variant="outlined" color="error">
                                    Xóa
                                </Button>
                                <DialogDelete
                                    open={showDialogDelete}
                                    closeDialogKey={closeDialogDelete}
                                    content={status === "DELETED" ? contentDialogDeleteCompletely : contentDialogDelete}
                                    contract={contract}
                                    pathReturn={pathReturn}
                                />

                                {status !== "DELETED" && <Button variant="outlined" onClick={handleDownloadFile}>
                                    Tải xuống
                                </Button>}

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
                                                <AccessTimeIcon style={{ marginRight: 10, opacity: 0.6 }} />
                                            )}
                                            {receiver.status === 'READ' && (
                                                <VisibilityOutlinedIcon style={{ marginRight: 10, opacity: 0.6 }} />
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
                        <div className="preview-file">
                            {documents.map((document, index) => (
                                <div
                                    className="preview-file__item"
                                    key={index}
                                    onClick={() => handleClickThumbnail(document)}
                                >
                                    <div className="preview-file__thumbnail">
                                        <img
                                            alt=""
                                            src={document.thumbnailData}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>
                                    <div className="preview-file__info">
                                        <span
                                            style={{ fontWeight: 'bold', wordWrap: 'break-word' }}
                                        >
                                            {document.origin_name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            )}
            <Dialog
                fullScreen
                keepMounted
                open={openDocument}
                onClose={handleCloseDocument}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDocument}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Button autoFocus color="inherit" onClick={handleCloseDocument}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className="webviewer" style={{ height: "100%" }} ref={viewer}></div>
            </Dialog>
        </Fragment>
    );
};

export default Detail;
