import "./conf/globals";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import ClientPage from "./pages/ClientPage";
import AdminPage from "./pages/AdminPage";
import {layout as Layout} from "./container/Layout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const app =
    <Router>

        <Switch>
            <Route path={"/login"} exact component={LoginPage}/>
            <Route path={"/register"} exact component={RegisterPage}/>
            <Layout>
                <Route path={"/admin"} component={AdminPage}/>
                <Route path={"/client"} component={ClientPage}/>
            </Layout>
        </Switch>

    </Router>;

ReactDOM.render(app, document.getElementById('root'));