import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import Input from './Input';
import { BLACK_LOGO } from '../../utils/globalVariables';
import { getUserLogin } from '../../utils/auth';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import { setUser } from '../../features/auth';
import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const initialFormState = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [invalidUsername, setInvalidUsername] = useState({
        error: false,
        helperText: '',
    });
    const [invalidPassword, setInvalidPassword] = useState({
        error: false,
        helperText: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenToast(false);
    };

    const handleInvalid = (e, setInvalidData, helperText) => {
        if (e.target.value) {
            setInvalidData({ error: false, helperText: '' });
        } else {
            setInvalidData({ error: true, helperText });
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const usernameInput = useRef();
    const passwordInput = useRef();

    useEffect(() => {
        if(formData.username && formData.password) {
            setEnableButton(true);
        } else setEnableButton(false);
    }, [formData]);

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleUsernameChange = (e) => {
        const helperText = 'Vui lòng điền vào trường này';

        return handleInvalid(e, setInvalidUsername, helperText);
    };

    const handlePasswordChange = (e) => {
        const helperText = 'Vui lòng điền vào trường này';

        return handleInvalid(e, setInvalidPassword, helperText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, status } = await getUserLogin(formData);

        console.log(data);

        if(status === 200) {
            if(!data?.roles.find(role => role.authority === 'ADMIN')) {
                setOpenToast(true);
                setToastMessage('Bạn không được uỷ quyền để truy cập vào trang này');
            }
            else {
                dispatch(setUser(data));
                window.location.href = 'http://localhost:4000';
            }
        }
        else {
            setOpenToast(true);
            setToastMessage('Thông tin đăng nhập không đúng');
        }
    };

    return (
        <Container>
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h4" marginBottom="20px">
                    Đăng nhập trang quản trị
                </Typography>
                <img src={BLACK_LOGO} />
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Input
                        name="username"
                        label="Username"
                        handleChange={handleUsernameChange}
                        error={invalidUsername.error}
                        helperText={invalidUsername.helperText}
                        inputRef={usernameInput}
                    />
                    <Input
                        name="password"
                        label="Mật khẩu"
                        handleChange={handlePasswordChange}
                        type={showPassword ? 'text' : 'password'}
                        handleShowPassword={handleShowPassword}
                        helperText={invalidPassword.helperText}
                        error={invalidPassword.error}
                        inputRef={passwordInput}
                    />
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ padding: '16px', width: '100%' }} 
                        type="submit"
                        disabled={!enableButton}
                    >
                        Đăng nhập
                    </Button>
                </form>
            </Paper>
            <Alert 
                message={toastMessage}
                openToast={openToast} 
                handleCloseToast={handleCloseToast}
                color="error"
                severity="error"    
            />
        </Container>
    );
};

export default Auth;
