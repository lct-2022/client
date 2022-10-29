import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { prepareFio } from '../../utils/fio';

import './Signup.css';

export function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [res, setRes] = useState('');

    const changeMail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const navigate = useNavigate();

    const signupAsync = useCallback(async () => {
        const url = 'https://passport.dev.lct.40ants.com';
        const body = {
            jsonrpc: '2.0',
            method: 'signup',
            params: {
                email: email,
                password: password,
                fio: '',
            },
            id: 0,
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }
        const response = await fetch(url, options);

        if (response.ok) {
            const result = await response.json();
            console.log(result.result)
            setEmail('');
            setPassword('');
            navigate('/profile');
        } else {
            console.log('Error');
        }
    }, [email, password]);

    return (
        <div className="signup_form">
            <hr/>

            {res}

            <hr/>

            <h3>Регистрация</h3>

                <div className="signup_input">
                    <label htmlFor="signup_mail">Введите Вашу электронную почту</label>
                    <input className="signup_mail" value={email} onChange={changeMail}/>
                </div>

                <div className="signup_input">
                    <label htmlFor="signup_password">Придумайте пароль</label>
                    <input className="signup_password" value={password} onChange={changePassword}/>
                </div>

                <button 
                    onClick={signupAsync}
                >
                    Отправить
                </button>
        </div>
    );
}

export default SignupForm;
