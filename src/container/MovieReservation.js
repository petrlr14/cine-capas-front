import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {apiInstance} from "../conf/axios/axios-instances";
import InfiniteScroll from "react-infinite-scroll-component";
import {redirectToLogin} from "../utils/RedirectToLogin";
import {loader as Loader} from "../components/Loader/Loader";

class MovieReservation extends Component {
    constructor(props) {
        super(props);
        redirectToLogin(props);
        this.state = {
            data: [],
            loading: true,
            movie: {}
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    async componentDidMount() {
        const header = `Bearer ${localStorage.getItem("token")}`;
        let movie = this.props.location.state.movie;
        const {data} = await apiInstance.get("function/movieId", {
            headers: {
                Authorization: header
            },
            params: {
                id: this.props.location.state.movie.movieId
            }
        });
        this.setState({
            ...this.state,
            data,
            movie,
            loading: false
        });
    }

    clickHandler(index) {
        console.log(this.state.movie, this.state.data[1]);
        this.props.history.push("/client/movie/checkout", {
            movie: this.state.movie,
            data: this.state.data[index]
        })
    }

    render() {
        const body = !this.state.loading ?
            <InfiniteScroll loader={<Loader/>} dataLength={this.state.data.length}>
                {this.state.data.map((element, index) => {
                    console.log(element);
                    return <div key={element.functionId} onClick={() => this.clickHandler(index)}>
                        {element.format && <div style={{display:"flex"}}>
                            <span>{element.format}</span>
                            <span>{element.schedule}</span>
                            <span>{`Sala ${element.loungeId}`}</span>
                        </div>}</div>
                })}
            </InfiniteScroll> : <Loader/>;
        return <div style={{display: "grid", gridTemplateColumns: "30% 70%"}}>
            <img src={this.props.location.state.movie.moviePoster} alt={"poster"}/>
            {body}
        </div>
    }
}

export default withRouter(MovieReservation);