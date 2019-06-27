import React, {Component} from 'react';
import {apiInstance} from "../../conf/axios/axios-instances";
import style from "./LoginForm.module.css";
import {withRouter} from "react-router-dom";

const $ = window.$;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: ""
        };
        this.loginHandler = this.loginHandler.bind(this);
    }

    componentWillMount() {
        if(localStorage.getItem("token")){
            this.props.history.push("/");
        }
    }

    loginHandler() {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        if (username === "" || password === "") {

        } else {
            apiInstance.post("auth/login", {
                "username": username,
                "password": password
            }).then(({data}) => {
                console.log(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                const {balance}=data;
                console.log(balance);
                this.props.history.push("/");
            }, error => {
                this.setState({
                    ...this.state,
                    msg:error.response.data.msg
                });
                $("#error-container").show("slow").fadeTo(2000, 500).slideUp(500, function() {
                    $("#error-container").slideUp(500);
                });
            })

        }

    }

    render() {
        return (
            <>
                <div className={`${style.wrapper} ${style.fadeInDown}`}>
                    <div id="formContent">
                        <div className="fadeIn first">
                            <div className={style.icon}>
                                <div className={style.decolor}><span>Cine brrr</span></div>
                            </div>
                        </div>
                        <input type="text" id="username" placeholder="Username"/>
                        <input type="password" id="password" placeholder="Password"/>
                        <button id="validate" onClick={this.loginHandler}>Login</button>
                    </div>
                </div>

                <div
                    className={`alert alert-danger fixed-top`}
                    rol="alert" id="error-container">
                    {this.state.msg}
                </div>


            </>
        );
    }
}

export default withRouter(LoginForm);