import React , {Component} from 'react' ; 
import Logo from '../../resources/img/logo.png';
import '../../resources/css/navbar.css';

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