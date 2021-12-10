import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Card, CardContent, OutlinedInput, Button, InputAdornment } from '@mui/material'
import './payment.scss'
import userApi from '../../api/userApi';

export default function Payment() {
    const [type, setType] = useState("zalopayapp");
    const [amount, setAmount] = useState();

    const handleRadioChange = (event) => {
        setType(event.target.value);
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleOnPayment = async () => {
        const res = await userApi.payment(type, amount);
        window.open(res.data.order_url, "_self");
    }

    return (
        <div className='payment'>
            <Card sx={{ width: '30%' }}>
                <CardContent style={{ textAlign: "center" }}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <FormLabel component="legend">Nhập số tiền</FormLabel>
                        <OutlinedInput
                            type="number"
                            onChange={handleChangeAmount}
                            endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                            required
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Vui lòng chọn phương thức thanh toán</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="zalopayapp"
                            name="radio-buttons-group"
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="zalopayapp" control={<Radio />} label="Ví Zalopay" />
                            <FormControlLabel value="CC" control={<Radio />} label="Visa, Mastercard, JCB (qua cổng ZaloPay)" />
                            <FormControlLabel value="ATM" control={<Radio />} label="Thẻ ATM (qua cổng ZaloPay)" />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" onClick={handleOnPayment}>Thanh toán</Button>
                </CardContent>
            </Card>
        </div>
    );
}