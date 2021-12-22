import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Typography from './modules/components/Typography';

import withRoot from './modules/withRoot';

function FailedSystem() {
	return (
		<React.Fragment>
			<Container>
				<Box sx={{ mt: 7, mb: 12 }}>
					<Typography variant="h3" gutterBottom marked="center" align="center">
						Lỗi hệ thống
					</Typography>
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default withRoot(FailedSystem);
