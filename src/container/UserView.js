import React, {Component} from 'react';
import {apiInstance} from "../conf/axios/axios-instances";
import {withRouter} from "react-router-dom";
import Swal from "sweetalert2";

const BadgetStyle = {
        backgroundColor: "#fa3e3e",
        borderRadius: "3em",
        color: "white",
        textAlign: "center",
        fontSize: 24,
        position: "absolute", /* Position the badge within the relatively positioned button */
        top: 0,
        width: 30,
        height: 30
    }
;

const buttonStyle = {
    color: "white",
    display: "inline-block",
    position: "relative",
    padding: "2px 5px",
    cursor: "pointer"
};

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
        this.activateUser = this.activateUser.bind(this);
        this.activeUser = this.activeUser.bind(this);
        this.desactivateUser = this.desactivateUser.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        const {data} = await apiInstance.get("admin/user/");
        console.log(data);
        this.setState({
            ...this.state,
            data,
            loading: false
        })
    }

    activateUser(user, index) {
        Swal.fire({
            title: "Activacion",
            text: `${user.username} creo una cuenta en Cine BRRRR,  debes verificarla para que pueda hacer uso del sistema`,
            type: "info",
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: "Negar",
            confirmButtonText: "Activar"
        }).then(({value, dismiss}) => {
            if (value) {
                this.activeUser(index, user)
            } else {
                if (dismiss.toString() !== "close") {
                    this.desactivateUser(index, user);
                }
            }
        }, (response) => {
            console.log(response);
        })
    }

    activeUser(index, user) {
        Swal.fire({
            title: "Cargando",
            text: "Esperando a que se complete la operacion",
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false
        });
        apiInstance.post("admin/activate", {}, {
            params: {
                id: user.userId
            }
        }).then(({data, status}) => {
            if (status === 200) {
                const obj = [...this.state.data];
                console.log(obj);
                obj[index] = data;
                this.setState({
                    ...this.state,
                    data: obj
                });
                Swal.fire({
                    title: "Finalizado",
                    text: "Operacion realizada con exito",
                    type: "success"
                });
            }

        }, ({response}) => {
            console.log(response);
        })
    }

    desactivateUser(index, user) {
        Swal.fire({
            title: "Bloquear Usuario",
            text: `Deseas bloquear a ${user.username}?`,
            showCancelButton: true,
            confirmButtonText: "Bloquear",
            cancelButtonText: "No"
        }).then(({value}) => {
            if (value) {
                Swal.fire({
                    title: "Razon del bloqueo",
                    text: `Debes proporcionar una razon por la que bloqueas a ${user.username}`,
                    input: "textarea",
                    confirmButtonText: "Bloquear",
                    showCloseButton: true
                }).then(({value}) => {
                    Swal.fire({
                        title: "Cargando",
                        text: "Esperando a que se complete la operacion",
                        showConfirmButton: false,
                        showCancelButton: false,
                        showCloseButton: false
                    });
                    if (value) {
                        apiInstance.post("admin/deactivate", {}, {
                            params: {
                                id: user.userId,
                                cause: value
                            }
                        }).then(({data}) => {
                            const obj = [...this.state.data];
                            console.log(obj);
                            obj[index] = data;
                            this.setState({
                                ...this.state,
                                data: obj
                            });
                            Swal.fire({
                                title: "Finalizado",
                                text: "Operacion realizada con exito",
                                type: "success"
                            });
                        })
                    }
                })
            }
        })
    }


    render() {
        const body = this.state.loading ? <div>Loading...</div> : <div>
            {this.state.data.map((element, index) => {
                return <div key={element.userId}>
                    {!element.userState && !element.userBlockedState ? <div style={buttonStyle} onClick={() => {
                        this.activateUser(element, index)
                    }}>
                        <div style={BadgetStyle}>
                            !
                        </div>
                    </div> : null}
                    <h1>{element.username}</h1>
                    {element.userBlockedState ?
                        <button onClick={() => {
                            this.activeUser(index, element)
                        }}>Activar
                        </button> :
                        <button onClick={() => {
                            this.desactivateUser(index, element)
                        }}>Bloquear
                        </button>}
                </div>
            })}
        </div>;
        return <div>
            {body}
        </div>;
    }
}

export default withRouter(UserView);