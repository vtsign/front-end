import React from 'react'
import ManageDocument from '../../common/manageDocument'

const cxtHeader = {
	title: "Tài liệu chờ ký",
	description: "Quản lý tài liệu chờ ký"
}

const DocumentWaiting = () => {
	return (
		<ManageDocument status="WAITING" path="/manage/waiting" cxtHeader={cxtHeader} />
	)
}
export default DocumentWaiting