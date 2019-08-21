import React , {Component} from 'react';
import Form from '../form/';
import FormField from '../../reComponents/formField';
import {createInputField} from '../../component_helpers/form_helpers';
import '../../resources/css/login.css';

import {validate} from '../../component_helpers/helpers';

class Login extends Component {

    state = {
        formError : false, // this will be the last step before send data to server after submit
        formSuccess : '',
        formData : {
            email : {
                element : 'input',
                label : 'Email',
                value : '',
                config : {
                    name : 'user_email',
                    type : 'email',
                    id : 'user_email',
                    placeholder : 'enter your e-mail...'
                },
                vaildation : {
                    required : true,
                    email : true 
                },
                vaild : false, // the flag for shown message below or not
                validationMessage : '' // this will be the message to show if error shown up
            },
            password : {
                element : 'input',
                label : 'Password',
                value : '',
                config : {
                    name : 'user_password',
                    type : 'password',
                    id : 'user_password',
                    placeholder : 'enter your password...'
                },
                vaildation : {
                    required : true,
                },
                vaild : false, 
                validationMessage : ''
            }
        }
    }

    updateLoginForm = ({event : {target},formID}) => {
        console.log(formID)
        const {formData} = this.state;
        const newFormData = {...formData}; // take all the properties on the object and speard it here
        const newElement = {...newFormData[formID]} // the one will change and edited 

        newElement.value = target.value;

        let vaildData = validate(newElement);

        newElement.vaild = vaildData[0];
        newElement.validationMessage = vaildData[1]

        newFormData[formID] = newElement ;

        this.setState({
            formData : newFormData
        })
    }


    // need handle sumbit function 

    // need reset form function

    // need to implement the vaildate function again

    render () {
        const {formData : {email,password}} = this.state;
        return (
            <div className="Login">
                <form className = "Form" onSubmit={this.submitForm}>
                    <FormField 
                        formID = 'email'
                        formInfo = {email}
                        onChange = {(element)=>this.updateLoginForm(element)}
                    />
                    <FormField 
                        formID = 'password'
                        formInfo = {password}
                        onChange = {(element)=>this.updateLoginForm(element)}

                    />
                    <button className="Form-submit ">Sign in</button>
                </form>

              
            </div>
        )
    }
}


export default Login ; 