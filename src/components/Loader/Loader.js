import React from 'react';
import "./Loader.module.css";
import style from "./Loader.module.css";

export const loader = (props) => {
    return (
        <div className={style.showbox}>
            <div className={style.loader}>
                <svg className={style.circular} viewBox="25 25 50 50">
                    <circle className={style.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2"
                            strokeMiterlimit="10"/>
                </svg>
            </div>
        </div>
    );
};