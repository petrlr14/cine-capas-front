import React from 'react';
import {NavBar} from "../components/Navbar/Navbar";
import {Footer} from "../components/Footer/Footer";
import './Layout.module.css';

export const layout = (props) => {
    return (
        <>
            <header>
                <NavBar/>
            </header>
            <main>
                {props.children}
            </main>
            <Footer/>
        </>
    );
};