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

    const authItems = [
        {
            key: '1',
            label: 'Выйти',
            onClick: logout
        }
    ];

    const nonAuthItems = [
        {
            key: '1',
            label: 'Логин',
            onClick: () => router.push(RouteNames.LOGIN)
        }
    ];

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>
                            {user.username}
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false} items={authItems} />
                    </>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false} items={nonAuthItems} />
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;
