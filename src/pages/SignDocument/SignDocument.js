import React, { useRef, useEffect, useState, useDispatch } from 'react';
import { Box, Stack, Button, Grid, Container } from '@mui/material';
// import { Box, Column, Heading, Row, Stack, Button } from 'gestalt';
import WebViewer from '@pdftron/webviewer';
// import 'gestalt/dist/gestalt.css';
import './SignDocument.scss';
import { useLocation } from 'react-router';
// import {} from '@mui/material';
import documentApi from '../../api/documentApi';
import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations';
import { addDocumentList } from '../../redux/actions/documentActions';
import DialogKey from './DialogKey';
let docThumbnailList = [];

const SignDocument2 = () => {
	const [annotManager, setAnnotatManager] = useState(null);
	const [annotPosition, setAnnotPosition] = useState(0);

	const [userDocument, setUserDocument] = useState(null);
	// const [signedObj, setSignedObj] = useState({});

	const [currentDocument, setCurrentDocument] = useState();

	const viewer = useRef(null);
	const [link, setLink] = useState('');
	const [thumbnailData, setThumbnailData] = useState(null)

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
			).then( async (instance) => {
				const { PDFNet, CoreControls  } = instance;
				await PDFNet.initialize();
				window.PDFNet = PDFNet;
				window.CoreControls = CoreControls;
				// const coreControl = window.CoreControls;
				// coreControl.setWorkerPath('/webviewer/core');

				console.log(CoreControls);
				const doc = await CoreControls.createDocument(
					'https://vtsign.blob.core.windows.net/document/86d64bb5-fd05-414e-9914-f57a6fe4e72c-sample.pdf',
					{
						extension: 'pdf',
					}
				);

				// selectedFile.pageCount = doc.getPageCount();
				// let thumbnailData;
				doc.loadCanvasAsync({
					pageNumber: 1,
					drawComplete: (canvas) => {
						const thumbnailData = canvas.toDataURL();
						setThumbnailData(thumbnailData)
					},
				});
				console.log(thumbnailData)

				console.log(doc);

				try {

					const { docViewer, annotManager, Annotations } = instance;
					setAnnotatManager(annotManager);
					instance.setToolbarGroup('toolbarGroup-Insert');

					// load document
					// const URL = response.data.documents[0].url;
					// docViewer.loadDocument(URL);
					const URL =currentDocument ? currentDocument.url : userDocument.document[0].url;
					console.log('load document', URL);
					docViewer.loadDocument(URL);

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

			});
		}
	}, [userDocument]);

	const test = async () => {
		const coreControls = window.CoreControls;
		coreControls.setWorkerPath('webviewer/core');
		const fileUrl =
			'https://vtsign.blob.core.windows.net/document/86d64bb5-fd05-414e-9914-f57a6fe4e72c-sample.pdf';
		const doc = await coreControls.createDocument(fileUrl, {
			extension: 'pdf',
		});
		console.log(doc);
	}

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



	return (
		<Container className="sign-document" maxWidth={false}>
			{userDocument == null && <DialogKey setUserDocument={setUserDocument} />}
			{userDocument != null && (
				<Grid container>
					{/* <Grid lg={3}>
						<h1 size="md">Sign Document</h1>
					</Grid> */}
					<Grid lg={8}>
						<div className="webviewer" ref={viewer}></div>
					</Grid>
					<Grid lg={2}>
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
							<Button
								onClick={test}
								accessibilityLabel="complete signing"
								iconEnd="compose"
								variant="outlined"
							>
								Complete signing
							</Button>
							<img src={thumbnailData} />
							{link && <a href={link}>Download file</a>}
						</Stack>
					</Grid>
					<Grid lg={2}>
						{docThumbnailList.length > 0 && (
							<Grid className="preview-file">
								{docThumbnailList.map((document, index) => (
									<Grid
										className="preview-file__item"
										data-id={index}
										key={index}
									>
										<Grid className="preview-file__thumbnail">
											<img
												alt=""
												src={document.thumbnailData}
												style={{
													height: '100%',
													width: '100%',
													objectFit: 'contain',
												}}
											/>
										</Grid>
										<Grid className="info">
											<span
												style={{
													fontWeight: 'bold',
													wordWrap: 'break-word',
												}}
											>{ document.name}</span>
										</Grid>
									</Grid>
								))}
							</Grid>
						)}
					</Grid>
				</Grid>
			)}
			{/* <button onClick={test} >Test</button> */}
		</Container>
	);
};

export default SignDocument2;
