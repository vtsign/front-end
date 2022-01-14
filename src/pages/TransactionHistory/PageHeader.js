import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PageHeader(props) {
	return (
		<Box
			sx={{
				marginBottom: { xs: '0', sm: '1em' },
			}}
		>
			<Typography sx={{ my: { xs: 0, sm: 5 } }} variant="h4" style={{ fontWeight: 'bold' }}>
				{props.title}
			</Typography>
		</Box>
	);
}
