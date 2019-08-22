import React from 'react';
import '../resources/css/additions.css';
import '../resources/css/responsive.css';
import {Link} from 'react-router-dom';

export default function NavButton({destnation,buttonName,icon}) {
    return (
       <Link className = 'Additions-link'to = {destnation} >
            <div className="Additions-card-box" >
                <div className = "Additions-card-top">
                    <i className={`fas ${icon} fa-2x`}/>
                </div>
                <div className="Additions-card-bottom">
                    <i className="fas fa-plus fa-1x"></i>
                    <p>{buttonName}</p>
                </div>
            </div>
       </Link>
    )
}
