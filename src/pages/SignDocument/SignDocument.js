import React, { useContext, useRef, useEffect, useState } from 'react';
import { Box, Stack, Button, Grid, Container } from '@mui/material';
// import { Box, Column, Heading, Row, Stack, Button } from 'gestalt';
import WebViewer from '@pdftron/webviewer';
// import 'gestalt/dist/gestalt.css';
import './SignDocument.scss';
import { useHistory, useLocation } from 'react-router';
// import {} from '@mui/material';
import documentApi from '../../api/documentApi';
import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations';
import DialogKey from './DialogKey';
import { pdfTronContext } from '../../redux/constants/contexts/pdfTronContext';

const SignDocument2 = () => {
	const { instance, setInstance, documentXFDFs, updateDocumentXFDFs } =
		useContext(pdfTronContext);
	const [annotManager, setAnnotatManager] = useState(null);
	const [annotPosition, setAnnotPosition] = useState(0);
	const [key, setKey] = useState();
	const history = useHistory();

	const [userDocument, setUserDocument] = useState(null);
	const [documents, setDocuments] = useState([]);
	const [currentDocument, setCurrentDocument] = useState(null);
	const [previousDocument, setPreviousDocument] = useState(null);

	const viewer = useRef(null);

	const location = useLocation();
	const queryParam = new URLSearchParams(location.search);
	const r = queryParam.get('r');
	const c = queryParam.get('c');

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
		if (currentDocument != null) {
			try {
				const { docViewer, annotManager, Annotations } = instance;
				setAnnotatManager(annotManager);
				instance.setToolbarGroup('toolbarGroup-Insert');

				docViewer.loadDocument(currentDocument.url);

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
				
				setTimeout(async () => {
					const xfdf = documentXFDFs[currentDocument.id];
					if (!!xfdf) {
						annotManager.deselectAllAnnotations();
						annotManager.importAnnotations(xfdf);
					}
				}, 1000);

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
		const xfdf = await annotManager.exportAnnotations();
		documentXFDFs[currentDocument.id] = xfdf;

		const keys = Object.keys(documentXFDFs);
		const xfdfs = keys.map(key => ({
			document_uuid: key,
			xfdf: documentXFDFs[key],
		}));

		const files = [];
		try {
			const response = await documentApi.getSigning(c, r, key);
			const data = response.data;
			if (data.last_sign) {
				for(const doc of data.documents) {
					const listXfdfs = doc.xfdfs.map((x) => x.xfdf);
					listXfdfs.push(documentXFDFs[doc.id]);
					
					const blob = await mergeAnnotations(doc.url, listXfdfs);
					files.push(new File([blob], doc.id));
				}
			}
		} catch (error) {
			alert('something went wrong!!!');
			console.error(error);
		}

		documentApi.signByReceiver(
			{
				contract_uuid: c,
				user_uuid: r,
				document_xfdfs: xfdfs,
			},
			files
		);

		history.push('/');
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
		if(previousDocument.id !== document.id) {
			await updateDocumentXFDFs(previousDocument.id);
			setCurrentDocument(document);
			setPreviousDocument(document);
		}
	};

	return (
		<Container className="sign-document" maxWidth={false}>
			{userDocument == null && <DialogKey setUserDocument={setUserDocument} setKey={setKey} />}
			{userDocument != null && (
				<Grid container>
					{/* <Grid lg={3}>
						<h1 size="md">Sign Document</h1>
					</Grid> */}
					<Grid lg={9}>
						<div className="webviewer" ref={viewer}></div>
					</Grid>
					<Grid lg={3}>
						<Stack>
							{/* <Button
								onClick={nextField}
								accessibilityLabel="next field"
								iconEnd="arrow-forward"
								variant="outlined"
							>
								Next field
							</Button>
							<Button
								onClick={prevField}
								accessibilityLabel="Previous field"
								iconEnd="arrow-back"
								variant="outlined"
							>
								Previous field
							</Button> */}
							<Button
								onClick={completeSigning}
								accessibilityLabel="complete signing"
								iconEnd="compose"
								variant="outlined"
							>
								Complete signing
							</Button>
						</Stack>
						{documents.map((document) => (
							<Grid key={document.id} onClick={() => handleDocumentChange(document)}>
								<Grid>
									<img
										width="50%"
										alt={document.origin_name}
										src={document.thumbnailData}
									/>
								</Grid>
								<Grid>
									<span>{document.origin_name}</span>
								</Grid>
							</Grid>
						))}
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default SignDocument2;
