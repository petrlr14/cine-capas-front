import React, {Component} from 'react';
import {apiInstance} from "../conf/axios/axios-instances";
import {withRouter} from "react-router-dom";
class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            loading:true
        };
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser(){
        const {data}= await apiInstance.get("admin/user/")
        this.setState({
            ...this.state,
            data,
            loading:false
        })
    }


    render() {
        const body=this.state.loading?<div>Loading...</div>:<div>holaaa</div>
        return <div>
            Holaaasx2
        </div>;
    }
}

export default withRouter(UserView);