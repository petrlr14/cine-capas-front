import React from 'react';
import {withRouter} from "react-router-dom";

class MovieCheckout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            data: {},
            seats: 1,
            willPaid: false,
            saldo:0

        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const movie = this.props.location.state.movie;
        const data = this.props.location.state.data;
        console.log(data);
        this.setState({
            ...this.state,
            movie,
            data,
        });
    }

    onChangeHandler(event) {
        console.log(event.target.value);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    onSubmitHandler(event){
        event.preventDefault();
        this.resume(this.state)
    }

    resume(state){
        const user=localStorage.getItem("user");
        const data=state.data;
        const seats=state.seats;
        const subtotal=state.data.format.price*seats;
        const {balance}=JSON.parse(user);
        const saldoRemanente=balance-subtotal;
        const grandTotal=subtotal-state.saldo;
        console.log(data, seats, subtotal, balance, saldoRemanente, grandTotal);
    }

    render() {
        const body = Object.keys(this.state.movie).length > 0 && Object.keys(this.state.data).length > 0 ? <div>
            <span>{this.state.data.format.formatAk}</span>
            <span>{`Sala ${this.state.data.lounge.loungeId}`}</span>
            <span>{`Asientos disponibles:${this.state.data.seats}`}</span>
            <img src={this.state.movie.moviePoster} alt={"poster"}/>
            <form onSubmit={this.onSubmitHandler}>
                <label>
                    Cantidad de asientos
                    <input type={"number"} name={"seats"} value={this.state.seats} onChange={this.onChangeHandler} min={1}/>
                </label>
                <label><input name={"pago"} value={this.state.pago} type={"checkbox"} onChange={this.onChangeHandler}/>Desea
                    utilizar su saldo para hacer el pago?</label>
                <input type={"number"} disabled={!this.state.willPaid} value={this.state.saldo}/>
                <button type={"submit"}>Comprar</button>
            </form>
        </div> : <div>Loading...</div>;
        return body;
    }

}

export default withRouter(MovieCheckout);