import React, { Component, Fragment } from 'react';
import swal from 'sweetalert';
import FormField from '../../../reComponents/formField';
import '../../../resources/css/additions.css';
import {validate,allFormIsVaild,succesRegister,failedRegister} from '../../../component_helpers/helpers';
let messageTimeout ;


export default class AddCenter extends Component {
    state = {
        formError : false,
        formSuccess  : '',
        formData : {
            centerPhone : {
                element : 'input',
                label : 'Center Phone',
                value : '',
                config : {
                    name : 'center_phone',
                    type : 'number',
                    id : 'center_phone',
                    placeholder : 'center phone ..'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : ''
            },
            centerName : {
                element : 'input',
                label : 'Center Name',
                value : '',
                config : {
                    name : 'center_name',
                    type : 'text',
                    id : 'center_name',
                    placeholder : 'center name ..'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : ''
            },
            centerAddress : {
                element : 'input',
                label : 'Center Address',
                value : '',
                config : {
                    name : 'center_address',
                    type : 'text',
                    id : 'center_address',
                    placeholder : 'center address ..'
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
    


    updateCenterForm = ({event : {target},formID}) => {
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
                formSucces : `Add center "${dataToSubmit.centerName}" successfuly 😊`
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
            newFormdata[key].vaild = false;
            newFormdata[key].vaildationMessage = ''
        }

        this.setState({
            formData : newFormdata,
            formError : false,
            formSuccess : ''
        })

    }
    render() {
        const {formData : {centerPhone,centerAddress,centerName},formError} = this.state;
        return (
            <Fragment>
                <div className="Additions-Form">
                    <div className="Form-title">Add Center</div>

                    <form onSubmit = {this.submitForm} className = "Form">
                        <FormField
                            formID = "centerName"
                            formInfo = {centerName}
                            onChange = {(element) => this.updateCenterForm(element)}
                        />
                        <FormField
                            formID = "centerPhone"
                            formInfo = {centerPhone}
                            onChange = {(element) => this.updateCenterForm(element)}
                        />
                        <FormField
                            formID = "centerAddress"
                            formInfo = {centerAddress}
                            onChange = {(element) => this.updateCenterForm(element)}
                        />
                        <button className="Form-submit" onClick={this.submitForm}>submit</button>
                    </form>
                    {formError ? failedRegister('Please fill all the form fields !') : null}

                </div>
            </Fragment>
        )
    }
}
