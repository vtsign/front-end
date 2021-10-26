import React from 'react'
import './EditFormButton.scss';
import { IconButton } from '@mui/material';

const EditFormButton = ({ children, ...props }) => {
	return (
		<IconButton className="edit__btn" {...props}>
			{children}
		</IconButton>
	)
}

export default EditFormButton
