import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setIsAuth, setUser} from "../store/reducers/auth/authSlice";
import {IUser} from "../models/IUser";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../router";

const Navbar: FC = () => {
    const {isAuth, user} = useTypedSelector(state => state.users);
    const dispatch = useDispatch();
    const router = useHistory()

    const logout = () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(setUser({} as IUser));
        dispatch(setIsAuth(false))
    }

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>
                            {user.username}
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>

                            <Menu.Item
                                onClick={logout}
                                key={1}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick={() => router.push(RouteNames.LOGIN)}
                            key={1}
                        >
                            Логин
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;
