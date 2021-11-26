import React, { useContext, useRef, useEffect, useState } from 'react';
import { Box, Stack, Button, Grid, Container } from '@mui/material';
// import { Box, Column, Heading, Row, Stack, Button } from 'gestalt';
import WebViewer from '@pdftron/webviewer';
// import 'gestalt/dist/gestalt.css';
import './SignDocument.scss';
import { useLocation } from 'react-router';
// import {} from '@mui/material';
import documentApi from '../../api/documentApi';
import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations';
import DialogKey from './DialogKey';
import { pdfTronContext } from '../../redux/constants/contexts/pdfTronContext';

const SignDocument2 = () => {
	const { instance, setInstance, documentFields, updateDocumentFieldsList2 } =
		useContext(pdfTronContext);
	const [annotManager, setAnnotatManager] = useState(null);
	const [annotPosition, setAnnotPosition] = useState(0);

	const [userDocument, setUserDocument] = useState(null);
	const [documents, setDocuments] = useState([]);
	const [currentDocument, setCurrentDocument] = useState(null);
	const [preIndex, setPreIndex] = useState(0);

	const viewer = useRef(null);
	const [link, setLink] = useState('');

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

				userDocument.documents.forEach((document, index) => {
					document.index = index;
					setThumbnail(instance, document);
				});
				setCurrentDocument(userDocument.documents[0]);
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
				setTimeout(() => {
					if (
						typeof documentFields[currentDocument.index] !== 'undefined' &&
						documentFields.length > 0
					) {
						
							annotManager.deselectAllAnnotations();
							annotManager.importAnnotations(documentFields[currentDocument.index])
					}
				}, 1000);

				annotManager.on('annotationChanged', (annotations, action, { imported }) => {
					if (imported && action === 'add') {
						annotations.forEach(function (annot) {
							
							if (annot instanceof Annotations.WidgetAnnotation) {
								Annotations.WidgetAnnotation.getCustomStyles = normalStyles;
								console.log(annot.custom+ "===================================>")
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

		const document_xfdf = {
			xfdf,
			document_uuid: userDocument.documents[0].id,
		};

		const files = [];
		if (userDocument.last_sign) {
			const listXfdfs = userDocument.documents[0].xfdfs.map((x) => x.xfdf);
			listXfdfs.push(xfdf);

			const blob = await mergeAnnotations(userDocument.documents[0].url, listXfdfs);
			files.push(new File([blob], userDocument.documents[0].id));
			const url = window.URL.createObjectURL(blob);
			setLink(url);
		}

		documentApi.signByReceiver(
			{
				contract_uuid: c,
				user_uuid: r,
				document_xfdfs: [document_xfdf],
			},
			files
		);

		// navigate('/');
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

	const handleDocumentChange = async(document) => {
		await updateDocumentFieldsList2(preIndex);
		setCurrentDocument(document);
		setPreIndex(document.index);
	};

	return (
		<Container className="sign-document" maxWidth={false}>
			{userDocument == null && <DialogKey setUserDocument={setUserDocument} />}
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
							<Button
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
							</Button>
							<Button
								onClick={completeSigning}
								accessibilityLabel="complete signing"
								iconEnd="compose"
								variant="outlined"
							>
								Complete signing
							</Button>
							{link && <a href={link}>Download file</a>}
						</Stack>
						{documents.map((document) => (
							<Grid
								key={document.index}
								onClick={() => handleDocumentChange(document)}
							>
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
