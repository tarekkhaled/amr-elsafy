import React, { Fragment } from 'react';
import '../resources/css/navbar.css';

export default function NavButton({name,linkTO,withLink,withIcon,icon,newTab,style,tableNav,onChange ,id}) {
    
    return (
        <Fragment>
            {
                (!tableNav) ?
                     withLink ? <a  style={{...style}} className ="Nav-button" href={linkTO} target = {newTab ? '_blank' : null} >  {name ? name : <i className = {icon} />} </a>:
                <button className="Nav-button" style ={{...style}}> 
                        {name ? name :  <i className = {icon} />}
                    <i className ={withIcon ?icon + " Nav-button-icon"  : null} />
                </button>   :  
                    withLink ? <a  style={{...style}} className ="Table-button" href={linkTO} target = {newTab ? '_blank' : null} > {name ? name :  <i className = {icon} />} </a>:
                <button id ={id} onClick = {(e) => {onChange(e.target.id)}}className="Table-button" style ={{...style}}> 
                    {name ? name :  <i className = {icon} />}
                    <i className ={withIcon ?icon + " Nav-button-icon"  : null} />
                </button>
            }
        </Fragment>
    )
}
