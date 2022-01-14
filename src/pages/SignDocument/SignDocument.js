import React, { useContext, useRef, useEffect, useState } from 'react';
import { Box, Stack, Button, Grid, Container } from '@mui/material';
// import { Box, Column, Heading, Row, Stack, Button } from 'gestalt';
import Loading from '../../components/Loading/Loading';
import WebViewer from '@pdftron/webviewer';
// import 'gestalt/dist/gestalt.css';
import './SignDocument.scss';
import { useHistory, useLocation } from 'react-router';
// import {} from '@mui/material';
import documentApi from '../../api/documentApi';
import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations';
import DialogKey from './DialogKey';
import { pdfTronContext } from '../../redux/constants/contexts/pdfTronContext';
import { useToast } from '../../components/toast/useToast';

const SignDocument2 = () => {
	const { instance, setInstance, documentXFDFs, updateDocumentXFDFs } =
		useContext(pdfTronContext);
	const [annotManager, setAnnotatManager] = useState(null);
	const [annotPosition, setAnnotPosition] = useState(0);
	const [loading, setLoading] = useState(false);
	const [key, setKey] = useState();
	const history = useHistory();

	const [userDocument, setUserDocument] = useState(null);
	const [documents, setDocuments] = useState([]);
	const [currentDocument, setCurrentDocument] = useState(null);
	const [previousDocument, setPreviousDocument] = useState(null);

	const viewer = useRef(null);

	const { error } = useToast();

	const location = useLocation();
	const queryParam = new URLSearchParams(location.search);
	const r = queryParam.get('r');
	const c = queryParam.get('c');
	const uc = queryParam.get('uc');

	useEffect(() => {
		if (userDocument != null) {
			WebViewer(
				{
					path: 'webviewer',
					disabledElements: [
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
					],
					fullAPI: true,
				},
				viewer.current
			).then(async (instance) => {
				// PDFNet is only available with full API enabled
				setInstance(instance);
				const { PDFNet, CoreControls } = instance;
				await PDFNet.initialize();
				window.PDFNet = PDFNet;
				window.CoreControls = CoreControls;

				userDocument.documents.forEach((document) => setThumbnail(instance, document));
				const currentDocument = userDocument.documents[0];
				setCurrentDocument(currentDocument);
				setPreviousDocument(currentDocument);
			});
		}
	}, [userDocument]);

	useEffect(() => {
		setLoading(true);
		(async () => {
			if (currentDocument != null) {
				try {
					const { docViewer, annotManager, Annotations } = instance;
					setAnnotatManager(annotManager);
					instance.setToolbarGroup('toolbarGroup-Insert');

					await docViewer.loadDocument(currentDocument.url);
					setLoading(false);

					const normalStyles = (widget) => {
						if (widget instanceof Annotations.TextWidgetAnnotation) {
							return {
								'background-color': '#a5c7ff',
								color: 'white',
							};
						} else if (widget instanceof Annotations.SignatureWidgetAnnotation) {
							return {
								border: '1px solid #a5c7ff',
							};
						}
					};

					// docViewer.on('documentLoaded', () => {
					const listAnnotInitials = annotManager.getAnnotationsList();
					annotManager.deleteAnnotations(listAnnotInitials, true);

					const xfdf = documentXFDFs[currentDocument.id];
					if (!!xfdf) {
						annotManager.deselectAllAnnotations();
						annotManager.importAnnotations(xfdf);
					}
					// });

					annotManager.on('annotationChanged', (annotations, action, { imported }) => {
						if (imported && action === 'add') {
							annotations.forEach(function (annot) {
								if (annot instanceof Annotations.WidgetAnnotation) {
									Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
									if (!annot.fieldName.startsWith(userDocument.user.email)) {
										annot.Hidden = true;
										annot.Listable = false;
									}
								}
							});
						}
					});
				} catch (error) {
					console.error('Error on showing documents:');
					console.error(error.message);
				}
			}
		})();
	}, [currentDocument]);

	const nextField = () => {
		let annots = annotManager.getAnnotationsList();
		if (annots[annotPosition]) {
			annotManager.jumpToAnnotation(annots[annotPosition]);
			if (annots[annotPosition + 1]) {
				setAnnotPosition(annotPosition + 1);
			}
		}
	};

	const prevField = () => {
		let annots = annotManager.getAnnotationsList();
		if (annots[annotPosition]) {
			annotManager.jumpToAnnotation(annots[annotPosition]);
			if (annots[annotPosition - 1]) {
				setAnnotPosition(annotPosition - 1);
			}
		}
	};

	const completeSigning = async () => {
		setLoading(true);
		const xfdf = await annotManager.exportAnnotations();
		documentXFDFs[currentDocument.id] = xfdf;

		const keys = Object.keys(documentXFDFs);
		const xfdfs = keys.map((key) => ({
			document_uuid: key,
			xfdf: documentXFDFs[key],
		}));

		const files = [];
		try {
			const response = await documentApi.getSigning(c, r, uc, key);
			const data = response.data;
			if (data.last_sign) {
				for (const doc of data.documents) {
					const listXfdfs = doc.xfdfs.map((x) => x.xfdf);
					if (documentXFDFs[doc.id] != null) {
						listXfdfs.push(documentXFDFs[doc.id]);
					}
					const blob = await mergeAnnotations(doc.url, listXfdfs);
					files.push(new File([blob], doc.id));
				}
			}

			await documentApi.signByReceiver(
				{
					contract_uuid: c,
					user_uuid: r,
					user_contract_uuid: uc,
					document_xfdfs: xfdfs,
				},
				files
			);
			setLoading(false);
			history.push('/');
		} catch (err) {
			setLoading(false);
			switch (err.status) {
				case 400:
					error('Thiếu thông tin hoặc access token');
					break;
				case 403:
					error('Mật khẩu cũ không đúng');
					break;
				case 404:
					error('Tài khoản không tồn tại');
					break;
				case 419:
					error('Thiếu một số trường thông tin bắt buộc');
					break;
				case 500:
					error('Máy chủ gặp trục trặc');
					break;
				default:
					console.log(err.message);
					error('Đã có lỗi xảy ra');
					break;
			}
		}
	};

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

	const handleDocumentChange = async (document) => {
		if (previousDocument.id !== document.id) {
			await updateDocumentXFDFs(previousDocument.id);
			setCurrentDocument(document);
			setPreviousDocument(document);
		}
	};

	return (
		<Container className="sign-document" maxWidth={false}>
			{userDocument == null && (
				<DialogKey setUserDocument={setUserDocument} setKey={setKey} />
			)}
			{loading && <Loading />}
			{userDocument != null && (
				<Grid container spacing={3}>
					<Grid item xs={12} md={10}>
						<div className="webviewer" ref={viewer}></div>
					</Grid>
					<Grid item xs={12} md={2}>
						<Grid className="document_list">
							{documents.map((document) => (
								<Grid
									key={document.id}
									onClick={() => handleDocumentChange(document)}
								>
									<Grid
										style={{
											display: 'flex',
											justifyContent: 'center',
											cursor: 'pointer',
										}}
									>
										<img
											width="50%"
											alt={document.origin_name}
											src={document.thumbnailData}
										/>
									</Grid>
									<Grid>
										<b>{document.origin_name}</b>
									</Grid>
								</Grid>
							))}
						</Grid>
						<Grid
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'flex-end',
							}}
						>
							<Button
								style={{ marginTop: '1rem' }}
								onClick={completeSigning}
								accessibilityLabel="complete signing"
								iconEnd="compose"
								variant="contained"
							>
								Hoàn tất
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default SignDocument2;
