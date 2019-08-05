import React , {Component} from 'react';
import './css/additions.css';
import {boss_nav,assistant_nav,whatElementFireTheEvent,addAssistantForm,addCenterForm} from './additions_helpers';


class Additions extends Component {
    state = {
        whoEnter : 'boss', // boss , assistant  , student 
        active : 'assistant'
    }
  
    switchActive = (e) => {   
        switch (whatElementFireTheEvent(e)) {
            case 'student_li':
                this.setState({active : 'student'})
                break;
            case 'assistant_li':
                this.setState({active : 'assistant'})
                break;
            case 'session_li':
                this.setState({active : 'session'})
                break;
            case 'center_li':
                this.setState({active : 'center'})
                break;
            default:
                break;
        }
    }
    sendWhichForm = ({active}) => {

        switch (active) {
            case 'student':
                break;
            case 'assistant':
                return addAssistantForm();
            case 'center':
                return addCenterForm();
            default:
                break;
        }
    }

    handleWhichNavToShow = () => {
        console.log('e')
        const {whoEnter,active} = this.state ;
        switch (whoEnter) {
            case 'boss':
                 return boss_nav(active);
            case 'assistant':
                 return assistant_nav(active);
            default:
                break;
        }
    }
    render () {
        return (
            <div className="Additions">
                <ul className="Additions-cards" onClick={this.switchActive}>
                    {this.handleWhichNavToShow()}
                </ul> 
                <div>
                        {this.sendWhichForm(this.state)}                  

                </div>
            </div>
        )
    }
}


export default Additions ; 

