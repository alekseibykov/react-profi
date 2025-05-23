import React from "react";
import Login from "../pages/Login";
import Event from '../pages/Event';
import FormDemo from '../pages/FormDemo';

export interface IRoute {
    path: string;
    component: React.FC;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
    FORM_DEMO = '/form-demo'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENT, exact: true, component: Event},
    {path: RouteNames.FORM_DEMO, exact: true, component: FormDemo}
]
