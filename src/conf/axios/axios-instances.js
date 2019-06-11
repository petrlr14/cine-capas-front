import axios from "axios";

export const image_server_instance = axios.create({
    baseURL: "https://br-image-server-api.herokuapp.com/"
});