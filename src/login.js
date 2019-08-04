import React , {Component} from 'react';
import Form from './form';
import {createInputField} from './helpers';
import './css/login.css';

class Login extends Component {

    render () {
        return (
            <div className="Login">
                <Form 
                    form =  'login'
                    buttonSubmit = {true}
                    input_field1 = {createInputField(': البريد الالكتروني','email','student_mail','... البريد الالكتروني','error_student_mail')}
                    input_field2 = {createInputField(': كلمة السر','password','student_password','... كلمة السر','error_student_password')}

                />
            </div>
        )
    }
}


export default Login ; 