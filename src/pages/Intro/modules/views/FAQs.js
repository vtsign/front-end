import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function FAQs() {
	const [openedItemId, setOpenedItemId] = React.useState(true);

	const handleClick = (orgEvent) => {
		let clickedItemId = orgEvent.currentTarget.id;
		if (openedItemId === clickedItemId) {
			setOpenedItemId();
		} else {
			setOpenedItemId(clickedItemId);
		}
	};
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
					Hỏi đáp
				</Typography>
			</Button>
			<Typography variant="h5" sx={{ my: 3 }}>
				Các câu hỏi thường gặp - Chúng tôi sẵn sàng trả lời
			</Typography>
			<Grid container spacing={2} columns={16}>
				<Grid item xs={8}>
					<List
						sx={{
							width: '100%',
							maxWidth: 720,
							bgcolor: 'background.paper',
						}}
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						<ListItemButton id="ask1" onClick={handleClick}>
							{openedItemId === 'ask1' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Chữ ký số là gì ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask1'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Chữ ký số là một loại của chữ ký điện tử, một tập hợp các ký
										tự được thêm vào cuối tài liệu hoặc phần nội dung của thông
										điệp bằng cách áp dụng các thuật toán mật hóa để xác nhận
										hoặc thể hiện tính hợp lệ và bảo mật. Được sử dụng để xác
										định người đưa ra thông điệp và tính xác thực tài liệu không
										bị sửa đổi so với bản gốc
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask2" onClick={handleClick}>
							{openedItemId === 'ask2' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Chữ ký điện tử là gì ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask2'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Chữ ký điện tử là chữ ký viết tay của một người có thể được
										tạo trên nhiều thiết bị khác nhau, từ máy tính để bàn, máy
										tính bảng đến điện thoại thông minh, với sự trợ giúp của
										phần mềm thích hợp
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask3" onClick={handleClick}>
							{openedItemId === 'ask3' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Nạp tiền để sử dụng hệ thống bằng phương thức nào ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask3'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Bạn có thể nạp tiền vào tài khoản thông qua Ví Zalopay, thẻ
										ATM, Visa, Mastercard và JCB
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask4" onClick={handleClick}>
							{openedItemId === 'ask4' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Mỗi hợp đồng gửi đi tốn phí sử dụng bao nhiêu ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask4'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Với mỗi hợp đồng gửi đi, chúng tôi sẽ trừ 5.000/ngườinhận
										vài tài khoản của bạn
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask5" onClick={handleClick}>
							{openedItemId === 'ask5' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Tôi có thể quản lý các tài liệu hợp đồng như thế nào ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask5'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Bạn có thể quản lí và xem chi tiết các tài liệu hợp đồng bao
										gồm các trạng thái đã hoàn thành, chờ ký, cần ký và xóa
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask6" onClick={handleClick}>
							{openedItemId === 'ask6' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Tôi có thể cài đặt được gì cho người nhận tài liệu hợp đồng không ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask6'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Bạn có thể thiết lập có người nhận có thể ký hoặc có người
										nhận chỉ được phép xem tài liệu
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask7" onClick={handleClick}>
							{openedItemId === 'ask7' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Người nhận tài liệu cần phải tạo tài khoản VTSign không ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask7'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Người dùng hoàn toàn không cần tạo tài khoản hệ thống để ký
										kết, có thể ký kết trực tiếp thông qua link gửi trong email
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask8" onClick={handleClick}>
							{openedItemId === 'ask8' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Định dạng tài liệu nào mà hệ thống VTSign hỗ trợ ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask8'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Nền tảng của chúng tôi hoạt động với định dạng được sử dụng
										phổ biến và thường xuyên nhất đó là PDF. PDF được biến đến
										là định dạng đáng tin cạy nhất để truyền dữ liệu và lưu trữ
										thông tin
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
					</List>
				</Grid>
				<Grid item xs={8}>
					<List
						sx={{ width: '100%', maxWidth: 720, bgcolor: 'background.paper' }}
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						<ListItemButton id="ask9" onClick={handleClick}>
							{openedItemId === 'ask9' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Tôi chỉ có thể sử dụng VTSign để gửi thư mời hay tôi cũng có thể tự
								ký tài liệu được không ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask9'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Bạn có thể tự mình ký một tài liệu trực tuyến. Trong BƯỚC 3
										- ký tên và các thông tin khác, bạn tạo chữ ký, vẽ hoặc tải
										lên từ thiết bị của bạn. Bạn cũng có thể thêm văn bản, ngày
										tháng với tư cách là người gửi
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask10" onClick={handleClick}>
							{openedItemId === 'ask10' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Người nhận của tôi có yêu cầu phải trả phí gì khi thực hiện ký kết
								không ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask10'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Không. Bất kỳ ai nhận được yêu cầu chữ ký trong hệ thống
										VTSign đều có thể hoàn thành phiên ký tài liệu bất kể họ có
										tài khoản trả phí hay không
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask11" onClick={handleClick}>
							{openedItemId === 'ask11' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Tôi có thể tủy chỉnh tải lên chữ ký cá nhân hay thương hiệu logo từ
								máy tính không ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask11'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Vâng, bạn có thể. Nhấp vào biểu tượng chữ ký hoặc công ty ở
										BƯỚC 3 - ký tên và các thông tin khác. Trong cửa sổ bật lên,
										chọn TẢI LÊN và DUYỆT tìm hình ảnh trên máy tính của bạn
										hoặc KÉO tập tin trực tiếp vào sau đó ấn TẠO để hoàn tất
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask12" onClick={handleClick}>
							{openedItemId === 'ask12' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Tôi có thể chỉnh sửa được tài liệu gốc không ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask12'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Với tư cách là người gửi, bạn có thể thêm chữ ký, văn bản và
										ngày tháng vào các tài liệu đã được ký. Tuy nhiên, bạn không
										thể chỉnh sửa bất kỳ nội dung nào do người ký của bạn thêm
										vào hoặc nội dung của chính bạn sau khi bạn đã lưu các thay
										đổi của mình và đóng tài liệu
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask13" onClick={handleClick}>
							{openedItemId === 'ask13' ? <ExpandLess /> : <ExpandMore />}
							<Typography
								variant="h6"
								sx={{
									fontWeight: 'bold',
									borderBottom: '2px solid gray',
									marginLeft: 1,
								}}
							>
								Tôi liên lạc hỏi đáp trực tiếp VTSign qua hình thức nào ?
							</Typography>
						</ListItemButton>
						<Collapse in={openedItemId === 'ask13'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Bạn gửi nội dung cần trao đổi qua email liên hệ của chúng
										tôi contact@vtsign.tech bất kì thời gian nào. Chúng tôi sẽ
										cố gắng giải đáp thắc mắc sớm nhất có thể
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
					</List>
				</Grid>
			</Grid>
		</Container>
	);
}
