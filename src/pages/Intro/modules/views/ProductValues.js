import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import Curvy from '../../../../assets/images/CurvyLines.png';
const item = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	px: 5,
};

function ProductValues() {
	return (
		<Box component="section" sx={{ display: 'flex', overflow: 'hidden' }}>
			<Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative' }}>
				<Grid container spacing={5}>
					<Grid item xs={12} md={4}>
						<Box sx={item}>
							<Box component="img" src="/" alt="fast" sx={{ height: 55 }} />
							<Typography variant="h6" sx={{ my: 5 }}>
								Nhanh Chóng
							</Typography>
							<Typography variant="h5">
								{'xxxxx xxxx xxxx xxxxxx xxxx xxxx'}

								{', xxxxx xxxx xxxx xxxxxx xxxx xxxx.'}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={item}>
							<Box component="img" src="/" alt="easy" sx={{ height: 55 }} />
							<Typography variant="h6" sx={{ my: 5 }}>
								Đơn giản
							</Typography>
							<Typography variant="h5">
								{'xxxxx xxxx xxxx xxxxxx xxxx xxxx'}

								{', xxxxx xxxx xxxx xxxxxx xxxx xxxx.'}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={item}>
							<Box component="img" src="/" alt="security" sx={{ height: 55 }} />
							<Typography variant="h6" sx={{ my: 5 }}>
								Bảo mật
							</Typography>
							<Typography variant="h5">
								{'xxxxx xxxx xxxx xxxxxx xxxx xxxx'}

								{', xxxxx xxxx xxxx xxxxxx xxxx xxxx.'}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default ProductValues;
