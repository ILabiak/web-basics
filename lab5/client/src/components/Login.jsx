/* eslint-disable jsx-a11y/anchor-is-valid */
import './login.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash,
    faCheck,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



function Login(props) {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const { open, setOpen, setUserData, loginContainerRef } = props;
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        pib: '',
        variant: '',
        phone_number: '',
        faculty: '',
        address: '',
    })
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState({
        login: false,
        signup: false,
        signupConfirm: false,
    });
    const [loginStatusText, setloginStatusText] = useState('');
    const [loginSuccess, setloginSuccess] = useState(false);
    const [signUpStatusText, setSignUpStatusText] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const validationRules = {
        pib: /^[А-ЯҐЄІЇа-яґєії]{2,15}\s[А-ЯҐЄІЇ].[А-ЯҐЄІЇ].$/,
        variant: /^[0-9]{1,2}$/,
        phone_number: /^[(][0-9]{3}[)]-[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
        faculty: /^[А-ЯҐЄІЇа-яґєії]{2,4}$/,
        address: /^м.\s[А-ЯҐЄІЇа-яґєії]{3,20}$/,
    };

    const handleSignupClick = () => {
        const loginText = document.querySelector('.title-text .login');
        const loginForm = document.querySelector('form.login');
        loginForm.style.marginLeft = '-50%';
        loginText.style.marginLeft = '-50%';
        loginContainerRef.current.style.maxHeight = '1700px'
    };

    const handleLoginClick = () => {
        const loginText = document.querySelector('.title-text .login');
        const loginForm = document.querySelector('form.login');
        loginForm.style.marginLeft = '0%';
        loginText.style.marginLeft = '0%';
        loginContainerRef.current.style.maxHeight = '500px'
    };

    const handleSignupLinkClick = () => {
        const signupBtn = document.querySelector('label.signup');
        signupBtn.click();
        return false;
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignupDataChange = (event) => {
        setSignupData(data => ({
            ...data,
            [event.target.id]: event.target.value
        }))
        // console.log(signupData)
    };

    const handleTogglePasswordVisibility = (field) => {
        setShowPassword((prevShowPassword) => ({
            ...prevShowPassword,
            [field]: !prevShowPassword[field],
        }));
    };

    const handleLoginErrorCancelClick = () => {
        setloginSuccess(false);
        setloginStatusText('');
    };

    const handleSignUpErrorCancelClick = () => {
        setSignUpSuccess(false);
        setSignUpStatusText('');
    };

    function validateField(fieldName, value) {
        return validationRules[fieldName].test(value);
    }


    const handleLoginSubmit = async (event) => {
        event.preventDefault(); // Prevents form submission and page reload

        // Make the API call to the login endpoint
        try {
            const response = await fetch('http://localhost:3005' + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            if (response.status === 200) {
                const responseData = await response.json();

                // const expires = new Date(responseData.expires);
                // document.cookie = `session=${responseData.session}; expires=${expires.toUTCString()}; path=/`;
                setCookie('sessionID', responseData.session, {
                    path: '/',
                    httpOnly: false,
                    expires: new Date(responseData.expires)
                })
                // alert("Login successfull");
                setloginSuccess(true);
                setloginStatusText('Успішна авторизація');
                setTimeout(() => {
                    window.location.reload(false)
                }, 750)
            } else if (response.status === 401) {
                // alert("Invalid email or password");
                setloginSuccess(false);
                setloginStatusText('Неправильна пошта чи пароль');
                // console.log(await response.json())
            } else {
                setloginSuccess(false);
                setloginStatusText('Помилка на сервері');
                console.log('Some other error');
            }
        } catch (error) {
            setloginSuccess(false);
            setloginStatusText('Помилка на сервері');
            console.log('Error while logging in', error);
        }
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        // Check if signup data is valid
        // if (signupPassword !== signupConfirmPassword) {
        //     setSignUpSuccess(false);
        //     setSignUpStatusText('Паролі не співпадають');
        //     return;
        // }
        for (const field in validationRules) {
            const value = document.getElementById(field).value;
            const isValidField = validateField(field, value);
            if (!isValidField) {
                setSignUpSuccess(false);
                setSignUpStatusText(`Поле ${field} заповнено неправильно`);
                return;
            }
        }

        try {
            console.log('data, ', signupData)
            const response = await fetch('http://localhost:3005/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
                credentials: 'include'
            });

            if (response.status === 201) {
                // const responseData = await response.json();
                // Successful sign-up
                setSignUpSuccess(true);
                setSignUpStatusText('Реєстрація пройшла успішно');
                // setTimeout(() => {
                //     window.location.reload(false);
                // }, 1000);
            } else if (response.status === 400) {
                // Handle other response statuses (e.g., validation errors, server errors)
                const responseData = await response.json();
                const error = responseData.error
                if (error.includes('email must be unique')) {
                    setSignUpStatusText('Така пошта вже зареєстрована')
                } else {
                    setSignUpStatusText(responseData.error);
                }
                setSignUpSuccess(false);
            } else {
                setSignUpSuccess(false);
                setSignUpStatusText('Помилка на сервері, спробуйте пізніше');
            }
        } catch (error) {
            setSignUpSuccess(false);
            setSignUpStatusText('Помилка на сервері');
            console.log(error)
        }
    };



    return (
        <Backdrop
            open={open}
            sx={{
                zIndex: (theme) =>
                    Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
            }}

        >
            <div className='loginform' ref={loginContainerRef}>
                <div className='title-text'>
                    <div className='title login'>Авторизація</div>
                    <div className='title signup'>Реєстрація</div>
                </div>
                <div className='form-container'>
                    <div className='slide-controls'>
                        <input type='radio' name='slide' id='login' />
                        <input type='radio' name='slide' id='signup' />
                        <label
                            onClick={handleLoginClick}
                            htmlFor='login'
                            className='slide login'
                        >
                            Вхід
                        </label>
                        <label
                            onClick={handleSignupClick}
                            htmlFor='signup'
                            className='slide signup'
                        >
                            Реєстрація
                        </label>
                        <div className='slider-tab'></div>
                    </div>
                    <div className='form-inner'>
                        <form action='#' className='login'>
                            {loginStatusText && (
                                <div className='field loginStatusField'>
                                    <p
                                        className={
                                            loginSuccess ? 'loginSuccessForm' : 'loginErrorForm'
                                        }
                                    >
                                        {loginStatusText}
                                    </p>
                                    <button
                                        onClick={handleLoginErrorCancelClick}
                                        className={
                                            loginSuccess ? 'closeSuccessButton' : 'closeErrorButton'
                                        }
                                    >
                                        <FontAwesomeIcon icon={loginSuccess ? faCheck : faTimes} />
                                    </button>
                                </div>
                            )}

                            <div className='field'>
                                <input
                                    type='text'
                                    placeholder='Електронна пошта'
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className='field password-field'>
                                <input
                                    type={showPassword.login ? 'text' : 'password'}
                                    placeholder='Пароль'
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <span
                                    className='password-toggle'
                                    onClick={() => handleTogglePasswordVisibility('login')}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword.login ? faEyeSlash : faEye}
                                    />
                                </span>
                            </div>
                            <div className='pass-link'>
                                {/* <a href='#'>Забули пароль?</a> */}
                                <button onClick={() => navigate('/forgot-password')}>Забули пароль?</button>
                            </div>
                            <div className='field btn'>
                                <div className='btn-layer'></div>
                                <input type='submit' onClick={handleLoginSubmit} value='Увійти' />
                            </div>
                            <div className='signup-link'>
                                Не учасник? <a onClick={handleSignupLinkClick}>Зареєструватися</a>
                            </div>
                        </form>
                        <form action='#' className='signup'>
                            {signUpStatusText && (
                                <div className='field loginStatusField'>
                                    <p
                                        className={
                                            signUpSuccess ? 'loginSuccessForm' : 'loginErrorForm'
                                        }
                                    >
                                        {signUpStatusText}
                                    </p>
                                    <button
                                        onClick={handleSignUpErrorCancelClick}
                                        className={
                                            signUpSuccess ? 'closeSuccessButton' : 'closeErrorButton'
                                        }
                                    >
                                        <FontAwesomeIcon icon={signUpSuccess ? faCheck : faTimes} />
                                    </button>
                                </div>
                            )}
                            <div className='field'>
                                <input type='text' placeholder='Електронна пошта' id='email' onChange={handleSignupDataChange} required />
                            </div>
                            <div className='field'>
                                <input
                                    type={showPassword.signup ? 'text' : 'password'}
                                    placeholder='Пароль'
                                    id='password'
                                    onChange={handleSignupDataChange}
                                    required
                                />
                                <span
                                    className='password-toggle'
                                    onClick={() => handleTogglePasswordVisibility('signup')}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword.signup ? faEyeSlash : faEye}
                                    />
                                </span>
                            </div>
                            <div className='field'>
                                <input type='text' placeholder='ПІБ' id='pib' onChange={handleSignupDataChange} required />
                            </div>
                            <div className='field'>
                                <input type='text' placeholder='Варіант' id='variant' onChange={handleSignupDataChange} required />
                            </div>
                            <div className='field'>
                                <input type='text' placeholder='Телефон' id='phone_number' onChange={handleSignupDataChange} required />
                            </div>
                            <div className='field'>
                                <input type='text' placeholder='Факультет' id='faculty' onChange={handleSignupDataChange} required />
                            </div>
                            <div className='field'>
                                <input type='text' placeholder='Адреса' id='address' onChange={handleSignupDataChange} required />
                            </div>
                            {/* <div className='field'>
                                <input
                                    type={showPassword.signupConfirm ? 'text' : 'password'}
                                    placeholder='Підтвердіть пароль'
                                    onChange={handleSignupConfirmPasswordChange}
                                    required
                                />
                                <span
                                    className='password-toggle'
                                    onClick={() => handleTogglePasswordVisibility('signupConfirm')}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword.signupConfirm ? faEyeSlash : faEye}
                                    />
                                </span>
                            </div> */}
                            <div className='field btn'>
                                <div className='btn-layer'></div>
                                <input type='submit' onClick={handleSignupSubmit} value='Зареєструватись' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
}

export default Login;
