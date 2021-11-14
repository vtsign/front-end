import {
	SAVE_WEBVIEWER_INSTANCE,
	SET_CURRENT_DOCUMENT,
	SET_DROP_POINT
} from '../constants/webviewerConstants';

export const saveWebviewerInstance = (instance) => {
	return {
		type: SAVE_WEBVIEWER_INSTANCE,
		payload: instance
	}
}

export const setCurrentDocument = currentDoc => {
	return {
		type: SET_CURRENT_DOCUMENT,
		payload: currentDoc
	}
}

export const setDropPoint = dropPoint => {
	return {
		type: SET_DROP_POINT,
		payload: dropPoint
	}
}

export const applyFields = (instance) => async (dispatch) => {
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
					field = new Annotations.Forms.Field(annot.getContents() + Date.now() + index, {
						type: 'Tx',
						value: annot.custom.value,
					});
					inputAnnot = new Annotations.TextWidgetAnnotation(field);
				} else if (annot.custom.type === 'SIGNATURE') {
					field = new Annotations.Forms.Field(annot.getContents() + Date.now() + index, {
						type: 'Sig',
					});
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
					field = new Annotations.Forms.Field(annot.getContents() + Date.now() + index, {
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
					});

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
	// await composeFile();

};
