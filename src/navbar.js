import React , {Component} from 'react' ; 
import Logo from './img/logo.png';
import './css/navbar.css';

class Navbar extends Component {

    render() {
        return (
            <nav className="Navbar">
                <img src={Logo} alt="logo.png"/>
            </nav>
        )
    }
}

export default Navbar; 