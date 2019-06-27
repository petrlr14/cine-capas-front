import axios from "axios";

export const imageServerInstance = axios.create({
    baseURL: "https://br-image-server-api.herokuapp.com/"
});

export const apiInstance=axios.create({
    baseURL: process.env.REACT_APP_API_URL||'http://localhost:8080/'
});