import React, { Component, Fragment } from 'react';
import swal from 'sweetalert';
import FormField from '../../../reComponents/formField';
import '../../../resources/css/additions.css';
import {validate,allFormIsVaild,succesRegister,failedRegister} from '../../../component_helpers/helpers';
let messageTimeout ;
export default class AddAssistant extends Component {
    state = {
        formError : false,
        formSucces  : '',
        formData : {
            email : {
                element : 'input',
                label : 'Email',
                value : '',
                config : {
                    name : 'assistant_email',
                    type : 'email',
                    id : 'assistant_email',
                    placeholder : 'Enter assistant email ..'
                },
                vaildation : {
                    required : true,
                    email : true
                },
                vaild : false,
                vaildationMessage : ''
            },
            phoneNumber : {
                element : 'input',
                label : 'Phone',
                value : '',
                config : {
                    name : 'assistant_phone',
                    type : 'number',
                    id : 'assistant_phone',
                    placeholder : 'Enter assistant phone ..'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : ''
            },
            firstName : {
                element : 'input',
                label : 'First Name',
                value : '',
                config : {
                    name : 'assistant_firstName',
                    type : 'text',
                    id : 'assistant_firstName',
                    placeholder : 'Enter assistant first name'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : ''
            },
            lastName : {
                element : 'input',
                label : 'Last Name',
                value : '',
                config : {
                    name : 'assistant_lastName',
                    type : 'text',
                    id : 'assistant_lastName',
                    placeholder : 'Enter assistant last name'
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
        clearTimeout(messageTimeout);
    }
    


    updateAssistantForm = ({event : {target},formID}) => {
        const {formData} = this.state;
        const newFormData = {...formData};
        const newElements = newFormData[formID];
        newElements.value = target.value ;
        const {vaild,message} = validate(newElements);
        newElements.vaild = vaild ;
        newElements.vaildationMessage = message;
        newFormData[formID] = newElements ; 
        this.setState({
            formData : newFormData,
            formError : false
        })

        
    }

    submitForm = (e) => {
        e.preventDefault();
        const {formData} = this.state;
        const dataToSubmit = {} ;
        const submitFormSuccessfuly = allFormIsVaild(formData,dataToSubmit);
        if(submitFormSuccessfuly) {
            this.setState({
                formSucces : `Add assistant ${dataToSubmit.firstName} successfuly 😊`
            }, () => {
                succesRegister(this.state.formSucces);
                setTimeout(() => {
                    swal.close();
                    this.resetForm()
                }, 2000);
            })

            /*khaled here you have object with all fields */

        } else {
            this.setState({
                formError : true
            })
        }

    }

    resetForm = () => {

        const newFormdata = {...this.state.formData};
        for (let key in newFormdata) {
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].validationMessage = ''
        }

        this.setState({
            formError : false,
            formData : newFormdata,
            formSuccess : ''
        })

    }
    render() {
        const {formData : {email,phoneNumber,firstName,lastName},formError} = this.state;
        return (
            <Fragment>
                <div className="Additions-Form">
                    <div className="Form-title">Add assistant</div>

                    <form onSubmit = {this.submitForm} className = "Form">
                        <FormField
                            formID = "email"
                            formInfo = {email}
                            onChange = {(element) => this.updateAssistantForm(element)}
                        />
                        <FormField
                            formID = "phoneNumber"
                            formInfo = {phoneNumber}
                            onChange = {(element) => this.updateAssistantForm(element)}
                        />
                        <FormField
                            formID = "firstName"
                            formInfo = {firstName}
                            onChange = {(element) => this.updateAssistantForm(element)}
                        />
                        <FormField
                            formID = "lastName"
                            formInfo = {lastName}
                            onChange = {(element) => this.updateAssistantForm(element)}
                        />
                        <button className="Form-submit" onClick={this.submitForm}>submit</button>
                    </form>
                    {formError ? failedRegister('Please fill all the form fields !') : null}

                </div>
            </Fragment>
        )
    }
}
