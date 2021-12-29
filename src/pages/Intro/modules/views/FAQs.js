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
					Các câu hỏi thường gặp?
				</Typography>
			</Button>
			<Typography variant="subtitle1" sx={{ my: 3 }}>
				Chúng tôi sẵn sàng trả lời
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
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Chữ ký số là gì?
							</Typography>
							{openedItemId === 'ask1' ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={openedItemId === 'ask1'} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<Typography variant="body1" align="justify">
										Chữ ký số là một loại của chữ ký điện tử (electronic
										signatures), một tập hợp các ký tự (characters) được thêm
										vào cuối tài liệu hoặc phần nội dung của thông điệp
										(message) bằng cách áp dụng các thuật toán mật hóa
										(cryptographic algorithms) để xác nhận hoặc thể hiện tính
										hợp lệ và bảo mật. Được sử dụng để xác định người đưa ra
										thông điệp và tính xác thực tài liệu không bị sửa đổi so với
										bản gốc.
									</Typography>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton id="ask2" onClick={handleClick}>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Chữ ký điện tử là gì?
							</Typography>
							{openedItemId === 'ask2' ? <ExpandLess /> : <ExpandMore />}
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
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Nạp tiền để sử dụng hệ thống bằng phương thức nào?
							</Typography>
							{openedItemId === 'ask3' ? <ExpandLess /> : <ExpandMore />}
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
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Mỗi hợp đồng gửi đi tốn phí sử dụng bao nhiêu?
							</Typography>
							{openedItemId === 'ask4' ? <ExpandLess /> : <ExpandMore />}
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
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Tôi có thể quản lý các tài liệu hợp đồng như thế nào?
							</Typography>
							{openedItemId === 'ask5' ? <ExpandLess /> : <ExpandMore />}
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
					</List>
				</Grid>
				<Grid item xs={8}>
					<List
						sx={{ width: '100%', maxWidth: 720, bgcolor: 'background.paper' }}
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						<ListItemButton id="ask6" onClick={handleClick}>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Tôi có thể cài đặt cho người nhận tài liệu hợp đồng không?
							</Typography>
							{openedItemId === 'ask6' ? <ExpandLess /> : <ExpandMore />}
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
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Người nhận tài liệu cần phải tạo tài khoản VTSign không?
							</Typography>
							{openedItemId === 'ask7' ? <ExpandLess /> : <ExpandMore />}
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
					</List>
				</Grid>
			</Grid>
		</Container>
	);
}
