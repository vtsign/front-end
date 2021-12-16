import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PageHeader(props) {
	return (
		<Box mb="1.5em">
			<Typography sx={{ my: 5 }} variant="h4" style={{ fontWeight: "bold"}} >
				{props.title}
			</Typography>
		</Box>
	);
}
