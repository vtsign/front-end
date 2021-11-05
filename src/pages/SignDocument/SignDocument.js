import React, { useState, useEffect, useRef } from 'react';
import { Grid, Container, Button } from '@mui/material'
import './SignDocument.scss'
import WebViewer from '@pdftron/webviewer';
import '@pdftron/webviewer/public/core/CoreControls';
import { useHistory, useLocation } from 'react-router';

const SignDocument = () => {
	const [annotManager, setAnnotatManager] = useState(null);
	const [annotPosition, setAnnotPosition] = useState(0);

	const viewer = useRef(null);

	const history = useHistory();

	useEffect(() => {
		WebViewer(
			{
				path: 'webviewer',
				// disabledElements: [
				// 	'ribbons',
				// 	'toggleNotesButton',
				// 	'searchButton',
				// 	'menuButton',
				// 	'rubberStampToolGroupButton',
				// 	'stampToolGroupButton',
				// 	'fileAttachmentToolGroupButton',
				// 	'calloutToolGroupButton',
				// 	'undo',
				// 	'redo',
				// 	'eraserToolButton',
				// ],
			},
			viewer.current
		).then(async (instance) => {
			const { docViewer, annotManager, Annotations } = instance;
			setAnnotatManager(annotManager);

			// select only the insert group
			instance.setToolbarGroup('toolbarGroup-Insert');

			// load document
			// const storageRef = storage.ref();
			// const URL = await storageRef.child(docRef).getDownloadURL();
			const URL = "https://vtsign.blob.core.windows.net/test/hopdong.pdf"
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
							// if (!annot.fieldName.startsWith(email)) {
							// 	annot.Hidden = true;
							// 	annot.Listable = false;
							// }
						}
					});
				}
			});
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

	const handleSignCompleted = async () => {
		const xfdf = await annotManager.exportAnnotations({ widgets: false, links: false });
		// await updateDocumentToSign(docId, email, xfdf);
		history.push('/');
	};

	return (
		<Container maxWidth={false}>
			<Grid container>
				<Grid item xl={3}></Grid>
				<Grid item xl={6}>
					<div className="webviewer" ref={viewer}></div>
				</Grid>
				<Grid item xl={3}>
						<Button onClick={handleSignCompleted} variant="outlined">
							Kết thúc
						</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

export default SignDocument
