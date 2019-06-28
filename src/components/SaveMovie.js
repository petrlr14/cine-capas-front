import React, {Component} from 'react';

class SaveMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <form>
            <label> Nombre de la pelicula<input type={"text"} /></label>
            <label> Descripcion<input type={"text"} /></label>
            <label>Activo <input type={"checkbox"} /></label>
            <label>Poster <input type={"file"}/></label>
        </form>;
    }
}

export default SaveMovie