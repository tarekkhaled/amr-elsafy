import React , {Component} from 'react';
import {checkFromFireBase,failedRegister}from './helpers'
import validator from 'validator' ;
import './css/form.css';

function fakeFunction () {
    return 'login failed'
}


class Form extends Component {
    state = { 
        login : {
            student_mail : '',
            student_password : '',
            error_student_mail : null , // 1 :: means is empty , 2 :: means is not vaild
            error_student_password : null, // 1 :: means is empty 
            submitSucces : false
        }, 
    }

    handleChange =  (e) => {
        this.handleWhichForm(e);
    }

    /* Input :: event   || Which Props Depend :: form */
    /* Place For calling the function :: handleChange (e) */
    /* This Function will be handy When More than Form use This Component depend on the name of form the function for it will be calling */
    handleWhichForm= (e) => {
        const {form} = this.props ; 
        switch (form) {
            case 'login':
                    this.updateStudentForm(e);
                break;
        
            default:
                break;
        }
    }
    
    updateStudentFormINState = (e,prop,value,boolvalue) => {
        this.setState({
            login : {...this.state.login,[prop] : value ,'submitSucces' : boolvalue ,[e.target.name] : e.target.value}
        })
    }

    /* Input :: event  || Which Props Depend :: None */
    /* Place For calling the function :: handleWhichForm (e) */
    /* Depend on this.State (Object of "form Name coming from Props" and it's properties) */
    /* This Function handle client-server-errors and update every state for all inputs of the field when changed  */
    
    updateStudentForm = (e) => {
        const {login} = this.state; 
        console.log(e.target.name)
        switch (e.target.name) {
            case "student_mail":
                if(!e.target.value) 
                    this.updateStudentFormINState(e,'error_student_mail',"البريد الالكتروني مطلوب", false);
                else if(!validator.isEmail(e.target.value)) 
                    this.updateStudentFormINState(e,'error_student_mail','تاكد من البريد الالكتروني', false);
                else 
                    this.updateStudentFormINState(e,'error_student_mail','no', (login.error_student_password === 'no') ? true : false);
                break;
            case "student_password" : // empty string 
                if(!e.target.value) 
                    this.updateStudentFormINState(e,'error_student_password','كلمة السر مطلوبة', false);
                else 
                this.updateStudentFormINState(e,'error_student_password','no', (login.error_student_mail=== 'no') ? true : false);  
            break;
            default:
                break;
        }
    }
    
    /* Input :: event  || Which Props Depend :: All */
    /* Place For calling the function :: render () */
    /* Depend on States  */
    /* Need some refactor ES6*/
    /* This Function iterate over the all inputs "coming from props" and render it by order  */

    renderTheComingForm = (e)=>{
        const inputsToShown = []
        const input_value_part1 = this.props.form;
        
        for (let key in this.props) {
            if(`${key}`.includes('_field'))
            {
                console.log(this.props[key]);
                const inputvalue_part2 = this.props[key].input_name;
                const inputvalue_error = this.props[key].error
                inputsToShown.push(
   
                    <div className="Form-field" key={this.props[key].label_name}>
                        <input className="Form-input" value = {this.state[input_value_part1][inputvalue_part2]}  id={this.props[key].input_name} onChange={this.handleChange} type={this.props[key].type} placeholder={`${this.props[key].placeholder}`} name={this.props[key].input_name} />
                        <label className="Form-label" htmlFor={this.props[key].input_name}>{`${this.props[key].label_name}`}</label>
                        
                        <p key={this.props[key].label_name} className={`Form-error`} style={(this.state[input_value_part1][inputvalue_error] === null || this.state[input_value_part1][inputvalue_error] === 'no') ? {border : 'none'} : {border : '1px solid red'}}>{this.state[input_value_part1][inputvalue_error] === 'no' ? null : this.state[input_value_part1][inputvalue_error] }</p>
                       
                </div>)

            }

              
            }
            return inputsToShown
    }
    
    /* Input :: event  || Which Props Depend :: None */
    /* Place For calling the function :: render () */
    /* Depend on States */
    /* This Function handle Will check if Form Vaild will redirect to Profile Page  */

    handleSubmit= (e) => {
        const {login} = this.state;
        e.preventDefault();
        if(login.submitSucces ) {
                /*  login.student_mail  --> final user name to send it to firebase
                login.student_password -->   final user password  to send it to firebase */

                /* Replace function below "fakeFunction" with the function from firebase and remove the fake function line 6 because it will be garbage function :"D */
                checkFromFireBase(
                    (fakeFunction)() ,'./')
            } 
            else {
                failedRegister()
            }
    }
    

    render () {
        return (
            <form className="Form">
                {this.renderTheComingForm()}
                {(this.props.buttonSubmit &&<button className="Form-submit" onClick = {this.handleSubmit}type="submit">تسجيل الدخول</button>
)}
            </form>
        )
    }
}


export default Form ; 