import React, { Fragment } from 'react';
import '../../../resources/css/additions.css';
import NavButton from '../../../reComponents/navButton';




export default function NavLogic({whoEnter}) {

    const showNav = ()=> {
        let navTemplate = null;
        switch (whoEnter) {
            case 'boss':
                navTemplate = (
                    <Fragment>
                        <NavButton
                            buttonName = "Add Assistant"
                            destnation = "/addAssistantForm"
                            icon = "fa-user"

                        />
    
                        <NavButton
                            buttonName = "Add Student"
                            destnation = "/addStudentForm"
                            icon = "fa-user"
                        />
    
                        <NavButton
                            buttonName = "Add Center"
                            destnation = "/addCenterForm"
                            icon = "fa-university"
                        />
    
                        <NavButton
                            buttonName = "AddGroup"
                            destnation = "/addGroupForm"
                            icon = "fa-users"
                            
                        />
    
                    </Fragment>
                )
                break;
    
                case 'assistant' : 
    
                    navTemplate = (
                        <Fragment>
                            <NavButton
                                buttonName = "Add student"
                                destnation = "/addStudentForm"
                                icon = "fa-user"
                            />
    
                            <NavButton
                                buttonName = "Add Center"
                                destnation = "/addCenterForm"
                                icon = "fa-university"
                            />
    
                            <NavButton
                                buttonName = "AddGroup"
                                destnation = "/addGroupForm"
                                icon = "fa-users"

                            />
    
                        </Fragment>
                    )

                break;
        
            default:
                navTemplate = null;
                break;
        }
        return navTemplate;
    }
    
    return (
            <Fragment>
                {showNav()} 
            </Fragment>
    )
}
