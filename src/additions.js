import React , {Component} from 'react';
import './css/additions.css';
import {
    boss_nav,
    assistant_nav,
    whatElementFireTheEvent,
    addAssistantForm,
    addCenterForm,
    addSessionForm,
    addStudentForm
} from './additions_helpers';


class Additions extends Component {
    state = {
        whoEnter : 'boss', // boss , assistant  , student  // will change form database
        active : 'assistant' ,
        centers : ['سنتر الحجاز' , 'سنتر دار الحكمة' , 'سنتر روكسي' , 'سنتر باك'], // will come from database
        days : ['السبت','الحد','الاتنين','التلات','الاربعاء','الخميس','الجمعة'],
        timeStart : ['1:00PM', '3:00PM' , '5:00PM' , '7:00PM' , '9:00PM'],
        timeEnd : ['2:30PM', '4:30PM' , '6:30PM' , '8:30PM' , '10:30PM'],
        sessions : ['السبت من 1:00 لي 2:30','الاربعاء من 5:00 لي 6:30','السبت من 9:00 لي 10:30']

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
        const {centers,days,timeStart,timeEnd,sessions} = this.state
        switch (active) {
            case 'student':
                return addStudentForm(centers,sessions);
            case 'assistant':
                return addAssistantForm();
            case 'center':
                return addCenterForm();
            case 'session':
                return addSessionForm(centers,days,timeStart,timeEnd);
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

