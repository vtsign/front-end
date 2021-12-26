import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { Grid } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function FAQs() {
	const item = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		px: 5,
	};
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
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
						sx={{ width: '100%', maxWidth: 720, bgcolor: 'background.paper' }}
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						<ListItemButton onClick={handleClick}>
							<ListItemText primary="Chữ ký số là gì?" />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText
										align="justify"
										secondary="Chữ ký số là một loại của chữ ký điện tử (electronic signatures), một tập hợp các ký tự (characters) được thêm vào cuối tài liệu hoặc phần nội dung của thông điệp (message) bằng cách áp dụng các thuật toán mật hóa (cryptographic algorithms) để xác nhận hoặc thể hiện tính hợp lệ và bảo mật. Được sử dụng để xác định người đưa ra thông điệp và tính xác thực tài liệu không bị sửa đổi so với bản gốc."
									/>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton onClick={handleClick}>
							<ListItemText primary="Chữ ký điện tử là gì?" />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText
										align="justify"
										secondary="Chữ ký điện tử là một phần dữ liệu đề cập đến dữ liệu điện tử khác và được sử dụng để xác minh người ký tài liệu, rằng danh tính của người ký đã được xác minh và tài liệu đó không thay đổi sau khi chữ ký được thêm vào. Các phương pháp khác nhau để ghi lại chữ ký gồm nhập tên của người ký vào khung chỗ ký bằng cách sử dụng máy tính hoặc ứng dụng di động để chụp ảnh chữ ký viết tay, xác minh qua email, bằng ID công ty hoặc mã PIN điện thoại"
									/>
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
						<ListItemButton onClick={handleClick}>
							<ListItemText primary="Nạp tiền để sử dụng hệ thống bằng phương thức nào?" />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText
										align="justify"
										secondary="Bạn có thể nạp tiền vào tài khoản thông qua Ví Zalopay, Thẻ ATM, Visa, Mastercard và JCB"
									/>
								</ListItemButton>
							</List>
						</Collapse>
						<ListItemButton onClick={handleClick}>
							<ListItemText primary="Mỗi hợp đồng gửi đi tốn phí sử dụng bao nhiêu?" />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemText
										align="justify"
										secondary="Với mỗi hợp đồng gửi đi, chúng tôi sẽ trừ 5.000đ/người nhận vào tải khoản của bạn"
									/>
								</ListItemButton>
							</List>
						</Collapse>
					</List>
				</Grid>
			</Grid>
		</Container>
	);
}
