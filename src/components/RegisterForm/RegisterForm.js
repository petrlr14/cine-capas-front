import React, {Component} from 'react';
import {apiInstance} from "../../conf/axios/axios-instances";
import Swal from "sweetalert2";
import {withRouter} from "react-router-dom";
import {redirectToLogin} from "../../utils/RedirectToLogin";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            states: [],
            provinces: [],
            enableStates: false,
            enableProvince: false,
            form: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                birthday: '',
                address: '',
                country: '',
                state: '',
                province: ''
            }
        };
        this.onChangeValues = this.onChangeValues.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCountryChangeHandler = this.onCountryChangeHandler.bind(this);
        this.onStateChangeHandler = this.onStateChangeHandler.bind(this);
    }

    componentDidMount() {
        apiInstance.get("/country/").then(({data}) => {
            this.setState({
                ...this.state,
                countries: data
            })
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const {form} = this.state;
        const errors = [];
        Object.keys(form).forEach((arg) => {
            if (form[arg] === "") {
                errors.push(arg);
            }
        });
        if (errors.length > 0) {
            Swal.fire({
                title: "Campo vacio",
                text: `Los campos ${errors.join(", ")} estan vacios`
            })
        } else {
            apiInstance.get("/auth/check", {
                params: {
                    username: form['username'],
                    password: form['password']
                }
            }).then(({data}) => {
                if (Object.keys(data).length > 0) {
                    Swal.fire({
                        title: "Credenciales en uso",
                        text: "La combinacion de usuario y contraseña ya esta en uso"
                    })
                } else {
                    apiInstance.post("/auth/register", {
                        ...form,
                    }).then(({data})=>{
                        Swal.fire({
                            title:"Registro exito",
                            text:"En breve un administrador de cine brrr habilitara tu cuenta"
                        }).then(({value})=>{
                            console.log(value);
                            this.props.history.push("login")
                            /*if(value){
                                redirectToLogin(this.props);
                            }*/
                        })
                    }, ({response})=>{
                        console.log(response);
                    })
                }
            })
        }


    }


    onCountryChangeHandler({target}) {
        const value = target.value;
        apiInstance.get("/state/", {
            params: {
                id: value
            }
        }).then(({data}) => {
            this.setState({
                ...this.state,
                states: data,
                enableStates: true
            })
        });

        this.setState({
            ...this.state,
            states: [],
            provinces: [],
            enableStates: false,
            enableProvince: false
        })

    }

    onStateChangeHandler({target}) {
        const value = target.value;
        apiInstance.get("/province/", {
            params: {
                ak: value
            }
        }).then(({data}) => {
            this.setState({
                ...this.state,
                provinces: data,
                enableProvince: true
            })
        });
    }

    onChangeValues(e) {
        const {form} = this.state;
        if (e.target.name === "country") {
            this.onCountryChangeHandler(e);
        }
        if (e.target.name === "state") {
            this.onStateChangeHandler(e);
        }
        form[e.target.name] = e.target.value;
        this.setState({
            ...this.state,
            form
        })
    }

    render() {
        return <form onSubmit={this.onSubmitHandler} >
            <input type={"text"} placeholder={"First name"} name={"firstName"} onChange={this.onChangeValues}/>
            <input type={"text"} placeholder={"Last name"} name={"lastName"} onChange={this.onChangeValues}/>
            <input type={"text"} placeholder={"Username"} name={"username"} onChange={this.onChangeValues}/>
            <input type={"password"} placeholder={"Password"} name={"password"} onChange={this.onChangeValues}/>
            <input type={"date"} name={"birthday"} onChange={this.onChangeValues}/>
            <select defaultValue={"---"} onChange={this.onCountryChangeHandler} name={"country"}
                    onChange={this.onChangeValues}>
                <option disabled={true} value={"---"}>Selecciona un pais</option>
                {this.state.countries.map((element => {
                    return <option value={element.countryAk} key={element.countryAk}>{element.countryName}</option>
                }))}
            </select>
            <select defaultValue={"---"} disabled={!this.state.enableStates} onChange={this.onStateChangeHandler}
                    name={"state"}
                    onChange={this.onChangeValues}>
                <option disabled={true} value={"---"}>Selecciona un departamento</option>
                {this.state.states.map((element => {
                    return <option value={element.ak} key={element.ak}>{element.name}</option>
                }))}
            </select>
            <select defaultValue={"---"} disabled={!this.state.enableProvince} name={"province"}
                    onChange={this.onChangeValues}>
                <option disabled={true} value={"---"}>Selecciona un municipio</option>
                {this.state.provinces.map((element => {
                    return <option value={element.ak} key={element.ak}>{element.name}</option>
                }))}
            </select>
            <input type={"text"} placeholder={"direccion"} name={"address"} onChange={this.onChangeValues}/>
            <button type={"submit"}>Guardar</button>
        </form>;
    }
}

export default withRouter(RegisterForm);