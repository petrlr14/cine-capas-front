import React from 'react';

const style={
    textAlign:"center"
};

export const sideNavbarAdmin = (props) => {
    return (
        <div style={style}>
            <span onClick={props.films}><i className="fas fa-film"/></span>
            <span onClick={props.users}><i className="fas fa-users"/></span>
        </div>
    );
};