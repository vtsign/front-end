import {
	BorderColor,
	Brush,
	CalendarToday,
	Computer,
	MailOutline,
	PersonOutline,
	TextFields,
} from '@mui/icons-material';
import {
	Box,
	Container,
	Divider,
	Grid,
	IconButton,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import WebViewer from '@pdftron/webviewer';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDocument, setDropPoint } from '../../../redux/actions/webviewerActions';
import { pdfTronContext } from '../../../redux/constants/contexts/pdfTronContext';
import Loading from '../../Loading/Loading.jsx';
import './EditDocuments.scss';

const EditDocuments = ({ loading, setLoading }) => {
	const viewer = useRef(null);

	const { control } = useForm();

	const {
		instance,
		setInstance,
		documentFields,
		updateDocumentFieldsList,
		updateDocumentXFDFs2,
		documentXFDFs2,
	} = useContext(pdfTronContext);

	const myInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

	const dispatch = useDispatch();
	const receivers = useSelector((state) => state.receivers);
	const [currentAssignee, setCurrentAssignee] = useState(myInfo.email ?? 'Me');
	const documents = useSelector((state) => state.addDocList);
	const webviewerInstances = useSelector((state) => state.webviewer);

	useEffect(() => {
		WebViewer(
			{
				path: 'webviewer',
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
				fullAPI: true,
			},
			viewer.current
		).then(async (instance) => {
			instance.setZoomLevel('75%');
			setInstance(instance);
			const { PDFNet, CoreControls } = instance;
			await PDFNet.initialize();
			window.PDFNet = PDFNet;
			window.CoreControls = CoreControls;
			const { iframeWindow, Annotations } = instance;
			// docViewer.loadDocument(documents.documentList[0].data);
			Annotations.SignatureWidgetAnnotation.prototype.createSignHereElement = function () {
				const div = document.createElement('div');
				div.style.width = '100%';
				div.style.height = '100%';
				div.style.cursor = 'pointer';

				const inlineSvg =
					'<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25.588 25.588" style="enable-background:new 0 0 25.588 25.588; width: 100%; height: 100%; transform: translateX(-35%);" xml:space="preserve"><g><path style="fill:#030104;" d="M18.724,9.903l3.855,1.416l-3.206,8.729c-0.3,0.821-1.927,3.39-3.06,3.914l-0.275,0.75c-0.07,0.19-0.25,0.309-0.441,0.309c-0.054,0-0.108-0.01-0.162-0.029c-0.243-0.09-0.369-0.359-0.279-0.604l0.26-0.709c-0.575-1.117-0.146-4.361,0.106-5.047L18.724,9.903z M24.303,0.667c-1.06-0.388-2.301,0.414-2.656,1.383l-2.322,6.326l3.854,1.414l2.319-6.325C25.79,2.673,25.365,1.056,24.303,0.667z M17.328,9.576c0.108,0.04,0.219,0.059,0.327,0.059c0.382,0,0.741-0.234,0.882-0.614l2.45-6.608c0.181-0.487-0.068-1.028-0.555-1.208c-0.491-0.178-1.028,0.068-1.209,0.555l-2.45,6.608C16.592,8.855,16.841,9.396,17.328,9.576z M13.384,21.967c-0.253-0.239-0.568-0.537-1.078-0.764c-0.42-0.187-0.829-0.196-1.128-0.203c-0.031,0-0.067-0.001-0.103-0.002c-0.187-0.512-0.566-0.834-1.135-0.96c-0.753-0.159-1.354,0.196-1.771,0.47c0.037-0.21,0.098-0.46,0.143-0.64c0.144-0.58,0.292-1.18,0.182-1.742c-0.087-0.444-0.462-0.774-0.914-0.806c-1.165-0.065-2.117,0.562-2.956,1.129c-0.881,0.595-1.446,0.95-2.008,0.749c-0.686-0.244-0.755-2.101-0.425-3.755c0.295-1.49,0.844-4.264,2.251-5.524c0.474-0.424,1.16-0.883,1.724-0.66c0.663,0.26,1.211,1.352,1.333,2.653c0.051,0.549,0.53,0.952,1.089,0.902c0.55-0.051,0.954-0.539,0.902-1.089c-0.198-2.12-1.192-3.778-2.593-4.329C6.058,7.07,4.724,6.982,3.107,8.429c-1.759,1.575-2.409,4.246-2.88,6.625c-0.236,1.188-0.811,5.13,1.717,6.029c1.54,0.549,2.791-0.298,3.796-0.976c0.184-0.124,0.365-0.246,0.541-0.355c-0.167,0.725-0.271,1.501,0.167,2.155c0.653,0.982,1.576,1.089,2.742,0.321c0.045-0.029,0.097-0.063,0.146-0.097c0.108,0.226,0.299,0.475,0.646,0.645c0.42,0.206,0.84,0.216,1.146,0.224c0.131,0.003,0.31,0.007,0.364,0.031c0.188,0.083,0.299,0.185,0.515,0.389c0.162,0.153,0.333,0.312,0.55,0.476c0.18,0.135,0.39,0.199,0.598,0.199c0.304,0,0.605-0.139,0.801-0.4c0.331-0.442,0.241-1.069-0.201-1.4C13.61,22.183,13.495,22.072,13.384,21.967z"/></g></svg>';
				div.innerHTML = inlineSvg;

				return div;
			};
			const iframeDoc = iframeWindow.document.body;

			iframeDoc.addEventListener('dragover', dragOver);
			iframeDoc.addEventListener('drop', (e) => {
				drop(e, instance);
			});
		});
	}, []);
	useEffect(() => {
		setLoading(true);
		(async () => {
			if (instance && documents.documentList.length > -1) {
				const { docViewer } = instance;
				const annotManager = docViewer.getAnnotationManager();
				await annotManager.deleteAnnotations(annotManager.getAnnotationsList(), {
					force: true,
				});
				await docViewer.loadDocument(
					documents.documentList.length > 0
						? documents.documentList[webviewerInstances.currentDocument].data
						: null
				);
				setLoading(false);
				const listAnnotInitials = annotManager.getAnnotationsList();
				const xfdf = documentXFDFs2[webviewerInstances.currentDocument];
				const annotations = documentFields[webviewerInstances.currentDocument];

				if (annotations != null || !!xfdf) {
					annotManager.deleteAnnotations(listAnnotInitials, true);
					annotManager.deselectAllAnnotations();

					if (!!xfdf) {
						annotManager.importAnnotations(xfdf);
					}

					if (annotations.length > 0) {
						annotManager.addAnnotations(annotations);
					}
				}
			}
		})();
	}, [instance, documents, webviewerInstances.currentDocument]);

	const addFields = async (type) => {
		const { docViewer, Annotations } = instance;
		const annotManager = docViewer.getAnnotationManager();
		const displayMode = docViewer.getDisplayModeManager().getDisplayMode();
		const page = displayMode.getSelectedPages(
			webviewerInstances.dropPoint,
			webviewerInstances.dropPoint
		);

		if (page.first === null) {
			return;
		}

		const pageIndex = page.first;
		const pagePoint = displayMode.windowToPage(webviewerInstances.dropPoint, pageIndex);

		const newAnnot = new Annotations.FreeTextAnnotation();
		newAnnot.PageNumber = pageIndex;
		newAnnot.Rotation = docViewer.getCompleteRotation(pageIndex) * 90;

		newAnnot.setWidth(newAnnot.Rotation === 90 ? 50 : 250);
		newAnnot.setHeight(newAnnot.Rotation === 90 ? 250 : 50);

		newAnnot.X = pagePoint.x - newAnnot.getWidth() / 2;
		newAnnot.Y = pagePoint.y - newAnnot.getHeight() / 2;

		newAnnot.setPadding(new Annotations.Rect(0, 0, 0, 0));
		newAnnot.customs = {
			// add more info
			email: currentAssignee,
			author: currentAssignee, //state.authors[state.mailSelected].replace('.', '_'),
			name: `${currentAssignee}_${type}`,
			type: type,
		};
		newAnnot.setContents(newAnnot.customs.name);
		newAnnot.FontSize = `${20.0}px`;
		newAnnot.FillColor = new Annotations.Color(23, 162, 184, 1);
		newAnnot.TextColor = new Annotations.Color(255, 255, 255, 1);
		newAnnot.StrokeThickness = 1;
		newAnnot.StrokeColor = new Annotations.Color(0, 165, 228);
		newAnnot.TextAlign = 'center';
		annotManager.deselectAllAnnotations();
		annotManager.addAnnotation(newAnnot, true);
		annotManager.redrawAnnotation(newAnnot);
		annotManager.selectAnnotation(newAnnot);

		updateDocumentFieldsList(webviewerInstances.currentDocument);

		return {};
	};

	const applyFields = async (document) => {
		const { Annotations, docViewer } = instance;
		const { WidgetFlags } = Annotations;
		const annotManager = docViewer.getAnnotationManager();
		const fieldManager = annotManager.getFieldManager();
		const annotationsList = annotManager.getAnnotationsList();
		const annotsToDelete = [];
		const annotsToDraw = [];
		// annotManager.setCurrentUser(author.replace('.', '_'));
		annotationsList.forEach((annot, index) => {
			let applyAnnotation;
			let field;
			if (typeof annot.customs === 'undefined') return;

			const flags = new WidgetFlags();
			if (annot.customs.author === myInfo.email) {
				switch (annot.customs.type) {
					case 'SIGNATURE':
						field = new Annotations.Forms.Field(`${annot.customs.author}#Sig${index}`, {
							type: 'Sig',
							flags,
						});
						applyAnnotation = new Annotations.SignatureWidgetAnnotation(field, {
							appearance: '_DEFAULT',
							appearances: {
								_DEFAULT: {
									Normal: {
										data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC',
										offset: {
											x: 100,
											y: 100,
										},
									},
								},
							},
						});
						break;
					case 'TEXT':
						field = new Annotations.Forms.Field(
							`${annot.customs.author}#Name${index}`,
							{
								type: 'Tx',
								flags,
							}
						);
						applyAnnotation = new Annotations.TextWidgetAnnotation(field);
						break;
					case 'DATE':
						field = new Annotations.Forms.Field(
							`${annot.customs.author}#Date${index}`,
							{
								type: 'Tx',
								flags,
								actions: {
									F: [
										{
											name: 'JavaScript',
											javascript: 'AFDate_FormatEx("mmm d, yyyy");',
										},
									],
									K: [
										{
											name: 'JavaScript',
											javascript: 'AFDate_FormatEx("mmm d, yyyy");',
										},
									],
								},
							}
						);

						applyAnnotation = new Annotations.DatePickerWidgetAnnotation(field);
						break;
					default:
						break;
				}
				const zoom = docViewer.getZoom();
				applyAnnotation.PageNumber = annot.getPageNumber();
				applyAnnotation.X = annot.getX();
				applyAnnotation.Y = annot.getY();
				applyAnnotation.rotation = annot.Rotation;
				applyAnnotation.setWidth(
					(applyAnnotation.rotation === 90 ? annot.getHeight() : annot.getWidth()) * zoom
				);
				applyAnnotation.setHeight(
					(applyAnnotation.rotation === 90 ? annot.getWidth() : annot.getHeight()) * zoom
				);
				Annotations.WidgetAnnotation.getCustomStyles = function (widget) {
					if (widget instanceof Annotations.TextWidgetAnnotation) {
						return {
							'font-size': `calc(1rem / ${zoom}`,
							'text-align': 'center',
							borderBottom: '2px solid #a5c7ff',
							color: 'black',
							'background-color': '#e0e3e6',
							fontWeight: 'bold',
						};
					}
					if (widget instanceof Annotations.SignatureWidgetAnnotation) {
						return {
							borderBottom: '2px solid #a5c7ff',
						};
					}
					return {};
				};

				Annotations.WidgetAnnotation.getCustomStyles(applyAnnotation);

				annotsToDelete.push(annot);
				annotManager.addAnnotation(applyAnnotation);
				fieldManager.addField(field);
				annotsToDraw.push(applyAnnotation);
			}
		});
		await annotManager.deleteAnnotations(annotsToDelete, { force: true });

		// refresh viewer
		await annotManager.drawAnnotationsFromList(annotsToDraw);
		// await uploadForSigning();
		// await composeFile();
		// updateDocumentFieldsList(webviewerInstances.currentDocument);
	};

	const dragOver = (e) => {
		e.preventDefault();
		return false;
	};

	const drop = (e, instance) => {
		const { docViewer } = instance;
		const scrollElement = docViewer.getScrollViewElement();
		const scrollLeft = scrollElement.scrollLeft || 0;
		const scrollTop = scrollElement.scrollTop || 0;
		// setDropPoint({ x: e.pageX + scrollLeft, y: e.pageY + scrollTop });
		dispatch(setDropPoint({ x: e.pageX + scrollLeft, y: e.pageY + scrollTop }));
		e.preventDefault();
		return false;
	};

	const dragStart = (e) => {
		e.target.style.opacity = 0.5;
		const copy = e.target.cloneNode(true);
		copy.id = 'form-build-drag-image-copy';
		copy.style.width = '250px';
		document.body.appendChild(copy);
		e.dataTransfer.setDragImage(copy, 125, 25);
		e.dataTransfer.setData('text', '');
	};

	const dragEnd = (e, type) => {
		// addField(type, webviewerInstances.dropPoint);
		addFields(type);
		if (currentAssignee === myInfo.email) applyFields();
		e.target.style.opacity = 1;
		document.body.removeChild(document.getElementById('form-build-drag-image-copy'));
		e.preventDefault();
	};

	const handleReloadDocument = async (index) => {
		if (index !== webviewerInstances.currentDocument) {
			await updateDocumentFieldsList(webviewerInstances.currentDocument);
			await updateDocumentXFDFs2(webviewerInstances.currentDocument);
			dispatch(setCurrentDocument(index));
		}
	};

	return (
		<Container maxWidth={false}>
			<Grid>
				<Typography variant="h6" my="1rem">
					K?? t??n v?? c??c th??ng tin kh??c
				</Typography>
			</Grid>
			<Grid container style={{ minHeight: '80vh' }}>
				<Grid item md={2} sm={12} xs={12}>
					<Box padding={1}>
						<Typography gutterBottom>
							<b>Ng?????i nh???n</b>
						</Typography>
						<Controller
							name="receiver"
							control={control}
							render={({ ref, value, ...inputProps }) => (
								<TextField
									select
									fullWidth
									variant="outlined"
									size="small"
									{...inputProps}
									inputRef={ref}
									value={value}
									defaultValue={myInfo.email ?? ''}
									SelectProps={{ displayEmpty: true }}
									onChange={(e) => setCurrentAssignee(e.target.value)}
								>
									<MenuItem key="me" value={myInfo.email}>
										T??i
									</MenuItem>
									{receivers.receivers
										.filter((r) => r.permission !== 'read')
										.map((receiver) => (
											<MenuItem key={receiver.email} value={receiver.email}>
												{receiver.name}
											</MenuItem>
										))}
								</TextField>
							)}
						/>
					</Box>
					<Stack
						my={2}
						style={{ height: '100%', overflow: 'auto' }}
						direction={{ xs: 'row', md: 'column' }}
						justifyContent={{ xs: 'space-between', md: 'flex-start' }}
					>
						<Box padding={1}>
							<div
								draggable
								onDragStart={(e) => dragStart(e)}
								onDragEnd={(e) => dragEnd(e, 'SIGNATURE')}
							>
								<IconButton
									style={{
										backgroundColor: '#007fff',
										borderRadius: '6px',
										color: '#fff',
										fontWeight: '600',
										fontSize: '24px',
										cursor: 'pointer',
										marginRight: '7px',
									}}
									accessibilityLabel="add signature"
									text="Add signature"
									iconEnd="compose"
								>
									<BorderColor fontSize="inherit" />
								</IconButton>
								<span>Ch??? k??</span>
							</div>
						</Box>
						<Box padding={1}>
							<div
								draggable
								onDragStart={(e) => dragStart(e)}
								onDragEnd={(e) => dragEnd(e, 'DATE')}
							>
								<IconButton
									style={{
										backgroundColor: '#007fff',
										borderRadius: '6px',
										color: '#fff',
										fontWeight: '600',
										fontSize: '24px',
										cursor: 'pointer',
										marginRight: '7px',
									}}
									className="edit-form__btn"
									accessibilityLabel="add date field"
									text="Add date"
									iconEnd="calendar"
								>
									<CalendarToday fontSize="inherit" />
								</IconButton>
								<span>Ng??y k??</span>
							</div>
						</Box>
						<Box padding={1}>
							<div
								draggable
								onDragStart={(e) => dragStart(e)}
								onDragEnd={(e) => dragEnd(e, 'TEXT')}
							>
								<IconButton
									style={{
										backgroundColor: '#007fff',
										borderRadius: '6px',
										color: '#fff',
										fontWeight: '600',
										fontSize: '24px',
										cursor: 'pointer',
										marginRight: '7px',
									}}
									className="edit-form__btn"
									accessibilityLabel="add text"
									text="Add text"
									iconEnd="text-sentence-case"
								>
									<TextFields fontSize="inherit" />
								</IconButton>
								<span>Ch???</span>
							</div>
						</Box>
					</Stack>
				</Grid>

				<Grid item md={8} sm={12} xs={12} ref={viewer} className="webviewer">
					{loading && <Loading />}
				</Grid>
				<Grid item md={2} sm={12} xs={12}>
					{documents.documentList.length > 0 && (
						<Grid className="preview-file">
							{documents.documentList.map((document, index) => (
								<Grid
									className="preview-file__item"
									data-id={index}
									key={index}
									onClick={() => handleReloadDocument(index)}
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
											style={{ fontWeight: 'bold', wordWrap: 'break-word' }}
										>
											{document.name}
										</span>
									</Grid>
								</Grid>
							))}
						</Grid>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default EditDocuments;
