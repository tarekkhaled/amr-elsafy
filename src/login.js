import React , {Component} from 'react';
import Form from './form';
import './css/login.css';

class Login extends Component {
    state = {
        register_as_student : true 
    }

    switchForms = (e) => {
        let newstate = ! this.state.register_as_student ;
        this.setState({
            register_as_student : newstate
        })
    }

    render () {
        return (
            <div className="Login">
                <Form 
                    form =  'login_form_student'
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