import React from 'react';
import MovieView from "../container/MovieView";
import MovieReservation from "../container/MovieReservation";
import MovieCheckout from "../components/MovieCheckout/MovieCheckout";
import {Route, withRouter} from "react-router-dom";
import {sideNavbarClient as SideNavbarClient} from "../components/SideNavbarClient";
import "./pages.css"

class ClientPage extends React.Component{

    constructor(props) {
        super(props);
        this.movieHandler=this.movieHandler.bind(this);
        this.historialHandler=this.historialHandler.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.props.match.path===nextProps.match.path
    }

    movieHandler(){
        this.props.history.push("/client/movie")
    }

    historialHandler(){
        this.props.history.push("/client/movie/hola")
    }

    render() {
        return (
            <div className={"pageContent"}>
                <SideNavbarClient films={this.movieHandler} historia={this.historialHandler} className={"side"}/>
                <div>
                    <Route path={`${this.props.match.url}/movie/`} exact render={() =>
                        <MovieView/>
                    }/>
                    <Route path={`${this.props.match.url}/movie/reservation`} exact render={() =>
                        <MovieReservation/>
                    }/>
                    <Route path={`${this.props.match.url}/movie/checkout`} exact render={() =>
                        <MovieCheckout/>
                    }/>
                </div>
            </div>
        );
    }
};

export default withRouter(ClientPage);