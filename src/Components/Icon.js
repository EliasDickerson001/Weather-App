import React from 'react';
export const Icon = (props) => {
    if (!(props.srcUrl)){
        return null;
    } else {
        return <img src={props.srcUrl} alt="Weather Icon"/>;
    }
}