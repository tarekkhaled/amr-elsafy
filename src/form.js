import React , {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {checkFromFireBase,failedRegister,succesRegister,vaildSubmitFields,renderDropDown}from './form_helpers'
import validator from 'validator' ;
import './css/form.css';


function fakeFunction () {
    return 'login failed'
}

/* khaled :: this will be removed and add the firebase function that return the sessions for the center*/
function bringTheSessionsOFSpecficCenter (oob,center) {
    return oob[center];
}


const styles = theme => ({
    FormControl : {
        minWidth : '400px',
        display : 'flex',
        marginBottom : '10px'
    },
    Label : {
        right : '0',
        left : 'auto',
        color : '#F1D885',
        fontFamily : 'Tajawal , sans-serif'
    },
    Select : {
        textAlign : 'right',
        color : '#8a8a8a'
    },Menu : {
        display: 'flex',
        justifyContent: 'flex-end',
        fontFamily : 'Tajawal , sans-serif',
        fontWeight : '600',

    }
})

export default withStyles(styles)(class Form extends Component {
    state = { 
        login : {
            student_mail : '',
            student_password : '',
            error_student_mail : null , 
            error_student_password : null, 
            submitSucces : false
        }, 
        login_assistant : {
            assistant_mail : '',
            assistant_number : '',
            assistant_firstName : '',
            assistant_lastName : '',
            error_assistant_mail : null,
            error_assistant_number : null ,
            error_assistant_firstName : null ,
            error_assistant_lastName : null ,
            submitSucces : false 

        },
        login_center : {
            center_name : '',
            center_number : '',
            center_address : '',
            error_center_name : null ,
            error_center_address : null,
            error_center_number : null,
            submitSucces : false 
        },
        login_student : {
            student_fullName : '',
            student_number : '',
            student_address : '',
            student_school : '',
            student_mail : '',
            father_number : '',
            center_select_student : '',
            session_select_student : '',
            error_student_fullName : null,
            error_student_number : null,
            error_student_address : null,
            error_student_school : null,
            error_student_mail : null,
            error_father_number : null,
            error_center_select_student : null,
            error_session_select_student : null,
            isCenterSelected : false,
            submitSucces : false
        },
        login_session : {
            center_select : '',
            day_select : '',
            timeStart_select : '',
            timeEnd_select : '',
            error_center_select : '',
            error_day_select : '',
            error_timeStart_select : '',
            error_timeEnd_select : '',
            submitSucces : false 
        },

        'سنتر دار الحكمة' : ['الحد من 2 لي 5','الجمعة من 2 لي 5','السبت من 2 لي 5','الاتنين من 2 لي 5'],
        'سنتر الحجاز' : ['الحد من 2 لي 5','الجمعة من 2 لي 5','السبت من 2 لي 5','الاتنين من 2 لي 5']
    }

    /* Input :: event   || Which Props Depend :: form */
    /* Place For calling the function :: onChange in any input field  (e)  in render function */
    /* This function just calling handleWhichForm which in turn choose what the form is running write now and after that send the right function needed for update the states in the form */

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
                this.updateLoginForm(e);
            break;
            case 'login_assistant' :
                this.updateAssistantForm(e);
            break;
            case 'login_center' :
                this.updateCenterForm(e);
            break;
            case 'login_student' :
                    this.updateStudentForm(e);
                break;
            case 'login_session' :
                    this.updateSessionForm(e);
                break;
            default:
                break;
        }
    }
 
    /* Input :: event   || In Charge of updating the states in "login_center" */
    /*  controlled Component*/
    /* Place For calling the function :: handleWhichForm case "login_center" */
    /* This Function in charge of update "center form" in states and handle the errors shown in the form too*/
    updateCenterForm = (e)=> {
        const {login_center} = this.state;
        switch (e.target.name) {
            case "center_name":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_center','error_center_name','اسم السنتر مطلوب', false);
                else 
                this.updateAnyFormFieldINState(e,'login_center','error_center_name','no',vaildSubmitFields(login_center,'error_center_name'));  
            break;
            case "center_number":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_center','error_center_number','رقم السنتر مطلوب', false);
                else 
                this.updateAnyFormFieldINState(e,'login_center','error_center_number','no',vaildSubmitFields(login_center,'error_center_number'));  
            break;
            case "center_address":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_center','error_center_address','اسم السنتر مطلوب', false);
                else 
                this.updateAnyFormFieldINState(e,'login_center','error_center_address','no',vaildSubmitFields(login_center,'error_center_address'));  
            break;
          
            default:
                break;
        }
    }

    /* Input :: event   || In Charge of updating the states in "login_session" */
    /*  controlled Component*/
    /* Place For calling the function :: handleWhichForm case "login_session" */
    /* This Function in charge of update  "essions form" in states and handle the errors shown in the form too*/

    updateSessionForm = (e)=> {
        const {login_session} = this.state;
        switch (e.target.name) {
            case "center_select":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_session','error_center_select','اسم السنتر مطلوب', false);
                else 
                this.updateAnyFormFieldINState(e,'login_session','error_center_select','no',vaildSubmitFields(login_session,'error_center_select'));  
            break;
            case "day_select":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_session','error_day_select','رقم السنتر مطلوب', false);
                else 
                this.updateAnyFormFieldINState(e,'login_session','error_day_select','no',vaildSubmitFields(login_session,'error_day_select'));  
            break;
            case "timeStart_select":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_session','error_timeStart_select','اسم السنتر مطلوب', false);
                else 
                this.updateAnyFormFieldINState(e,'login_session','error_timeStart_select','no',vaildSubmitFields(login_session,'error_timeStart_select'));  
            break;

            case "timeEnd_select":
                    if(!e.target.value) 
                        this.updateAnyFormFieldINState(e,'login_session','error_timeEnd_select','اسم السنتر مطلوب', false);
                    else 
                    this.updateAnyFormFieldINState(e,'login_session','error_timeEnd_select','no',vaildSubmitFields(login_session,'error_timeEnd_select'));  
                break;
          
            default:
                break;
        }
    }

    /* Input :: event   || In Charge of updating the states in "login_assistant" */
    /*  controlled Component*/
    /* Place For calling the function :: handleWhichForm case "login_assistant*/
    /* This Function in charge of update "assistant form" in states and handle the errors shown in the form too*/

    updateAssistantForm = (e) => {
        const {login_assistant} = this.state; 
        switch (e.target.name) {
            case "assistant_mail":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_mail',"البريد الالكتروني مطلوب", false);
                else if(!validator.isEmail(e.target.value)) 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_mail','تاكد من البريد الالكتروني', false)
                else 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_mail','no', vaildSubmitFields(login_assistant,'error_assistant_mail'));
                break;
            case "assistant_number" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_number','رقم المحمول مطلوب', false);
                else 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_number','no', vaildSubmitFields(login_assistant,'error_assistant_number'));  
                break;

                case "assistant_firstName" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_firstName','االاسم الاول مطلوب', false);
                else 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_firstName','no', vaildSubmitFields(login_assistant,'error_assistant_firstName'));  
                break;

                case "assistant_lastName" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_lastName','اسم العائله مطلوب', false);
                else 
                    this.updateAnyFormFieldINState(e,'login_assistant','error_assistant_lastName','no', vaildSubmitFields(login_assistant,'error_assistant_lastName'));  
                break;
                default:
                    break;
            }
    } 


    /* Input :: event   || In Charge of updating the states in "login_student" */
    /*  controlled Component*/
    /* Place For calling the function :: handleWhichForm case "login_student*/
    /* This Function in charge of update "student form" in states and handle the errors shown in the form too*/

    updateStudentForm = (e) => {
        const {login_student} = this.state; 
        switch (e.target.name) {
            case "student_mail":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_mail',"بريد الطالب مطلوب", false);
                else if(!validator.isEmail(e.target.value)) 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_mail','تاكد من البريد الالكتروني', false)
                else 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_mail','no', vaildSubmitFields(login_student,'error_student_mail'));
                break;
            case "student_number" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_number','رقم الطالب مطلوب', false);
                else 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_number','no', vaildSubmitFields(login_student,'error_student_number'));  
                break;

                case "father_number" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_student','error_father_number','رقم الاب مطلوب', false);
                else 
                    this.updateAnyFormFieldINState(e,'login_student','error_father_number','no', vaildSubmitFields(login_student,'error_father_number'));  
                break;


                case "student_fullName" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_fullName','اسم الطالب مطلوب', false);
                else 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_fullName','no', vaildSubmitFields(login_student,'error_student_fullName'));  
                break;

                case "student_school" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_school','مدرسة الطالب مطلوبة', false);
                else 
                    this.updateAnyFormFieldINState(e,'login_student','error_student_school','no', vaildSubmitFields(login_student,'error_student_school'));  
                break;


                case "student_address":
                        if(!e.target.value) 
                            this.updateAnyFormFieldINState(e,'login_student','error_student_address','عنوان الطالب مطلوب', false);
                        else 
                        this.updateAnyFormFieldINState(e,'login_student','error_student_address','no',vaildSubmitFields(login_student,'error_student_address'));  
                    break;


                case "center_select_student":
                        if(!e.target.value) 
                            this.updateAnyFormFieldINState(e,'login_student','error_center_select','اسم السنتر مطلوب', false);
                        else 
                            this.updateAnyFormFieldINState(e,'login_student','error_center_select_student','no',vaildSubmitFields(login_student,'error_center_select_student'));  
                    break;

                case "session_select_student":
                        if(!e.target.value)
                            this.updateAnyFormFieldINState(e,'login_student','error_session_select_student','اسم السنتر مطلوب', false);
                        else 
                            this.updateAnyFormFieldINState(e,'login_student','error_session_select_student','no',vaildSubmitFields(login_student,'error_session_select_student'));  
                    break;

                default:
                    break;
            }
    } 


    
    /* Input :: event  || Which Props Depend :: None */
    /* Place For calling the function :: handleWhichForm case "login" */
    /* Depend on this.State (Object of "form Name coming from Props" and it's properties) */
    /* This Function handle client-server-errors and update every state for all inputs of the field when changed  */
    
    updateLoginForm = (e) => {
        const {login} = this.state;
        switch (e.target.name) {
            case "student_mail":
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login','error_student_mail',"البريد الالكتروني مطلوب", false);
                else if(!validator.isEmail(e.target.value)) 
                    this.updateAnyFormFieldINState(e,'login','error_student_mail','تاكد من البريد الالكتروني', false);
                else 
                    this.updateAnyFormFieldINState(e,'login','error_student_mail','no', 
                    vaildSubmitFields(login,'error_student_mail'));
                break;
            case "student_password" : // empty string 
                if(!e.target.value) 
                    this.updateAnyFormFieldINState(e,'login','error_student_password','كلمة السر مطلوبة', false);
                else 
                this.updateAnyFormFieldINState(e,'login','error_student_password','no',vaildSubmitFields(login,'error_student_password'));  
            break;
            default:
                break;
        }
    }
    
    
    /* Input :: event , login_ : Object Name in states , prop : property in that object for update , value : value of the property , boolvalue : value of submitSuccess value */
    /* Place For Calling the function :: In Update Forms above  */
    /*  This function is just for updating states in any object inside this.states in more simple way and make sure that all other property as thery are while change the specific property needed */

    updateAnyFormFieldINState = (e,login_,prop,value,boolvalue) => {
        this.setState({
            [login_] : {...this.state[login_],[prop] : value ,'submitSucces' : boolvalue ,[e.target.name] : e.target.value}
        })
    }

    /* Input :: event  || Which Props Depend :: All */
    /* Place For calling the function :: render () */
    /* Depend on States and Props  */
    /* Need some refactor ES6*/
    /* This Function iterate over the all inputs "coming from props" and render it by order and handle the sessions shown when specific center is chosen  */

    renderTheComingForm = (e)=>{
        const inputsToShown = []
        const input_value_part1 = this.props.form;
        const {
            dropDown_field_center,
            dropDown_field_day,
            dropDown_field_timeStart,
            dropDown_field_timeEnd,
            dropDown_field_session,
            dropDown_field_center_student,
            classes
        } = this.props;
        const {
            login_session : {
                center_select,
                day_select,
                timeStart_select,
                timeEnd_select},
            login_student : {center_select_student,session_select_student}} = this.state;
        
        for (let key in this.props) {
            if(`${key}`.includes('input_field'))
            {
                const inputvalue_part2 = this.props[key].input_name;
                const inputvalue_error = this.props[key].error
                inputsToShown.push(
   
                    <div className="Form-field" key={this.props[key].label_name}>
                        <input className="Form-input" value = {this.state[input_value_part1][inputvalue_part2]}  id={this.props[key].input_name} onChange={this.handleChange} type={this.props[key].type} placeholder={`${this.props[key].placeholder}`} name={this.props[key].input_name} />
                        <label className="Form-label" htmlFor={this.props[key].input_name}>{`${this.props[key].label_name}`}</label>
                        
                        <p key={this.props[key].label_name} className={`Form-error`} style={(this.state[input_value_part1][inputvalue_error] === null || this.state[input_value_part1][inputvalue_error] === 'no') ? {border : 'none'} : {border : '1px solid red'}}>{this.state[input_value_part1][inputvalue_error] === 'no' ? null : this.state[input_value_part1][inputvalue_error] }</p>
                       
                </div>)

            }

            if(`${key}`.includes('dropDown_field'))
            {
                if (key === 'dropDown_field_center')
                    inputsToShown.push(renderDropDown(key,classes,dropDown_field_center,this.handleChange,center_select))

                else if(key === 'dropDown_field_day') 
                    inputsToShown.push(renderDropDown(key,classes,dropDown_field_day,this.handleChange,day_select))

                else if(key === 'dropDown_field_timeStart')
                        inputsToShown.push(renderDropDown(key,classes,dropDown_field_timeStart,this.handleChange,timeStart_select))
                
                else if (key === 'dropDown_field_timeEnd') 
                    inputsToShown.push(renderDropDown(key,classes,dropDown_field_timeEnd,this.handleChange,timeEnd_select))
                 
                else if (key === 'dropDown_field_center_student') 
                    inputsToShown.push(renderDropDown(key,classes,dropDown_field_center_student,this.handleChange,center_select_student))
        }
    }

        /* khaled :: here after the center selected session option will be shown*/
        if(center_select_student) {
            const dropDown_field_session_student = {
                selectFor : 'session_select_student',
                selectName : 'اختار المجموعة',
            }
            inputsToShown.push(renderDropDown('session_select',classes,dropDown_field_session_student,this.handleChange,session_select_student,/* khaled :: this function will be replaced by the function from firebase ana 3arf ank 4a8l id bs ana kont btest b2asm al center b2a  */bringTheSessionsOFSpecficCenter(this.state,center_select_student)))

        }

            return inputsToShown
    }
    
    /* Input :: event  || Which Props Depend :: None */
    /* Place For calling the function :: render () */
    /* Depend on States */
    /* This Function handle Will check if Form Vaild will redirect to Profile Page  */

    handleSubmit= (e) => {
        const {form} = this.props ; 
        const {login,login_assistant,login_center,login_student,login_session} = this.state;
        e.preventDefault();
        switch (form) {
            case 'login':
                    if(login.submitSucces) {
                        console.log('done')
                            /*  login.student_mail  --> final user name to send it to firebase
                            login.student_password -->   final user password  to send it to firebase */
            
                            /* Replace function below "fakeFunction" with the function from firebase and remove the fake function line 6 because it will be garbage function :"D */
                            checkFromFireBase(
                                (fakeFunction)() ,'./')
                        } 
                        else {
                            failedRegister()
                        }
                
            break;
            case 'login_assistant': 
                if(login_assistant.submitSucces)

                    succesRegister('additions',(` تم تسجيل ${login_assistant.assistant_firstName} بنجاح`))
                else 
                    failedRegister('من فضلك تأكد من ملئ جميع البيانات')
            break;
            case 'login_center': 
                if(login_center.submitSucces)
                    succesRegister('/additions',` تم تسجيل ${login_center.center_name} بنجاح`)
                else 
                    failedRegister('من فضلك تأكد من ملئ جميع البيانات')
            break;

            case 'login_student': 
            if(login_student.submitSucces)
                succesRegister('/additions',` تم تسجيل ${login_student.student_fullName} بنجاح`)
            else 
                failedRegister('من فضلك تأكد من ملئ جميع البيانات')
            break;

            case 'login_session': 
            if(login_session.submitSucces)
                succesRegister('/additions', `${login_session.timeStart_select} تم تسجيل مجموعة ` )
            else 
                failedRegister('من فضلك تأكد من ملئ جميع البيانات')
            break;
        
            default:
                break;
        }
       
    }

    render () {
        const {title,buttonSubmit} = this.props;
        return (
            <form className="Form">
                {title && <h5 className="Form-title">{title}</h5>}
                {this.renderTheComingForm()}
                {(buttonSubmit &&<button className="Form-submit" onClick = {this.handleSubmit}type="submit">تسجيل الدخول</button>
)}
            </form>
        )
    }
})

