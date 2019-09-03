import React, { Fragment } from 'react';
import '../resources/css/navbar.css';

export default function NavButton({name,linkTO,withLink,withIcon,icon,newTab,style}) {
    
    return (
        <Fragment>
            {
                withLink ? <a  style={{...style}} className ="Nav-button" href={linkTO} target = {newTab ? '_blank' : null} > {name} </a>:
                <button className="Nav-button" style ={{...style}}> 
                    {name}
                    <i className ={withIcon ?icon + " Nav-button-icon"  : null} />
                </button>
            }
        </Fragment>
    )
}
