import React from 'react';
import {movie as Movie} from "../Movie/Movie";

const style={
    display:'grid',
    gridTemplateColumns: '33% 33% 33%',
    gridRowGap:'4em'
};


export const movieHolderAdmin = (props) => {
    return (
        <div style={style}>
            {props.data.map((element, index)=>{
                return <Movie data={element} key={index} click={props.handler}/>
            })}
        </div>
    );
};