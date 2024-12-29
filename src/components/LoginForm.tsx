import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import { useGetUsersQuery } from '../api/apiSlice';
import {setError, setIsAuth, setUser} from "../store/reducers/auth/authSlice";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import * as styles from './LoginForm.module.css';

const LoginForm: FC = () => {
    const {isAuth} = useTypedSelector(state => state.users);
    const dispatch = useDispatch();
    const { data: users, isFetching, isSuccess } = useGetUsersQuery({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        try {
            setTimeout(async () => {
                const mockUser = users.find((user: { username: string; password: string; }) => user.username === username && user.password === password);
                if (mockUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(setUser(mockUser))
                    dispatch(setIsAuth(true))
                } else {
                    dispatch(setError('Некорректный логин или пароль'))
                }
            }, 1000)
        } catch (e) {
            setError('Произошла ошибка при логине')
        }
    }

    return (
        <Form
            onFinish={submit}
        >
            {!isSuccess && <div style={{color: 'red'}}>
                {!isSuccess}
            </div>}
            <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[rules.required("Пожалуйста введите имя пользователя!")]}
            >
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required("Пожалуйста введите пароль")]}
            >
                <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={"password"}
                />
            </Form.Item>
            <Form.Item>
                <Button className={styles.button} type="primary" htmlType="submit" loading={isFetching}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
