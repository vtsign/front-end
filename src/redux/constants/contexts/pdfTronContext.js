import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { mergeAnnotations } from '../../../components/MergeAnnotations/MergeAnnotations';

export const pdfTronContext = React.createContext();

export const PdfTronProvider = ({ children }) => {
	const documents = useSelector((state) => state.addDocList.documentList);
	const [instance, setInstance] = useState(null);
	const [documentFields, setDocumentFields] = useState([]);
	const [documentXFDFs2, setDocumentXFDFs2] = useState({});
	const [documentXFDFs, setDocumentXFDFs] = useState({});

	const webviewerInstances = useSelector((state) => state.webviewer);

	const handleSendDocuments = async () => {
		const files = [];

		await updateDocumentFieldsList(webviewerInstances.currentDocument);
		await updateDocumentXFDFs2(webviewerInstances.currentDocument);

		const { docViewer } = instance;
		const annotationManager = docViewer.getAnnotationManager();

		for (let i = 0; i < documents.length; i++) {
			await docViewer.loadDocument(documents[i].data);
			const fileMerge = await mergeAnnotations(documents[i].data, [documentXFDFs2[i]]);
			const url = URL.createObjectURL(fileMerge);
			await docViewer.loadDocument(url);
			annotationManager.addAnnotations(documentFields[i]);
			const file = await applyFields(documents[i]);
			files.push(file);
		}
		return files;
	};

	const updateDocumentFieldsList = async (index = -1) => {
		if (instance === null) return;
		const { docViewer } = instance;
		const annotManager = docViewer.getAnnotationManager();
		const xfdf = annotManager
			.getAnnotationsList()
			.filter((annot) => annot.Subject === 'Free Text');

		if (index === -1 || documentFields.length === 0) {
			setDocumentFields([...documentFields, xfdf]);
		} else {
			documentFields[index] = xfdf;
			setDocumentFields([...documentFields]);
		}
	};

	const updateDocumentXFDFs = async (docId) => {
		if (instance === null) return;
		const { docViewer } = instance;
		const annotManager = docViewer.getAnnotationManager();
		const xfdf = await annotManager.exportAnnotations();
		documentXFDFs[docId] = xfdf;
		setDocumentXFDFs({ ...documentXFDFs });

		const annotsDelete = annotManager.getAnnotationsList();
		await annotManager.deleteAnnotations(annotsDelete, true);
	};
	const updateDocumentXFDFs2 = async (docId) => {
		if (instance === null) return;
		const { docViewer } = instance;
		const annotManager = docViewer.getAnnotationManager();

		// 1 -> 2
		// file 1 bi xoa (nguoi nhan)
		await annotManager.deleteAnnotations(documentFields[docId], true);

		const xfdf = await annotManager.exportAnnotations();
		documentXFDFs2[docId] = xfdf;
		setDocumentXFDFs2({ ...documentXFDFs2 });

		const annotsDelete = annotManager.getAnnotationsList();
		await annotManager.deleteAnnotations(annotsDelete, true);
	};

	const applyFields = async (document) => {
		const { Annotations, docViewer } = instance;
		const { WidgetFlags } = Annotations;
		const annotManager = docViewer.getAnnotationManager();
		const fieldManager = annotManager.getFieldManager();
		const annotationsList = annotManager.getAnnotationsList();
		const annotsToDelete = [];
		const annotsToDraw = [];
		annotationsList.forEach((annot, index) => {
			let applyAnnotation;
			let field;
			if (typeof annot.customs === 'undefined') return;

			const flags = new WidgetFlags();
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
					field = new Annotations.Forms.Field(`${annot.customs.author}#Name${index}`, {
						type: 'Tx',
						flags,
					});
					applyAnnotation = new Annotations.TextWidgetAnnotation(field);
					break;
				case 'DATE':
					field = new Annotations.Forms.Field(`${annot.customs.author}#Date${index}`, {
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
					});

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
		});
		await annotManager.deleteAnnotations(annotsToDelete, { force: true });
		const xfdfString = await annotManager.exportAnnotations({
			widgets: true,
			fields: true,
		});
		const doc = docViewer.getDocument();
		const data = await doc.getFileData({ xfdfString });
		const arr = new Uint8Array(data);
		const blob = new Blob([arr], { type: 'application/pdf' });
		const file = new File([blob], document.name);
		return file;
	};

	const exportContext = {
		instance,
		setInstance,
		documentFields,
		updateDocumentFieldsList,
		handleSendDocuments,
		documentXFDFs,
		updateDocumentXFDFs,
		documentXFDFs2,
		updateDocumentXFDFs2,
	};

	return <pdfTronContext.Provider value={exportContext}>{children}</pdfTronContext.Provider>;
};

PdfTronProvider.propTypes = {
	children: PropTypes.element,
};

PdfTronProvider.defaultProps = {
	children: <></>,
};
