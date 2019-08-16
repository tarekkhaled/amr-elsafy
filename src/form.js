import React , {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {withStyles} from '@material-ui/styles';
import {checkFromFireBase,failedRegister,succesRegister,vaildSubmitFields}from './form_helpers'
import validator from 'validator' ;
import './css/form.css';

function fakeFunction () {
    return 'login failed'
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
        color : 'white'
    },Menu : {
        display: 'flex',
        justifyContent: 'flex-end',
        fontFamily : 'Tajawal , sans-serif',
        fontWeight : '600'
    }
})

export default withStyles(styles)(class Form extends Component {
    state = { 
        login : {
            student_mail : '',
            student_password : '',
            error_student_mail : null , // 1 :: means is empty , 2 :: means is not vaild
            error_student_password : null, // 1 :: means is empty 
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
            error_student_fullName : null,
            error_student_number : null,
            error_student_address : null,
            error_student_school : null,
            error_student_mail : null,
            error_father_number : null,
            submitSucces : false
        }
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
            default:
                break;
        }
    }
    
    updateAnyFormFieldINState = (e,login_,prop,value,boolvalue) => {
        this.setState({
            [login_] : {...this.state[login_],[prop] : value ,'submitSucces' : boolvalue ,[e.target.name] : e.target.value}
        })
    }


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
                

                default:
                    break;
            }
    } 


    
    /* Input :: event  || Which Props Depend :: None */
    /* Place For calling the function :: handleWhichForm (e) */
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
    
    /* Input :: event  || Which Props Depend :: All */
    /* Place For calling the function :: render () */
    /* Depend on States  */
    /* Need some refactor ES6*/
    /* This Function iterate over the all inputs "coming from props" and render it by order  */

    renderTheComingForm = (e)=>{
        const inputsToShown = []
        const input_value_part1 = this.props.form;
        const {
            dropDown_field_center,
            dropDown_field_day,
            dropDown_field_timeStart,
            dropDown_field_timeEnd,
            dropDown_field_session,
            classes
        } = this.props;
        
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
                if (key === 'dropDown_field_center'){
                        inputsToShown.push(
                            <FormControl  key = {key} className={classes.FormControl}>
                                 <InputLabel className={classes.Label} htmlFor={dropDown_field_center.selectFor}>{dropDown_field_center.selectName}</InputLabel>
                                 <Select
                                 className ={classes.Select}
                                 inputProps={{
                                         name: dropDown_field_center.selectFor,
                                         id: dropDown_field_center.selectFor,
                                     }}
                                 > 
                                 {dropDown_field_center.selectArray.map((item,index)=>
                                 <MenuItem className={classes.Menu} key={item} value = {item}> {item} </MenuItem>
                                 )}
                                 </Select>
                             </FormControl>   
                     )
                }

                else if(key === 'dropDown_field_day'){
                            inputsToShown.push(
                                <FormControl  key = {key} className={classes.FormControl}>
                                     <InputLabel className={classes.Label} htmlFor={dropDown_field_day.selectFor}>{dropDown_field_day.selectName}</InputLabel>
                                     <Select
                                     inputProps={{
                                             name: dropDown_field_day.selectFor,
                                             id: dropDown_field_day.selectFor,
                                         }}
                                     > 
                                     {dropDown_field_day.selectArray.map((item,index)=>
                                     <MenuItem className={classes.Menu}  key={item} value = {item}> {item} </MenuItem>
                                     )}
                                     </Select>
                                </FormControl>)   
                }
                else if(key === 'dropDown_field_timeStart'){
                            inputsToShown.push(
                                <FormControl  key = {key} className={classes.FormControl}>
                                     <InputLabel className={classes.Label} htmlFor={dropDown_field_timeStart.selectFor}>{dropDown_field_timeStart.selectName}</InputLabel>
                                     <Select
                                     inputProps={{
                                             name: dropDown_field_timeStart.selectFor,
                                             id: dropDown_field_timeStart.selectFor,
                                         }}
                                     > 
                                     {dropDown_field_timeStart.selectArray.map((item,index)=>
                                     <MenuItem className={classes.Menu}  key={item} value = {item}> {item} </MenuItem>
                                     )}
                                     </Select>
                                </FormControl>)   
                }
                else if (key === 'dropDown_field_timeEnd') {
                            inputsToShown.push(
                                <FormControl  key = {key}className={classes.FormControl}>
                                     <InputLabel className={classes.Label} htmlFor={dropDown_field_timeEnd.selectFor}>{dropDown_field_timeEnd.selectName}</InputLabel>
                                     <Select className = {classes.cow}
                                     inputProps={{
                                             name: dropDown_field_timeEnd.selectFor,
                                             id: dropDown_field_timeEnd.selectFor,
                                         }}
                                     > 
                                     {dropDown_field_timeEnd.selectArray.map((item,index)=>
                                     <MenuItem className={classes.Menu}  key={item} value = {item}> {item} </MenuItem>
                                     )}
                                     </Select>
                                </FormControl>)   
                }
                else {

                    inputsToShown.push(
                        <FormControl  key = {key}className={classes.FormControl}>
                             <InputLabel className={classes.Label} htmlFor={dropDown_field_session.selectFor}>{dropDown_field_session.selectName}</InputLabel>
                             <Select className = {classes.cow}
                             inputProps={{
                                     name: dropDown_field_session.selectFor,
                                     id: dropDown_field_session.selectFor,
                                 }}
                             > 
                             {dropDown_field_session.selectArray.map((item,index)=>
                             <MenuItem className={classes.Menu}  key={item} value = {item}> {item} </MenuItem>
                             )}
                             </Select>
                        </FormControl>)   
                }
            }
            
        }
            return inputsToShown
    }
    
    /* Input :: event  || Which Props Depend :: None */
    /* Place For calling the function :: render () */
    /* Depend on States */
    /* This Function handle Will check if Form Vaild will redirect to Profile Page  */

    handleSubmit= (e) => {
        e.preventDefault();
        const {form} = this.props ; 
        const {login,login_assistant,login_center,login_student} = this.state;
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
                    succesRegister('additions',`بنجاح ${login_assistant.assistant_firstName} تم تسجيل`)
                else 
                    console.log('sad')
            break;
            case 'login_center': 
                if(login_center.submitSucces)
                    succesRegister('/additions',` تم تسجيل ${login_center.center_name} بنجاح`)
                else 
                    console.log('sad')
            break;

            case 'login_student': 
            if(login_student.submitSucces)
                succesRegister('/additions',` تم تسجيل ${login_student.student_fullName} بنجاح`)
            else 
                console.log('sad')
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

