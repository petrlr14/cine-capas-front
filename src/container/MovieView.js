import React, {Component} from 'react';
import {redirectToLogin} from "../utils/RedirectToLogin";
import {apiInstance} from "../conf/axios/axios-instances";
import {withRouter} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import style from "./MovieView.module.css";

class MovieView extends Component {
    constructor(props) {
        super(props);
        redirectToLogin(this.props);
        this.state = {};
        this.clickReservationHandler=this.clickReservationHandler.bind(this);

    }


    componentDidMount() {
        apiInstance.get("movie").then(response => {
            this.setState({
                ...this.state,
                movies: response.data
            })
        }, error => {
            console.log(error);
        }).catch(error => {
            console.log(error);
        })
    }

    clickReservationHandler(id){
        this.props.history.push("/movie/reservation", {id:id});
    }

    render() {
        const movies = this.state.movies;
        let body;
        console.log(movies);
        if (movies) {
            body =<InfiniteScroll loader={<h1>Loading...</h1>} dataLength={movies.length}>
                {
                    this.state.movies.map((element) => {
                        return <div className={style.main} key={element.movieId}>
                            <img src={element.moviePoster} alt={"poster"}/>
                            <div>
                                <div>
                                    <h2>{element.movieName}</h2>
                                    <p>{element.movieDescription}</p>
                                </div>
                                <button onClick={()=>this.clickReservationHandler(element.movieId)}>Reservar</button>
                            </div>
                        </div>
                    })
                }
            </InfiniteScroll>
        } else {
            body = <div>
                <h1>loading....</h1>
            </div>;
        }
        return <>
            {body}
        </>;
    }
}

export default withRouter(MovieView);