import React, { Fragment } from 'react';
import { Pagination } from '@mui/material';

const PaginationCommon = (totalPages, handleOnPageChange) => {
	return (
		<Fragment>
			<Pagination
				className="content-pagination"
				count={totalPages}
				onChange={handleOnPageChange}
				color="primary"
			/>
		</Fragment>
	);
};

export default PaginationCommon;
