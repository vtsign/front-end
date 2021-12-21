import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const BannerIntroRoot = styled('section')(({ theme }) => ({
	color: theme.palette.common.white,
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	[theme.breakpoints.up('sm')]: {
		height: '95vh',
		minHeight: 500,
		maxHeight: 1300,
	},
}));

const Background = styled(Box)({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	zIndex: -2,
});

function BannerIntroLayout(props) {
	const { sxBackground, children } = props;

	return (
		<BannerIntroRoot>
			<Container
				sx={{
					mt: 3,
					mb: 14,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{children}
				<Box
					sx={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						backgroundColor: 'common.black',
						opacity: 0.5,
						zIndex: -1,
					}}
				/>
				<Background sx={sxBackground} />
			</Container>
		</BannerIntroRoot>
	);
}

BannerIntroLayout.propTypes = {
	children: PropTypes.node,
	sxBackground: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
		PropTypes.func,
		PropTypes.object,
	]),
};

export default BannerIntroLayout;
