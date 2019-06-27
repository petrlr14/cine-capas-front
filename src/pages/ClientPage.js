import React from 'react';
import MovieView from "../container/MovieView";
import MovieReservation from "../container/MovieReservation";
import MovieCheckout from "../components/MovieCheckout/MovieCheckout";
import {Route} from "react-router-dom";

export const clientPage = (props) => {
    return (
        <>
            <Route path={`${props.match.url}movie/`} exact render={() =>
                <MovieView/>
            }/>
            <Route path={`${props.match.url}movie/reservation`} exact render={() =>
                <MovieReservation/>
            }/>
            <Route path={`${props.match.url}movie/checkout`} exact render={() =>
                <MovieCheckout/>
            }/>
        </>
    );
};