import React, { Fragment } from 'react';
import '../../../resources/css/additions.css';
import NavCard from '../../../reComponents/navCard';




export default function NavLogic({whoEnter}) {

    const showNav = ()=> {
        let navTemplate = null;
        switch (whoEnter) {
            case 'boss':
                navTemplate = (
                    <Fragment>
                        <NavCard
                            buttonName = "Add Assistant"
                            destnation = "/addAssistantForm"
                            icon = "fa-user"

                        />
    
                        <NavCard
                            buttonName = "Add Student"
                            destnation = "/addStudentForm"
                            icon = "fa-user"
                        />
    
                        <NavCard
                            buttonName = "Add Center"
                            destnation = "/addCenterForm"
                            icon = "fa-university"
                        />
    
                        <NavCard
                            buttonName = "Add Group"
                            destnation = "/addGroupForm"
                            icon = "fa-users"
                            
                        />
    
                    </Fragment>
                )
                break;
    
                case 'assistant' : 
    
                    navTemplate = (
                        <Fragment>
                            <NavCard
                                buttonName = "Add student"
                                destnation = "/addStudentForm"
                                icon = "fa-user"
                            />
    
                            <NavCard
                                buttonName = "Add Center"
                                destnation = "/addCenterForm"
                                icon = "fa-university"
                            />
    
                            <NavCard
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
