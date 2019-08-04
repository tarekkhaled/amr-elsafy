import React , {Component} from 'react';
import './css/additions.css';
import Form from './form' ; 
import {createInputField,boss_nav,assistant_nav} from './helpers';


class Additions extends Component {
    state = {
        whichForm : 'add_student',
        whoEnter : 'boss', // boss , assistant  , student 
        active : 'session'
    }
    sendWhichForm = () => {
        const {whichForm} = this.state;
        switch (whichForm) {
            case 'add_student':
                return <Form 
                    form =  'login'
                    input_field10 = {createInputField(': البريد الالكتروني','email','student_mail','... البريد الالكتروني','error_student_mail')}
                />              
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
                <ul className="Additions-cards">
    
                    {this.handleWhichNavToShow()}
                  
                </ul> 
            </div>
        )
    }
}


export default Additions ; 

