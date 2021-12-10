import React, { Fragment, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Card, CardContent, TextField, Button, InputAdornment } from '@mui/material'
import './payment.scss'
import userApi from '../../api/userApi';
import Loading from '../Loading/Loading';

export default function Payment() {
    const [type, setType] = useState("zalopayapp");
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState();
    const handleRadioChange = (event) => {
        setType(event.target.value);
    }

    const handleChangeAmount = (event) => {
        setError(null);
        setAmount(event.target.value);
    }

    const handleOnPayment = async () => {
        if (checkAmount()) {
            setLoading(true);
            const res = await userApi.payment(type, amount);
            setLoading(false)
            window.open(res.data.order_url, "_self");
        }
    }

    const checkAmount = () => {
        let result = true;
        if (!amount) {
            setError("Vui lòng nhập tiền")
            result = false;
        } else if (amount < 1000) {
            setError("Vui lòng nhập số tiền > 1.000")
            result = false;
        } else if (amount > 10000000) {
            setError("Vui lòng nhập số tiền nhỏ hơn 10.000.000")
            result = false;
        }
        return result;
    }

    return (
        <Fragment>
            {loading && <Loading />}
            <div className='payment'>
                <Card sx={{ width: '30%' }}>
                    <CardContent style={{ textAlign: "center" }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <FormLabel component="legend">Nhập số tiền</FormLabel>
                            <TextField
                                error={error != null}
                                type="number"
                                onChange={handleChangeAmount}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                }}
                                helperText={error}
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
        </Fragment>
    );
}