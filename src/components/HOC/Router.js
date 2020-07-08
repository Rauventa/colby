import React from 'react';
import {Route, Switch} from "react-router-dom";
import Landing from "../containers/content/Landing";
import Catalog from "../containers/content/catalog/Catalog";
import Login from "../containers/user/Login";
import Registration from "../containers/user/Registration";
import ResetPassword from "../containers/user/ResetPassword";
import AdminEnter from "../containers/admin/AdminEnter";
import AdminPanel from "../containers/admin/AdminPanel";
import CatalogItemPage from "../containers/content/catalog/CatalogItemPage";
import Cart from "../containers/content/catalog/Cart";
import Cabinet from "../containers/user/Cabinet";

export const Router = () => {
    return (
        <Switch>

            {/* Content Routes */}

            <Route path={'/'} exact>
                <Landing />
            </Route>
            <Route path={'/catalog'} exact>
                <Catalog />
            </Route>
            <Route path={'/catalog/:id'}>
                <CatalogItemPage />
            </Route>
            <Route path={'/cart'}>
                <Cart />
            </Route>

            {/*Auth routes*/}

            <Route path={'/login'}>
                <Login />
            </Route>
            <Route path={'/reg'}>
                <Registration />
            </Route>
            <Route path={'/reset'}>
                <ResetPassword />
            </Route>

            {/*Admin routes*/}

            <Route path={'/admin'} exact>
                <AdminEnter />
            </Route>
            <Route path={'/admin/panel'}>
                <AdminPanel />
            </Route>
            {/*User routes*/}
            <Route path={'/cabinet'}>
                <Cabinet />
            </Route>
        </Switch>
    )
};