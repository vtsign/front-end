import React, { useRef, useEffect, useState } from 'react';
import { Box, Stack, Button, Grid, Container } from '@mui/material';
// import { Box, Column, Heading, Row, Stack, Button } from 'gestalt';
import WebViewer from '@pdftron/webviewer';
// import 'gestalt/dist/gestalt.css';
import './SignDocument.scss';
import { useLocation } from 'react-router';
// import {} from '@mui/material';
import documentApi from '../../api/documentApi';
import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations';

const SignDocument2 = () => {
	const [annotManager, setAnnotatManager] = useState(null);
	const [annotPosition, setAnnotPosition] = useState(0);

	const location = useLocation();

	const [userDocument, setUserDocument] = useState({});
	const [signedObj, setSignedObj] = useState({});

	const viewer = useRef(null);
	const [link, setLink] = useState('');

	useEffect(() => {
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
			const { PDFNet } = instance;
			await PDFNet.initialize();
			window.PDFNet = PDFNet;

			const queryParam = new URLSearchParams(location.search);
			const r = queryParam.get('r');
			const c = queryParam.get('c');
			const s = queryParam.get('s');

			try {
				const response = await documentApi.getSigning(c, r, s);
				console.log('response ===== ');
				console.log(response);

				setUserDocument(response.data);
				setSignedObj((prevState) => ({
					...prevState,
					contract_uuid: c,
					user_uuid: r,
				}));

				const { docViewer, annotManager, Annotations } = instance;
				setAnnotatManager(annotManager);

				// select only the insert group
				instance.setToolbarGroup('toolbarGroup-Insert');

				// load document
				const URL = response.data.documents[0].url;
				//await storageRef.child(docRef).getDownloadURL();
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
								if (!annot.fieldName.startsWith(response.data.user.email)) {
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
	}, []);

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
				...signedObj,
				document_xfdfs: [document_xfdf],
			},
			files
		);

		// navigate('/');
	};

	return (
		<Container maxWidth={false}>
			<Grid container>
				<Grid lg={3}>
					<h1 size="md">Sign Document</h1>
				</Grid>
				<Grid lg={6}>
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
				</Grid>
				{/* <div className={'prepareDocument'}>
					{link && <a href={link}>Download file</a>}
					<div style={{ display: 'flex', flexDirection: 'row', flex: 'grow' }}>
						<div span={2}>
							<div padding={3}>
								<h1 size="md">Sign Document</h1>
							</div>
							<div padding={3}>
								<div gap={1}>
									<Stack>
										<Box padding={2}>
											<Button
												onClick={nextField}
												accessibilityLabel="next field"
												text="Next field"
												iconEnd="arrow-forward"
											/>
										</Box>
										<Box padding={2}>
											<Button
												onClick={prevField}
												accessibilityLabel="Previous field"
												text="Previous field"
												iconEnd="arrow-back"
											/>
										</Box>
										<Box padding={2}>
											<Button
												onClick={completeSigning}
												accessibilityLabel="complete signing"
												text="Complete signing"
												iconEnd="compose"
											/>
										</Box>
									</Stack>
								</div>
							</div>
						</div>
						<div span={10}>
							<div className="webviewer" ref={viewer}></div>
						</div>
					</div>
				</div> */}
			</Grid>
		</Container>
	);
};

export default SignDocument2;
