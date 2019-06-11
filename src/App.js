import React from 'react';
import './App.css';
import {image_server_instance} from "./conf/axios/axios-instances";

class App extends React.Component {

    clickHandler = () => {
        const file = document.querySelector('input[type=file]');
        const data = new FormData();
        data.append("file", file.files[0]);

        image_server_instance.post("/", data)
            .then(response=>{
                console.log(response);
            })
    };

    render() {
        return (
            <>
                <input type={"file"} formEncType={"multipart/form-data"} name={"file"}/>
                <button onClick={this.clickHandler}>Send</button>
            </>
        );
    }

}

export default App;
