import React from 'react';
import "./Movie.module.css";
import style from "./Movie.module.css";


export const movie = (props) => {
    return (
        <div className={style.wrapper} onClick={e=>{
                 props.click(props.data.movieId);
             }}>
            <div className={style.poster} style={{backgroundImage:`url(${props.data.moviePoster})`}}>
                <span>{props.data.movieName}</span>
            </div>
        </div>

    );
};