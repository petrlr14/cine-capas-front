import React from 'react';
import {withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import {apiInstance} from "../../conf/axios/axios-instances";

class MovieCheckout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            data: {},
            seats: 1,
            willPaid: false,
            saldo: 0

        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const movie = this.props.location.state.movie;
        const data = this.props.location.state.data;
        this.setState({
            ...this.state,
            movie,
            data,
        });
    }

    onChangeHandler(event) {
        const value = event.target.name === "willPaid" ? event.target.checked : event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.resume(this.state)
    }

    resume(state) {
        const user = JSON.parse(localStorage.getItem("user"));
        const seats = state.seats;
        const subtotal = state.data.price * (seats ? seats : 1);
        const saldoRemanente = user.balance - state.saldo;
        const grandTotal = subtotal - state.saldo;
        Swal.fire({
            title: "Resumen",
            showConfirmButton:true,
            confirmButtonText:"Comprar",
            showCancelButton:true,
            html: `<div>
                    <h3>${state.movie.movieName}</h3> <br>
                    <h4>Horario: ${state.data.schedule}</h4>
                    <h4>Cantidad de asientos: ${state.seats}</h4>
                    <h4>Subtotal: $${subtotal}</h4>
                    <h4>Saldo a utilizar de la cuenta: $${state.saldo}</h4>
                    <h4>Saldo remanente: $${saldoRemanente}</h4>
                    <h4>Gran total: $${grandTotal}</h4>
                   </div>`
        }).then(({value})=>{
            if(value){
                Swal.fire({
                    title:"Procesando",
                    text:"Estamos procesando su compra"
                });
                apiInstance.post("reservation/save", {
                    movieId: this.state.movie.movieId,
                    scheduleAk: this.state.data.schedule,
                    movieFormatAk: this.state.data.format,
                    seats,
                    subtotal,
                    saldoRemanente,
                    grandTotal
                }, {
                    params:{
                        id:user.userId
                    }
                }).then((response)=>{
                    console.log(response);
                    Swal.fire({
                        title:"Compra realizada",
                        type:"success"
                    }).then(({data})=>{
                        localStorage.setItem("user", data);
                        this.props.history.push("/movie");
                    })
                }, ()=>{
                    Swal.fire({
                        title:"Error",
                        text:"Ocurrio un error inesperado",
                        type:"error"
                    })
                })
            }
        })
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        const body = Object.keys(this.state.movie).length > 0 && Object.keys(this.state.data).length > 0 ? <div>
            <span>{this.state.data.format}</span>
            <span>{`Sala ${this.state.data.loungeId}`}</span>
            <span>{`Asientos disponibles: ${this.state.data.seats}`}</span>
            <img src={this.state.movie.moviePoster} alt={"poster"}/>
            <form onSubmit={this.onSubmitHandler}>
                <label>
                    Cantidad de asientos
                    <input type={"number"} name={"seats"} value={this.state.seats} onChange={this.onChangeHandler}
                           min={1}/>
                </label>
                <label><input name={"willPaid"} type={"checkbox"} onChange={this.onChangeHandler}/>Desea
                    utilizar su saldo para hacer el pago?</label>
                <label>Saldo a usar <input type={"number"} name={"saldo"} disabled={!this.state.willPaid} min={0}
                                           max={user.balance}
                                           placeholder={"saldo a usar"} onChange={this.onChangeHandler}/></label>
                <button type={"submit"}>Comprar</button>
            </form>
        </div> : <div>Loading...</div>;
        return body;
    }

}

export default withRouter(MovieCheckout);