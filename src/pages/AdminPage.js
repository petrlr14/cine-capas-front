import React from 'react';
import {Route} from "react-router-dom";
import UserView from "../container/UserView";

export const AdminPage = (props) => {
    return (
        <>
            <Route path={`${props.match.url}/user/`} exact render={() =>
                <UserView/>
            }/>
        </>
    );
};