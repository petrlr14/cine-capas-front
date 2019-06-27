import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {apiInstance} from "../conf/axios/axios-instances";
import InfiniteScroll from "react-infinite-scroll-component";
import {redirectToLogin} from "../utils/RedirectToLogin";

class MovieReservation extends Component {
    constructor(props) {
        super(props);
        redirectToLogin(props);
        this.state = {
            data: [],
            len:-1,
            movie:{}
        };
        this.clickHandler=this.clickHandler.bind(this);
    }

    componentDidMount() {
        const header = `Bearer ${localStorage.getItem("token")}`;
        const movieId = this.props.location.state.id;
        let movie;
        apiInstance.get("movie/one", {
            headers: {
                Authorization: header
            },
            params: {
                id: movieId
            }
        }).then(({data}) => {
            movie = data;
            this.setState({
                ...this.state,
                movie
            })
        }, ({response}) => {
            console.log(response);
        });
        this.getData(header);
    }

    async getData(header){
        const {data}= await apiInstance.get("function/movieId", {
            headers: {
                Authorization: header
            },
            params: {
                id: this.props.location.state.id
            }
        });
        this.setState({
            ...this.state,
            len:data.length
        });
        const body=[];
        data.forEach((element, index)=>{
            this.getAllAttr(element, header, body, index);
        });

    }

    async getAllAttr(element, header, body, index){
        let format=await apiInstance.get("format/one", {
            headers: {
                Authorization: header
            },
            params: {
                id: element.formatId
            }
        });
        format=format.data;
        let schedule=await apiInstance.get("schedule/id", {
            headers: {
                Authorization: header
            },
            params: {
                id: element.scheduleId
            }
        });
        schedule=schedule.data;
        let lounge=await apiInstance.get("lounge/one", {
            headers: {
                Authorization: header
            },
            params: {
                id: element.loungeId
            }
        });
        lounge=lounge.data;
        body.push({id:element.functionId, seats:element.seats});
        body[index]={
            ...body[index],
            format,
            schedule,
            lounge
        };
        this.setState({
            ...this.state,
            data:body
        });
    }

    clickHandler(index){
        console.log(this.state.movie, this.state.data[1]);
        this.props.history.push("/movie/checkout", {
            movie:this.state.movie,
            data:this.state.data[index]
        })
    }

    render() {
        const body=this.state.data.length===this.state.len?<InfiniteScroll loader={<h1>Loading...</h1>} dataLength={this.state.data.length}>
            {this.state.data.map((element, index)=>{
                return <div key={element.id} onClick={()=>this.clickHandler(index)}>{element.format.formatAk&&<>
                    <span>{element.format.formatAk}</span><br/>
                    <span>{element.schedule.schedule}</span><br/>
                    <span>{`Sala ${element.lounge.loungeId}`}</span>
                    <img src={this.state.movie.moviePoster} alt={"poster"}/>
                </>}</div>
            })}
        </InfiniteScroll>:<div>Loading...</div>;
        return body;
    }
}

export default withRouter(MovieReservation);