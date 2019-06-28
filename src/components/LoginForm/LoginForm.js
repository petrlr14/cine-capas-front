import React, {Component} from 'react';
import {apiInstance} from "../../conf/axios/axios-instances";
import style from "./LoginForm.module.css";
import {withRouter} from "react-router-dom";
import Swal from "sweetalert2";


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            form: {
                username: "",
                password: "",
            },
            disable: true
        };
        this.loginHandler = this.loginHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem("token")) {
            this.props.history.push("/movie");
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
                this.props.history.push(data.user.rolId.rolAk==="ADM"?"/admin":"/");
            }, ({response}) => {
                if (response.data.status !== 500) {
                    Swal.fire({
                        title: response.data.header,
                        text: response.data.msg,
                        type: "warning"
                    });
                } else {
                    Swal.fire({
                        title: "Error inesperado",
                        text: "Ha acurrido un error con nuestro servidor, vuelve a intentarlo mas tarde",
                        type: "warning"
                    });
                }

            })

        }

    }

    onChangeHandler({target}) {
        const {form} = this.state;
        form[target.name] = target.value;
        let bool=true;
        console.log(form["username"]!=="");
        if(form["username"]!=="" && form["password"]!==""){
            bool=false
        }
        this.setState({
            ...this.state,
            ...form,
            disable:bool
        });
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
                        <input type="text" id="username" placeholder="Username" name={"username"}
                               onChange={this.onChangeHandler}/>
                        <input type="password" id="password" placeholder="Password" name={"password"}
                               onChange={this.onChangeHandler}/>
                        <button id="validate" onClick={this.loginHandler} disabled={this.state.disable}>Login</button>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(LoginForm);