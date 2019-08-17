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
        whoEnter : 'boss', /*  khaled ::  this for handle what will shown for assistant and amr safiy 
        have 2 modes -> boss : amr safiy && assistant for assitsant */
        active : '',

        /* khaled :: the all below arrays will be removed i just make it for testing after you add all the functions from firebase you can safely delete it */
        centers : ['سنتر الحجاز' , 'سنتر دار الحكمة' , 'سنتر روكسي' , 'سنتر باك'], // will come from database
        days : ['السبت','الحد','الاتنين','التلات','الاربعاء','الخميس','الجمعة'],
        timeStart : ['1:00PM', '3:00PM' , '5:00PM' , '7:00PM' , '9:00PM'],
        timeEnd : ['2:30PM', '4:30PM' , '6:30PM' , '8:30PM' , '10:30PM'],
        sessions : ['السبت من 1:00 لي 2:30','الاربعاء من 5:00 لي 6:30','السبت من 9:00 لي 10:30']

    }

    componentDidMount() {
        /* khaled :: this will handle what will be shown in the first loading to the page 
            assistant : in case of the user is amr-eslafiy 
            student : in case of the user is assistant  */
        const {whoEnter} = this.state;
        this.setState({
            active : (whoEnter === 'boss') ? 'assistant' : 'student'
        })
    }
  
    /* Input :: event  */
    /* Place For calling the function :: onChange in any ul field in render function  (e) */
    /* This function just handle the what form is active right now and switch between them */

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

    /* Input :: acitve property from states  */
    /* Place For calling the function ::  render function () */
    /* This function responsible for render the form when it clicked  */

    sendWhichForm = ({active}) => {
        /* khaled :: here all the arrays called you can replace it directly in the arguments with the functions from firebase */
        const {centers,days,timeStart,timeEnd,sessions} = this.state
        switch (active) {
            case 'student':
                /* khaled :: replace centers,sessions in the arguments with functions and then remove the arrays from just for saving memory <3 */
                return addStudentForm(centers,sessions);
            case 'assistant':
                return addAssistantForm();
            case 'center':
                return addCenterForm();
            case 'session':
                /* khaled :: replace centers,days,timeStart,timeEnd in the arguments with functions*/
                return addSessionForm(centers,days,timeStart,timeEnd);
            default:
                break;
        }
    }

    /* Input :: acitve,whoEnter property from states  */
    /* Place For calling the function ::  render function () */
    /* This function responsible for render the specific forms for amr-elsafiy and assistant */

    handleWhichNavToShow = ({whoEnter,active}) => {
        /* khaled :: whoEnter property also here if you want to edit it or remove it just for no errors shown <3*/
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
                    {this.handleWhichNavToShow(this.state)}
                </ul> 
                <div>
                        {this.sendWhichForm(this.state)}                  

                </div>
            </div>
        )
    }
}


export default Additions ; 

