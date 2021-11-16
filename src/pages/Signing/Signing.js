import React, { useState, useRef, useEffect } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	InputLabel,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Stack,
	IconButton,
	Divider,
	Typography,
	FormControl,
	Select,
	MenuItem
} from '@mui/material';
import './signing.scss'
import { CloudUpload, InsertDriveFile, BorderColor, CalendarToday, TextFields, PersonOutline, MailOutline, Computer, Brush } from '@mui/icons-material';
import { Controller, useForm, useController } from 'react-hook-form';
import Header from '../../components/Header/Header';
import WebViewer from '@pdftron/webviewer';
import '@pdftron/webviewer/public/core/CoreControls';
import ReceiverAvatar from '../../components/ReceiverAvatar/ReceiverAvatar';
import EditFormButton from '../../components/EditFormButton/EditFormButton';
import { storage } from '../../firebase/firebase';
import { addDocumentToSign } from '../../redux/actions/documentActions';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';

const steps = [
	'Thêm tài liệu (PDF, Word, PNG,...)',
	'Chọn người nhận và cài đặt',
	'Ký tên và các thông tin khác',
	'Kiểm tra và gửi file',
];

export function FirstStep({ filePicker, fileData, setFileData }) {
	const setThumbnail = async (dataFile, object) => {
		const Object = object;
		const coreControls = window.CoreControls;
		coreControls.setWorkerPath('/webviewer/core');
		const doc = await coreControls.createDocument(dataFile, {
			extension: 'pdf',
		});

		Object.pageCount = doc.getPageCount();
		doc.loadCanvasAsync({
			pageNumber: 1,
			drawComplete: (canvas) => {
				Object.thumbnailData = canvas.toDataURL();
				setFileData(Object);
			},
		});
	};

	const handleSelectFile = (e) => {
		const { files } = e.target;

		const element = files[0];
		const reader = new FileReader();
		const selectedFile = {
			name: element.name,
		};
		reader.readAsDataURL(element);
		reader.onload = (event) => {
			selectedFile.data = event.target.result;
			setThumbnail(event.target.result, selectedFile);
		};
	};

	return (
		<Grid container>
			{/* <Grid my="1rem">
				<Typography variant="h6">Thêm tài liệu</Typography>
			</Grid> */}
			<Grid display="flex" my="1rem" flexGrow="1" style={{ height: "50vh" }}>
				<Grid item lg={9} md={12} xl={9} xs={12} mr="2rem">
					<Card
						onClick={() => {
							if (filePicker) {
								filePicker.current.click();
							}
						}}
						style={{ height: '100%' }}
					>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
									// minHeight: '55vh',
									// backgroundColor: '#FAFAFA',
									color: '#2F80ED',
									cursor: 'pointer',
								}}
							>
								<CloudUpload style={{ fontSize: '5rem' }} />
								<Typography variant="h6">Tải tài liệu</Typography>
							</Box>
						</CardContent>
					</Card>
					<input
						type="file"
						ref={filePicker}
						onChange={handleSelectFile}
						style={{ display: 'none' }}
					/>
				</Grid>
				<Grid item lg={3} md={6} xl={3} xs={12}>
					{fileData && (
						<div className="preview-file">
							<div className="preview-file__item">
								<div className="preview-file__thumbnail">
									<img
										alt=""
										src={fileData.thumbnailData}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'contain',
										}}
									/>
								</div>
								<div className="info">
									<span style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
										{fileData.name}
									</span>
								</div>
							</div>
						</div>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}

export function SecondStep({ receivers, setReceivers, register, handleSubmit, errors }) {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm({ shouldUnregister: false, mode: 'onChange' });

	const addReceivers = (formData) => {
		setReceivers(receivers => [...receivers, formData]);
		console.log(receivers);
	};

	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Thông tin người nhận
				</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={7} xs={12} mr="2rem" style={{ height: '100%'}}>
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									color: '#2F80ED',
									cursor: 'pointer',
									margin: '0 2rem',
								}}
							>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Tên người nhận</InputLabel>
									<TextField
										id="name"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('name', {
											required: 'Vui lòng nhập họ và tên người nhận',
										})}
										error={!!errors.name}
										helperText={errors?.name?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Địa chỉ Email</InputLabel>
									<TextField
										id="email"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('email', {
											required: 'Vui lòng nhập địa chỉ Email',
										})}
										error={!!errors.email}
										helperText={errors?.email?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Quyền hạn</InputLabel>
									<TextField
										id="permission"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('permission', {
											required: 'Lựa chọn quyền hạn',
										})}
										error={!!errors.permission}
										helperText={errors?.permission?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Sử dụng khóa</InputLabel>
									<TextField
										id="key"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('key')}
										error={!!errors.key}
										helperText={errors?.key?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="flex-end"
									alignItems="center"
									my="1rem"
								>
									<Button
										variant="contained"
										onClick={handleSubmit(addReceivers)}
									>
										Tạo mới
									</Button>
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={5} xs={12}>
					<Card style={{ height: "100%"}}>
						<CardContent>
							{receivers.length > 0 ? (
								receivers.map((partner, index) => (
									<ReceiverAvatar receiver={partner} />
								))
							) : (
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<span>Chưa chọn có người nhận</span>
								</div>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export function ThirdStep({ viewer, fileData, receivers, instance, setInstance, setFile, control }) {
	const [dropPoint, setDropPoint] = useState(null);
	const [currentAssignee, setCurrentAssignee] = useState(null);

	useEffect(() => {
		console.log(currentAssignee);
	}, [currentAssignee])

	useEffect(() => {
		WebViewer(
			{
				extension: 'pdf',
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
			},
			viewer.current
		).then((instance) => {
			// setInstanced(instance);
			const { docViewer, iframeWindow, Annotations } = instance;
			setInstance(instance);
			docViewer.loadDocument(fileData.data);
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

	const addField = (type, point = {}, name = '', value = '', flag = {}) => {
		const { docViewer, Annotations } = instance;
		const annotManager = docViewer.getAnnotationManager();
		const doc = docViewer.getDocument();
		const displayMode = docViewer.getDisplayModeManager().getDisplayMode();
		const page = displayMode.getSelectedPages(point, point);
		if (!!point.x && page.first == null) {
			return; //don't add field to an invalid page location
		}
		const page_idx = page.first !== null ? page.first : docViewer.getCurrentPage();
		const page_info = doc.getPageInfo(page_idx);
		const page_point = displayMode.windowToPage(point, page_idx);
		const zoom = docViewer.getZoom();

		var textAnnot = new Annotations.FreeTextAnnotation();
		textAnnot.PageNumber = page_idx;
		const rotation = docViewer.getCompleteRotation(page_idx) * 90;
		textAnnot.Rotation = rotation;
		if (rotation === 270 || rotation === 90) {
			textAnnot.Width = 50.0 / zoom;
			textAnnot.Height = 250.0 / zoom;
		} else {
			textAnnot.Width = 250.0 / zoom;
			textAnnot.Height = 50.0 / zoom;
		}
		textAnnot.X = (page_point.x || page_info.width / 2) - textAnnot.Width / 2;
		textAnnot.Y = (page_point.y || page_info.height / 2) - textAnnot.Height / 2;

		textAnnot.setPadding(new Annotations.Rect(0, 0, 0, 0));
		textAnnot.custom = {
			type,
			value,
			flag,
			name: `${currentAssignee}_${type}_`,
		};

		// set the type of annot
		textAnnot.setContents(textAnnot.custom.name);
		textAnnot.FontSize = '' + 20.0 / zoom + 'px';
		textAnnot.FillColor = new Annotations.Color(211, 211, 211, 0.5);
		textAnnot.TextColor = new Annotations.Color(0, 165, 228);
		textAnnot.StrokeThickness = 1;
		textAnnot.StrokeColor = new Annotations.Color(0, 165, 228);
		textAnnot.TextAlign = 'center';

		textAnnot.Author = annotManager.getCurrentUser();

		annotManager.deselectAllAnnotations();
		annotManager.addAnnotation(textAnnot, true);
		annotManager.redrawAnnotation(textAnnot);
		annotManager.selectAnnotation(textAnnot);
	};

	const applyFields = async () => {
		const { Annotations, docViewer } = instance;
		const annotManager = docViewer.getAnnotationManager();
		const fieldManager = annotManager.getFieldManager();
		const annotationsList = annotManager.getAnnotationsList();
		const annotsToDelete = [];
		const annotsToDraw = [];

		await Promise.all(
			annotationsList.map(async (annot, index) => {
				let inputAnnot;
				let field;

				if (typeof annot.custom !== 'undefined') {
					// create a form field based on the type of annotation
					if (annot.custom.type === 'TEXT') {
						field = new Annotations.Forms.Field(
							annot.getContents() + Date.now() + index,
							{
								type: 'Tx',
								value: annot.custom.value,
							}
						);
						inputAnnot = new Annotations.TextWidgetAnnotation(field);
					} else if (annot.custom.type === 'SIGNATURE') {
						field = new Annotations.Forms.Field(
							annot.getContents() + Date.now() + index,
							{
								type: 'Sig',
							}
						);
						inputAnnot = new Annotations.SignatureWidgetAnnotation(field, {
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
					} else if (annot.custom.type === 'DATE') {
						field = new Annotations.Forms.Field(
							annot.getContents() + Date.now() + index,
							{
								type: 'Tx',
								// value: 'm-d-yyyy',
								// Actions need to be added for DatePickerWidgetAnnotation to recognize this field.
								actions: {
									F: [
										{
											name: 'JavaScript',
											// You can customize the date format here between the two double-quotation marks
											// or leave this blank to use the default format
											javascript: 'AFDate_FormatEx("mmm d, yyyy");',
										},
									],
									K: [
										{
											name: 'JavaScript',
											// You can customize the date format here between the two double-quotation marks
											// or leave this blank to use the default format
											javascript: 'AFDate_FormatEx("mmm d, yyyy");',
										},
									],
								},
							}
						);

						inputAnnot = new Annotations.DatePickerWidgetAnnotation(field);
					} else {
						// exit early for other annotations
						annotManager.deleteAnnotation(annot, false, true); // prevent duplicates when importing xfdf
						return;
					}
				} else {
					// exit early for other annotations
					return;
				}

				// set position
				inputAnnot.PageNumber = annot.getPageNumber();
				inputAnnot.X = annot.getX();
				inputAnnot.Y = annot.getY();
				inputAnnot.rotation = annot.Rotation;
				if (annot.Rotation === 0 || annot.Rotation === 180) {
					inputAnnot.Width = annot.getWidth();
					inputAnnot.Height = annot.getHeight();
				} else {
					inputAnnot.Width = annot.getHeight();
					inputAnnot.Height = annot.getWidth();
				}

				// delete original annotation
				annotsToDelete.push(annot);

				// customize styles of the form field
				Annotations.WidgetAnnotation.getCustomStyles = function (widget) {
					if (widget instanceof Annotations.SignatureWidgetAnnotation) {
						return {
							border: '1px solid #a5c7ff',
						};
					}
				};
				Annotations.WidgetAnnotation.getCustomStyles(inputAnnot);

				// draw the annotation the viewer
				annotManager.addAnnotation(inputAnnot);
				fieldManager.addField(field);
				annotsToDraw.push(inputAnnot);
			})
		);

		// delete old annotations
		annotManager.deleteAnnotations(annotsToDelete, null, true);

		// refresh viewer
		await annotManager.drawAnnotationsFromList(annotsToDraw);
		// await uploadForSigning();
		await composeFile();
	};

	const composeFile = async () => {
		const { docViewer, annotManager } = instance;
		const doc = docViewer.getDocument();
		const xfdfString = await annotManager.exportAnnotations({
			widgets: true,
			fields: true,
		});
		const data = await doc.getFileData({ xfdfString });
		const arr = new Uint8Array(data);
		const blob = new Blob([arr], { type: 'application/pdf' });
		// console.log("safdfadsf", fileData.name);
		const file = new File([blob], fileData.name);
		console.log(file+"---------------------------------------------");
		await setFile(file);
	}

	  const uploadForSigning = async () => {
			// upload the PDF with fields as AcroForm
			const storageRef = storage.ref();
			const referenceString = `docToSign/${Date.now()}.pdf`;
			const docRef = storageRef.child(referenceString);
			const { docViewer, annotManager } = instance;
			const doc = docViewer.getDocument();
			const xfdfString = await annotManager.exportAnnotations({
				widgets: true,
				fields: true,
			});
			const data = await doc.getFileData({ xfdfString });
			console.log(data)
			const arr = new Uint8Array(data);
			const blob = new Blob([arr], { type: 'application/pdf' });
			docRef.put(blob).then(function (snapshot) {
				console.log('Uploaded the blob');
			});

			// create an entry in the database
			// const emails = assignees.map((assignee) => {
			// 	return assignee.email;
			// });
			// await addDocumentToSign(null, null, referenceString, null);
			// dispatch(resetSignee());
			// navigate('/');
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
		setDropPoint({ x: e.pageX + scrollLeft, y: e.pageY + scrollTop });
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
		addField(type, dropPoint);
		e.target.style.opacity = 1;
		document.body.removeChild(document.getElementById('form-build-drag-image-copy'));
		e.preventDefault();
	};

	const handleChange = (e) => {

	}

	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Ký tên và các thông tin khác
				</Typography>
			</Grid>
			<Grid display="flex">
				<Grid item lg={2} md={6} xl={2} xs={12} mr="2rem">
					<Stack my={2}>
						<Box padding={1}>
							<Typography gutterBottom>
								<b>Người nhận</b>
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
										SelectProps={{ displayEmpty: true }}
										onChange={(e) => setCurrentAssignee(e.target.value)}
									>
										{receivers.map((receiver) => (
											<MenuItem key={receiver.email} value={receiver.email}>
												{receiver.email}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</Box>
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
									onClick={() => addField('SIGNATURE')}
									accessibilityLabel="add signature"
									text="Add signature"
									iconEnd="compose"
								>
									<BorderColor fontSize="inherit" />
								</IconButton>
								<span>Chữ ký</span>
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
									onClick={() => addField('DATE')}
									accessibilityLabel="add date field"
									text="Add date"
									iconEnd="calendar"
								>
									<CalendarToday fontSize="inherit" />
								</IconButton>
								<span>Ngày ký</span>
							</div>
						</Box>
						<Divider />
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
									onClick={() => addField('TEXT')}
									accessibilityLabel="add text"
									text="Add text"
									iconEnd="text-sentence-case"
								>
									<MailOutline fontSize="inherit" />
								</IconButton>
								<span>Email</span>
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
									onClick={() => addField('TEXT')}
									accessibilityLabel="add text"
									text="Add text"
									iconEnd="text-sentence-case"
								>
									<PersonOutline fontSize="inherit" />
								</IconButton>
								<span>Họ tên</span>
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
									onClick={() => addField('TEXT')}
									accessibilityLabel="add text"
									text="Add text"
									iconEnd="text-sentence-case"
								>
									<Computer fontSize="inherit" />
								</IconButton>
								<span>Công ty</span>
							</div>
						</Box>
						<Divider />
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
									onClick={() => addField('TEXT')}
									accessibilityLabel="add text"
									text="Add text"
									iconEnd="text-sentence-case"
								>
									<Brush fontSize="inherit" />
								</IconButton>
								<span>Vẽ</span>
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
									onClick={() => addField('TEXT')}
									accessibilityLabel="add text"
									text="Add text"
									iconEnd="text-sentence-case"
								>
									<TextFields fontSize="inherit" />
								</IconButton>
								<span>Chữ</span>
							</div>
						</Box>
					</Stack>
				</Grid>
				<Grid item lg={8} md={6} xl={8} xs={12} mr="2rem" ref={viewer}></Grid>
				<Grid item lg={2} md={12} xl={2} xs={12}>
					{fileData && (
						<div className="preview-file">
							<div
								// data-id={index}
								className="preview-file__item"
								style={{ marginBottom: '1rem' }}
							>
								<div className="preview-file__thumbnail">
									<img
										alt=""
										src={fileData.thumbnailData}
										style={{
											height: '100%',
											width: '100%',
											objectFit: 'contain',
										}}
									/>
								</div>
								<div className="info">
									<span style={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
										{fileData.name}
									</span>
								</div>
							</div>
						</div>
					)}
					<Button variant="outlined" onClick={applyFields}>
						Gửi
					</Button>
				</Grid>
			</Grid>
		</>
	);
}

export function LastStep({ receivers, register, errors }) {
	const dispatch = useDispatch();

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm({ shouldUnregister: false, mode: 'onChange' });
	return (
		<>
			<Grid>
				<Typography variant="h6" my="1rem">
					Kiểm tra và gửi file
				</Typography>
			</Grid>
			<Grid display="flex" my="1rem">
				<Grid item lg={8} md={12} xl={7} xs={12} mr="2rem">
					<Card>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									minHeight: '60vh',
									color: '#2F80ED',
									cursor: 'pointer',
									margin: '0 2rem',
								}}
							>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Chủ đề Email</InputLabel>
									<TextField
										id="title"
										placeholder="Nguyễn Văn A"
										sx={{ minWidth: '25vw' }}
										{...register('title', {
											required: 'Vui lòng nhập chủ đề Email',
										})}
										error={!!errors.title}
										helperText={errors?.title?.message}
									/>
								</Grid>
								<Grid
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									my="1rem"
								>
									<InputLabel>Thông điệp Email</InputLabel>
									<TextField
										id="message"
										placeholder="Thông điệp"
										sx={{ minWidth: '25vw' }}
										{...register('message', {
											required: 'Vui lòng nhập thông điệp Email',
										})}
										error={!!errors.message}
										helperText={errors?.message?.message}
									/>
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={4} md={6} xl={5} xs={12}>
					<Card>
						<CardContent>
							{receivers.length > 0 ? (
								receivers.map((partner, index) => (
									<ReceiverAvatar receiver={partner} />
								))
							) : (
								<div
									style={{
										height: '400px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<span>Chưa chọn có người nhận</span>
								</div>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

const Signing = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const [instance, setInstance] = useState(null);
	const [fileData, setFileData] = useState(null);
	const [receivers, setReceivers] = useState([]);

	const [file, setFile] = useState(null);

	const history = useHistory();

	const viewer = useRef(null);
	const filePicker = useRef(null);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({ shouldUnregister: false, mode: 'onChange' });

	const dispatch = useDispatch();

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = (formData) => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
		console.log(formData)
		console.log(receivers)
		if(activeStep === 3) {
			handleSendFiles(formData);
			history.push('/');
		}
	};

	const handlePrev = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	// const handleSendFiles = async formData => {
	// 	const { docViewer, annotManager } = instance;
	// 	// console.log(instance)
	// 	const doc = docViewer.getDocument();

	// 	console.log(doc);
	// 	const xfdfString = await annotManager.exportAnnotations({ widgets: true, fields: true });
	// 	// console.log(xfdfString);
	// 	const data = await doc.getFileData({ xfdfString });
	// 	// console.log(data)
	// 	const arr = new Uint8Array(data);
	// 	const blob = new Blob([arr], { type: 'application/pdf' });
	// 	const file = new File([blob], doc.filename);

	// 	const json = {
	// 		receivers: receivers,
	// 		mail_title: formData.title,
	// 		mail_message: formData.message,
	// 	};

	// 	dispatch(addDocumentToSign(json, file));
	// }
	const handleSendFiles = formData => {
		const json = {
			receivers: receivers,
			mail_title: formData.title,
			mail_message: formData.message,
		};

		dispatch(addDocumentToSign(json, file));
	}

	return (
		<>
			<Container maxWidth={false}>
				<Grid container spacing={1} className="sign__container">
					<Grid item lg={3} sm={6} xl={2} xs={12} display="flex" alignItems="center">
						<Stepper activeStep={activeStep} orientation="vertical">
							{steps.map((label, index) => {
								const stepProps = {};
								const labelProps = {};

								return (
									<Step key={index} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</Grid>
					<Grid item lg={9} sm={6} xl={10} xs={12}>
						<Grid my="1rem">
							<Typography variant="h6">Thêm tài liệu</Typography>
						</Grid>
						{activeStep === 0 && (
							<FirstStep
								filePicker={filePicker}
								fileData={fileData}
								setFileData={setFileData}
							/>
						)}
						{activeStep === 1 && (
							<SecondStep
								receivers={receivers}
								setReceivers={setReceivers}
								register={register}
								handleSubmit={handleSubmit}
								errors={errors}
							/>
						)}
						{activeStep === 2 && (
							<ThirdStep
								control={control}
								viewer={viewer}
								fileData={fileData}
								receivers={receivers}
								instance={instance}
								setInstance={setInstance}
								setFile={setFile}
							/>
						)}
						{activeStep === 3 && (
							<LastStep receivers={receivers} register={register} errors={errors} />
						)}
						<Grid display="flex" justifyContent="flex-end">
							{activeStep === 0 && (
								<FormControlLabel control={<Checkbox />} label="Chỉ mình tôi ký" />
							)}
							{activeStep > 0 && (
								<Button variant="outlined" onClick={handlePrev}>
									Quay lại
								</Button>
							)}
							<Button
								variant="contained"
								style={{ marginLeft: '14px' }}
								onClick={handleSubmit(handleNext)}
							>
								{activeStep === steps.length - 1 ? 'Gửi' : 'Tiếp tục'}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Signing;
