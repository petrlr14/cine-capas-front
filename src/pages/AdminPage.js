import React from 'react';
import {Route, withRouter} from "react-router-dom";
import UserView from "../container/UserView";
import MovieViewAdmin from "../container/MovieViewAdmin";
import {redirectToLogin} from "../utils/RedirectToLogin";
import {sideNavbarAdmin as SideNavbarAdmin} from "../components/SideNavbarAdmin";
import "./pages.css"
import CreateMovie from "../components/CreateMovie";

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        redirectToLogin(this.props);
        this.films=this.films.bind(this);
        this.users=this.users.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.props.match.path === nextProps.match.path
    }

    films(){
        this.props.history.push("/admin/movie");
    }

    users(){
        this.props.history.push("/admin/user/");
    }

    render() {
        return (
            <div className={"pageContent"}>
                <SideNavbarAdmin films={this.films} users={this.users}/>
                <Route path={`${this.props.match.url}/movie/`} exact render={() =>
                    <MovieViewAdmin/>
                }/>
                <Route path={`${this.props.match.url}/movie/new`} exact render={() =>
                    <CreateMovie/>
                }/>
                <Route path={`${this.props.match.url}/user/`} exact render={() =>
                    <UserView/>
                }/>
            </div>
        );
    }
};

export default withRouter(AdminPage);