import React from 'react';

const style={
    textAlign:"center"
};

export const sideNavbarClient = (props) => {
    return (
        <div style={style}>
            <span onClick={props.films}><i className="fas fa-film"/></span>
            <span  onClick={props.historia}><i className="fas fa-ticket-alt"/></span>
        </div>
    );
};