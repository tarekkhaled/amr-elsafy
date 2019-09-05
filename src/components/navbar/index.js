import React , {Component, Fragment} from 'react' ; 
import Logo from '../../resources/img/logo.png';
import '../../resources/css/navbar.css';
import NavButton from '../../reComponents/navButton';
class Navbar extends Component {
    state = {
        searchValue : '',
        browserWidth : window.innerWidth,
        openDrawer : false 
      
    }
    /* khaled remove this w 7ot al props de mn al parent aly hyab2 feh al navbar */
    static defaultProps = {
        NavData : {
            navButton1 : {
                withLink : true,
                name : "Additions",
                linkTO : "/additions",
                newTab : false,
                withIcon : false,
                showForAll : true,
            },
            navButton2 : {
                withLink : true,
                name : "QR Gen",
                linkTO : "https://www.the-qrcode-generator.com/?fbclid=IwAR0Zy_S4QOzJRItQWLjsje67O6tLNrutW0_JZonGSqS5fcJs6MWGR7GmI_A",
                newTab : true,
                withIcon : false,
                showForAll : true
    
            },
            navButton3 : {
                withLink : true,
                name : "Assistants",
                linkTO : "/Assistants",
                newTab : false,
                withIcon : false,
                showForAll : false
    
            },
            navButton4 : {
                withLink : true,
                name : "Attendence",
                linkTO : "/Attendence",
                newTab : false,
                withIcon : false,
                showForAll : true
    
            },
            navButton5 : {
                withLink : true,
                name : "Students",
                linkTO : "/students",
                newTab : false,
                withIcon : false,
                showForAll : true
            },
            navButton6 : {
                withLink : false,
                name : "tarek",
                withIcon : true,
                icon : 'fas fa-angle-down', 
                dropdowns : true,
                showForAll : true
            },

        },
        profileName : 'tarek',
        whoEnter : 'boss'
    }

    updateSearchBox = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    showNavForLargeScreen = (navObject)  => {
        return <Fragment>
             <a className="Nav-logo" href="/">
                    <img alt = "logo_mr_amrElsafiy" src={Logo}/>
                </a>
                <div className="Nav-right-links">
                    {
                        this.renderPropNavButtonsForLargeScreen(navObject)
                    }
                </div>
                <div className="Nav-search-box">
                    <i className="fa fa-search Search-icon"/>
                    <input name="searchValue" onChange={this.updateSearchBox} className="Search-input" type="text" placeholder="Search..."/>
                </div>
        </Fragment>
    }

    renderPropNavButtonsForLargeScreen = (propsObject) => {
        const NavArrays = []
        for(let key in propsObject) {
            if(propsObject[key]['showForAll'])
            {
                NavArrays.push ( <div className="Nav-field" key ={key}>
                        <NavButton
                        {...propsObject[key]}
                    />
                    {
                        (propsObject[key]['dropdowns'] && propsObject[key]['dropdowns']=== true) ?  
                        <div className="dropdowns">
                            <NavButton
                                withLink={true}
                                destnation="/profile"
                                name="Profile"
                            />
                            <NavButton
                                name="Logout"
                            />

                        </div> : null
                    }
             </div>
            )

            }
        }
        return NavArrays;
    }

    renderPropNavButtonsForSmallScreen = (propsObject) => {
        const NavArrays = []
        for(let key in propsObject) {
            propsObject[key]['style'] =  {
                width : '100%',
                justifyContent : 'end'
             }
            if(propsObject[key]['showForAll'])
            {
                NavArrays.push ( <div className="Nav-field-small" key ={key}>
                        <NavButton
                        {...propsObject[key]}
                    />
                    {
                        (propsObject[key]['dropdowns'] && propsObject[key]['dropdowns']=== true) ?  
                        <div className="dropdowns">
                            <NavButton
                                withLink={true}
                                destnation="/profile"
                                name="Profile"
                            />
                            <NavButton
                                name="Logout"
                            />

                        </div> : null
                    }
             </div>
            )

            }
        }
        return NavArrays;
    }

    showNavForSmallScreen = (NavData) => {
        return <Fragment>
                <a className="Nav-logo" href="/">
                    <img alt = "logo_mr_amrElsafiy" src={Logo}/>
                </a>

                <div className="Nav-menu" onClick = {this.openDrawer}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>

                
                {this.state.openDrawer ? <div className="drawer">
                    <div className="Nav-search-box-small">
                            <i className="fa fa-search Search-icon"/>
                            <input name="searchValue" onChange={this.updateSearchBox} className="Search-input" type="text" placeholder="Search..."/>
                    </div>
                    {this.renderPropNavButtonsForSmallScreen(NavData)} 
                    </div> : null}
        
             </Fragment>
    }

    openDrawer = (e) => {

        this.setState({
            openDrawer : !this.state.openDrawer
        })
        
    }
    updateBrowserWidth = () => {
        this.setState({
            browserWidth : window.innerWidth
        })
    }

    render() {
        const {NavData} = this.props;
        window.addEventListener('resize', this.updateBrowserWidth);
        return (
            <nav className="Navbar">
               {this.state.browserWidth > 1020  ? this.showNavForLargeScreen(NavData) : this.showNavForSmallScreen(NavData)}
            </nav>
        )
    }
}

export default Navbar; 