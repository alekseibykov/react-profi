import {FC, useEffect} from 'react';
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import {IUser} from "./models/IUser";
import {setIsAuth, setUser} from "./store/reducers/auth/authSlice";
import {useDispatch} from "react-redux";

const App:FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            dispatch(setUser({username: localStorage.getItem('username')} as IUser))
            dispatch(setIsAuth(true));
        }
    }, [])

    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter />
            </Layout.Content>
        </Layout>
    );
};

export default App;
