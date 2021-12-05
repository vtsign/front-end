
import React from 'react'
import ManageDocument from '../../common/manageDocument'

const cxtHeader = {
	title: "Tài liệu cần ký",
	description: "Quản lý tài liệu cần ký"
}

const documentNeedSign = () => {
	return (
		<ManageDocument status='ACTION_REQUIRE' path="/manage/need-sign" cxtHeader={cxtHeader} />
	)
}
export default documentNeedSign
