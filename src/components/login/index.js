import React , {Component} from 'react';
import '../../resources/css/form.css';
import FormField from '../../reComponents/formField';
import {validate,allFormIsVaild,succesRegister,failedRegister} from '../../component_helpers/helpers';

let messageTimeout ;

class Login extends Component {

    state = {
        /* khaled firebase will be removed */
        firebase : [
            {
                id : '1',
                mail: 'tarekt820@gmail.com',
                password : '12345',
                firstName : 'tarek'
            },
            {
                id : '2',
                mail: 'leoMessi@gmail.com',
                password : '12345'
            }
        ],
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
                vaildationMessage : '' // this will be the message to show if error shown up
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
                vaildationMessage : ''
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(messageTimeout)
    }

    updateLoginForm = ({event : {target},formID}) => {
        const {formData} = this.state;
        // make the new form object take the same alll properties in form Data above
        const newFormData = {...formData}; 
        // spread all the properties inside the specific input from formData by formID
        const newElement = {...newFormData[formID]} // the one will change and edited 
        // change value by the value entered in the input
        newElement.value = target.value;
        // change vaildation message and vaild flag 
        const {vaild,message} = validate(newElement);
        newElement.vaild = vaild
        newElement.vaildationMessage = message

        newFormData[formID] = newElement ;
        console.log(newFormData)

        this.setState({
            formData : newFormData,
            formError : false // just to make him free to update again after failed submttion
        })
    }


    // need handle sumbit function 
    submitForm = (e) => {
        e.preventDefault();
        const {formData,firebase} = this.state;
        const dataToSubmit = {};
        const submitFormSuccessfuly = allFormIsVaild(formData,dataToSubmit) ;
        if(submitFormSuccessfuly) {
            const {email,password} = dataToSubmit;
            /* khaled here you will make the check from firebase if the data is true the data to firebase you have dataToSubmit all information */
            const firebaseStoredUser = firebase.find((user)=> {
                return (user.mail === email && user.password === password) || null
            })
            
            if(firebaseStoredUser) {
                // here will be redirect in peace to your profile
                this.setState({
                    formSuccess : `happy to have you back  ${firebaseStoredUser.firstName} 😊` 
                },()=>{
                    succesRegister(this.state.formSuccess)
                })
                messageTimeout = setTimeout(() => {
                    window.location.assign('./profile')
                }, 1500);
            }
            else { 
                this.setState({
                    formError : true // check from server side 
                })
            }
            
        } else {
            this.setState({
                formError : true // check from client side
            })
        }  
    }

    // need to implement the vaildate function again

    render () {
        const {formData : {email,password},formError} = this.state;
        return (
            <div className="Additions-Form">
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
                    <button className="Form-submit" onClick={this.submitForm}>Sign in</button>
                </form>
                {formError ? failedRegister('Please check your information again !') : null}
            </div>
        )
    }
}


export default Login ; 