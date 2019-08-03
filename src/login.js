import React , {Component} from 'react';
import Form from './form';
import './css/login.css';

class Login extends Component {
    state = {
        /* This Date will be replaced by json coming from datebase */
        users : [
            {
                uEmail : 'tarekt820@gmail.com',
                uPassword : 'breakingbad'
            },
            {
                uEmail : 'leoMessi@gmail.com',
                uPassword : 'goat'
            },
            {
                uEmail : 'Dejong21@gmail.com',
                uPassword : '10203040'
            }   
        ]
    }

    render () {
        return (
            <div className="Login">
                <Form 
                    form =  'login_form_student'
                    databaseCheck = 'true'
                    usersDb = {this.state.users}
                    input_field1  =  {{
                                label_name :": البريد الالكتروني",
                                type : "email",
                                input_name : "student_mail",
                                placeholder : " ... البريد الالكتروني",
                                error : 'error_student_mail'

                    }}
                    input_field2 =  { {
                                label_name : ": كلمة السر",
                                type : "password",
                                input_name : "student_password",
                                placeholder : " ... كلمة السر",
                                error : 'error_student_password'

                                }
                    }
                />
            </div>
        )
    }
}


export default Login ; 