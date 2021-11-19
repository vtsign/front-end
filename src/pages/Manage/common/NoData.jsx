import React from 'react';
import './noData.scss';

const NoData = () => {
	return (
		<div className="no-data">
			<img src="/FolderNodata.png" alt="No data" className="no-data__icon" />
			<p className="no-data__message">Không có hợp đồng</p>
		</div>
	);
};

export default NoData;
