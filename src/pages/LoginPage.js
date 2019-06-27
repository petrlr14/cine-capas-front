import React from 'react';
import LoginForm from "../components/LoginForm/LoginForm";
import {Footer} from "../components/Footer/Footer";

const style={
    minHeight:'100%'
};

export const LoginPage = ()=>{
    return <>
        <main style={style}>
            <LoginForm/>
        </main>
        <Footer/>
    </>
};