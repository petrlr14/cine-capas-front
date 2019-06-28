import React, {Component} from 'react';
import {apiInstance} from "../conf/axios/axios-instances";
import InfiniteScroll from "react-infinite-scroll-component";
import style from "./MovieView.module.css";
import {withRouter} from "react-router-dom";

class MovieViewAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.activar = this.activar.bind(this);
        this.desactivar = this.desactivar.bind(this);
        this.crearNueva=this.crearNueva.bind(this);
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

    activar(movie) {
        console.log(movie);
    }

    desactivar(movie) {
        console.log(movie);
    }

    crearNueva() {
        this.props.history.push("/admin/movie/new")
    }

    render() {
        const movies = this.state.movies;
        let body;
        console.log(movies);
        if (movies) {
            body = <div>
                <button onClick={this.crearNueva}>Crear nueva</button>
                <InfiniteScroll loader={<h1>Loading...</h1>} dataLength={movies.length}>
                    {
                        this.state.movies.map((element) => {
                            return <div className={style.main} key={element.movieId}>
                                <img src={element.moviePoster} alt={"poster"}/>
                                <div>
                                    <div>
                                        <h2>{element.movieName}</h2>
                                        <p>{element.movieDescription}</p>
                                    </div>
                                    {element.state ?
                                        <button onClick={() => this.desactivar(element)}>Activar</button> :
                                        <button onClick={() => this.activar(element)}>Desactivar</button>}
                                </div>
                            </div>
                        })
                    }
                </InfiniteScroll>
            </div>
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

export default withRouter(MovieViewAdmin);