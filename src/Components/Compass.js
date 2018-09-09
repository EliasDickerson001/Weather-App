import React from 'react';
// Compass image ratio is .8223 (W/H)
import CompassImg from "../Assets/compass.png"
// Arrow image ratio is 1 (W/H)
import ArrowImg from "../Assets/arrow.png"
export const Compass = (props) => {
    let compassWidth = `${props.width}px`;
    let compassHeight = `${props.height}px`;
    //Arrow height should be .7777777 of compass height, width .9333333333
    let arrowWidth = `${Math.round((props.width*.9333))}px`;
    let arrowHeight = `${Math.round((props.height*.7777))}px`;
    let arrowDegree = props.degree ? `${props.degree}deg` : `0deg`;
    return (
        <div>
            <img src={CompassImg} alt="Compass" style={{width:compassWidth, height:compassHeight}}/>
            <img src={ArrowImg} alt="Arrow" style={{width:arrowWidth, height:arrowHeight, position:"absolute", transform:`translate(-103%,27%) rotate(${arrowDegree})`}}/>
        </div>
    )
}
//TO DO: set propTypes of compass dimensions