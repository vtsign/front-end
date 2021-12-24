import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { Grid } from '@mui/material';

const item = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	px: 5,
};

function FAQs() {
	return (
		<Container
			component="section"
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
		>
			<Button
				sx={{
					border: '4px solid currentColor',
					borderRadius: 0,
					height: 'auto',
					py: 2,
					px: 5,
				}}
			>
				<Typography variant="h4" component="span">
					Các câu hỏi thường gặp?
				</Typography>
			</Button>
			<Typography variant="subtitle1" sx={{ my: 3 }}>
				Chúng tôi sẵn sàng trả lời
			</Typography>
		</Container>
	);
}

export default FAQs;
