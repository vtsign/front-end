
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import './NotifySuccess.scss';

const NotifySuccess = ({ message, path, titleButton }) => (
    <>
        <Box
            component="main"
            className="notify-success"
            sx={{
                alignItems: "center",
                display: "flex",
                flexGrow: 1,
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography align="center" color="textPrimary" variant="h2">
                        {message ? message : 'Thay đổi thành công'}
                    </Typography>
                    <Typography align="center" color="textPrimary" variant="subtitle2">
                    </Typography>
                    <Box sx={{ textAlign: "center" }}>
                        <img
                            alt="Under development"
                            src="/images/order_confirmed.svg"
                            style={{
                                marginTop: 50,
                                display: "inline-block",
                                maxWidth: "100%",
                                width: 560,
                            }}
                        />
                    </Box>
                    <Link to={path ? path : "/"}>
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                            sx={{ mt: 3 }}
                            variant="contained"
                        >
                            {titleButton ? titleButton : 'Trở về trang chủ'}
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    </>
);

export default NotifySuccess;