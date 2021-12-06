import React from 'react'
import ManageDocument from '../../common/manageDocument'

const cxtHeader = {
	title: "Tài liệu đã xóa",
	description: "Quản lý tài liệu đã xóa"
}

const documentDeleted = () => {
	return (
		<ManageDocument status='DELETED' path="/manage/deleted" cxtHeader={cxtHeader} />
	)
}
export default documentDeleted