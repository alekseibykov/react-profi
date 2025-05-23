import {Switch, Route, Redirect} from 'react-router-dom';
import {privateRoutes, publicRoutes, RouteNames} from "./index";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Login from "../pages/Login";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.users);
    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.EVENT}/>
            </Switch>
            :
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />}/>
                {publicRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
            </Switch>
    );
};

export default AppRouter;
