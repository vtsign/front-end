
import React from 'react'
import ManageDocument from '../../common/manageDocument'

const cxtHeader = {
	title: "Tài liệu đã hoàn thành",
	description: "Quản lý tài liệu đã hoàn thành"
}

const DocumentCompleted = () => {
	return (
		<ManageDocument status='COMPLETED' path="/manage/completed" cxtHeader={cxtHeader} />
	)
}
export default DocumentCompleted
