import React , {Component} from 'react';
import {succesRegister,failedRegister}from './form_helpers'
import validator from 'validator' ;
import './css/form.css';


class Form extends Component {
    state = { 
        databaseCheck : (this.props.databaseCheck) ? true : false ,
        login_form_student : {
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


    /* Input :: user_mail , user_password  ||  Props Depend  */
    /* Place For calling the function :: handleSubmit (e) */
    /* This Function will called in handleSubmit when "databaseCheck flag" be true will depend on the props */

    checkUserAccess = (user_mail,user_password) => {
        let enterSafe = false ;
        const {usersDb} = this.props ;
        usersDb.forEach((user)=>{
            console.log(user.uEmail)
            console.log(user.uPassword)
            if(user.uEmail.toLowerCase() === user_mail.toLowerCase() && user.uPassword === user_password) {
                enterSafe = true ; 
            } 
        })
        return enterSafe ;
    }

    /* Input :: event   || Which Props Depend :: form */
    /* Place For calling the function :: handleChange (e) */
    /* This Function will be handy When More than Form use This Component depend on the name of form the function for it will be calling */
    handleWhichForm= (e) => {
        const {form} = this.props ; 
        switch (form) {
            case 'login_form_student':
                    this.updateStudentForm(e);
                break;
        
            default:
                break;
        }
    }
    

    /* Input :: event  || Which Props Depend :: None */
    /* Place For calling the function :: handleWhichForm (e) */
    /* Depend on this.State (Object of "form Name coming from Props" and it's properties) */
    /* This Function handle client-server-errors and update every state for all inputs of the field when changed  */

    updateStudentForm = (e) => {
        const {login_form_student} = this.state; 
        console.log(e.target.name)
        switch (e.target.name) {
            case "student_mail":
                if(!e.target.value) {
                    this.setState({
                        login_form_student : {
                            ...this.state.login_form_student,
                            error_student_mail :  "البريد الالكتروني مطلوب",
                            [e.target.name]: e.target.value,
                            submitSucces : false
                        }
                    })
                }
                else if(!validator.isEmail(e.target.value)) {
                    this.setState({
                        login_form_student : {
                            ...this.state.login_form_student,
                            error_student_mail :  'تاكد من البريد الالكتروني',
                            [e.target.name]: e.target.value,
                            submitSucces : false

                        }
                    })

                } else {
                    this.setState({submitSucces : true})
                    this.setState({
                        login_form_student : {
                            ...this.state.login_form_student,
                            error_student_mail :  'no',
                            [e.target.name]: e.target.value, 
                            submitSucces : (login_form_student.error_student_password === 'no') ? true : false 
                        }
                    })
                    
                }
             
                break;
            case "student_password" : // empty string 
                if(!e.target.value) {
                    this.setState({
                        login_form_student : {
                            ...this.state.login_form_student,
                            error_student_password :  'كلمة السر مطلوبة',
                            [e.target.name]: e.target.value,
                            submitSucces : false
                        }
                    })
                } else {
                    this.setState({
                        login_form_student : {
                            ...this.state.login_form_student,
                            error_student_password :  'no',
                            [e.target.name]: e.target.value,
                            submitSucces : ((login_form_student.error_student_mail=== 'no') ? true : false)
                        }
                    })
                }
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
                const inputvalue_part2 = this.props[key].input_name;
                const inputvalue_error = this.props[key].error
                inputsToShown.push(
                    
                    <div className="Form-field" key={this.props[key].label_name}>
                        <label className="Form-label" htmlFor={this.props[key].input_name}>{`${this.props[key].label_name}`}</label>
                        <input className="Form-input" value = {this.state[input_value_part1][inputvalue_part2]}  id={this.props[key].input_name} onChange={this.handleChange} type={this.props[key].type} placeholder={`${this.props[key].placeholder}`} name={this.props[key].input_name} />
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
        const {login_form_student,databaseCheck} = this.state;
        e.preventDefault();
        if(databaseCheck) {
            const enterSafe = this.checkUserAccess(login_form_student.student_mail,login_form_student.student_password)  
            if(login_form_student.submitSucces && enterSafe) {
                succesRegister('./') // need to update to profile page
            } else {
                failedRegister()
            }
        }

        // for all others forms that don't need db Check 

        else {
            if(login_form_student.submitSucces) {
                succesRegister('./') // need to update to profile page
            } else {
                failedRegister()
            }


        }
    }

    render () {
        return (
            <form className="Form">
                {this.renderTheComingForm()}
            <button className="Form-submit" onClick = {this.handleSubmit}type="submit">تسجيل الدخول</button>
            </form>
        )
    }
}


export default Form ; 