import React, {Component} from 'react';
import Swal from "sweetalert2";

class CreateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            description:"",
            active:"",
            poster:""
        };
        this.submitHandler=this.submitHandler.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    submitHandler(e){
        const files = Array.from(e.target.files);

        const formData = new FormData();

        files.forEach((file, i) => {
            console.log(file);
            formData.append(i, file);
        })

    }

    onChange({target}){
        let value;
        if(target.name==="active"){
            value=target.checked;
        }else{
            value=target.value;
        }
        this.setState({
            ...this.state,
            [target.name]:value
        })
    }



    render() {
        console.log(this.state);
        return <form onSubmit={this.submitHandler}>
            <label> Nombre de la pelicula<input type={"text"} onChange={this.onChange} name={"name"}/></label>
            <label> Descripcion<input type={"text"} onChange={this.onChange} name={"description"}/></label>
            <label>Activo <input type={"checkbox"} onChange={this.onChange} name={"active"}/></label>
            <label>Poster <input type={"file"} onChange={this.onChange} name={"poster"} required/></label>
            <button type={"submit"}>Guardar</button>
        </form>;
    }
}

export default CreateMovie