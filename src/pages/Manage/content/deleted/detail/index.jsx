import React from 'react'
import Detail from '../../../common/detail'

const DocumentDeletedDetail = () => {
	return (
		<Detail status="DELETED" title="Tài liệu đã xóa" pathReturn="/manage/deleted" />
	)
}

export default DocumentDeletedDetail