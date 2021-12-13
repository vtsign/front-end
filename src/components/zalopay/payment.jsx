import React, { Fragment, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Card, CardContent, TextField, Button, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material'
import CurrencyTextField from '@unicef/material-ui-currency-textfield/dist/CurrencyTextField'
import './payment.scss'
import userApi from '../../api/userApi';
import Loading from '../Loading/Loading';

export default function Payment() {
    const [type, setType] = useState("zalopayapp");
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState();
    const [showInputCurrency, setShowInputCurrency] = useState(false)
    const handleRadioChange = (event) => {
        setType(event.target.value);
    }

    const handleChangeAmount = (value) => {
        setError(null);
        setAmount(value);
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

    const handleChangeSelectCurrency = (event) => {
        const amount = event.target.value;
        if (amount === -1) {
            setAmount();
            setShowInputCurrency(true)
        } else {
            setAmount(event.target.value);
        }
    }

    return (
        <Fragment>
            {loading && <Loading />}
            <div className='payment'>
                <div className='payment__header'>
                    <div className='payment__header__content'>
                        <h2>Nạp tiền vào tài khoản</h2>
                        <p>Với mỗi hợp đồng gửi đi, chúng tôi sẽ trừ 5.000đ/người nhận/tài liệu vào tài khoản của bạn</p>
                        <p className='payment__header__policy'>1. Với ví zalopay, bạn cần có tài khoản zalopay</p>
                        <p className='payment__header__policy'>2. Với phương thức ATM, bạn cần sử dụng Internet Banking của ngân hàng</p>
                        <p><i>Chúng tôi</i> sẽ không lưu bất cứ thông tin nào của bạn, mọi giao dịch sẽ được thực hiện qua cổng Zalopay.</p>
                    </div>
                </div>
                <div className='payment__content'>
                    <div className='payment__card'>
                        {!showInputCurrency && (
                            <FormControl fullWidth className="payment__card__input">
                                <FormLabel component="legend">Nhập số tiền</FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleChangeSelectCurrency}
                                    required
                                >
                                    <MenuItem value={20000}>20.000</MenuItem>
                                    <MenuItem value={50000}>50.000</MenuItem>
                                    <MenuItem value={100000}>100.000</MenuItem>
                                    <MenuItem value={200000}>200.000</MenuItem>
                                    <MenuItem value={500000}>500.000</MenuItem>
                                    <MenuItem value={1000000}>1.000.000</MenuItem>
                                    <MenuItem value={-1}>Nhập số khác...</MenuItem>

                                </Select>
                            </FormControl>)}
                        {showInputCurrency && (
                            <FormControl variant="outlined" className="payment__card__input">
                                <FormLabel component="legend">Nhập số tiền</FormLabel>
                                <CurrencyTextField
                                    variant="outlined"
                                    value={amount}
                                    currencySymbol="VND"
                                    onChange={(event, value) => handleChangeAmount(value)}
                                />
                            </FormControl>)}
                        <FormControl component="fieldset" className="payment__card__select">
                            <FormLabel component="legend">Vui lòng chọn phương thức thanh toán</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="zalopayapp"
                                name="radio-buttons-group"
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="zalopayapp" control={<Radio />} label="Ví Zalopay" />
                                <FormControlLabel value="ATM" control={<Radio />} label="Thẻ ATM" />
                                <FormControlLabel value="CC" control={<Radio />} label="Visa, Mastercard, JCB" />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="contained" onClick={handleOnPayment} disabled={amount == null}>Thanh toán</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}