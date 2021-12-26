export const REG_EMAIL =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REG_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
// export const REG_PHONE = /(0)+([0-9]{0,13})\b/;
export const REG_PHONE = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const responseMessage = {
	400: 'Cú pháp không hợp lệ',
	401: 'Người dùng chưa được xác thực',
	403: 'Người dùng không có quyền truy cập',
	404: 'Nội dung không tồn tại',
	500: 'Máy chủ gặp trục trặc',
};
