import React, { Component , Fragment } from 'react';
import swal from 'sweetalert';
import FormField from '../../../reComponents/formField';
import '../../../resources/css/additions.css';
import {validate,allFormIsVaild,succesRegister,failedRegister} from '../../../component_helpers/helpers';
let messageTimeout ;

function getCenterName (array,id,dataToSubmit) {
    const object = array.find((center)=>center.centerID === id)
    dataToSubmit.centerName = object.centerName;
}

const centersCollection = [
    {
        centerName : 'ام ابراهيم',
        centerID : 1
    },
    {
        centerName : 'ام نحمدو',
        centerID : 2
    },
    {
        centerName : 'ام شربات',
        centerID : 3
    }
]

const timeStartCollection = [
    {
        time : '1:00 Am'
    },
    {
        time : '5:00 Am'
    },
    {
        time : '10:00 Am'
    }
]


const days = ['السبت' , 'الحد' , 'الاتنين' , 'التلات' ,'العبود'] 
const timeEndCollection = [
    {
        time : '5:00 Am'
    },
    {
        time : '9:00 Am'
    },
    {
        time : '12:00 Am'
    },
]

const levelsCollection = ['المستوي الاول' , 'المستوي التاني' , 'المستوي التالت']

export default class AddGroup extends Component {

    state = {

        formError : false,
        formSuccess  : '',
        formData : {
            centerID : {
                element : 'dropdown',
                label : 'Choose Center',
                value : '',
                config : {
                    name : 'center_choice',
                    id : 'center_choice',
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                centerID : '',
                vaildationMessage : '',
                arrayOfChoices : [],// firebase
                propertyToRender : ['centerName','centerID'], // this because if i want to show something and send another value to database
                menuLanguage : 'ar',
                isArrayOfObjects : true
            },
            dayChoice : {
                element : 'dropdown',
                label : 'Choose Day',
                value : '',
                config : {
                    name : 'day_choice',
                    id : 'dy_choice',
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                arrayOfChoices : days,
                menuLanguage : 'ar',
                isArrayOfObjects : false

              
            },
            timeStartChoice : {
                element : 'dropdown',
                label : 'Choose time start',
                value : '',
                config : {
                    name : 'timeStart_choice',
                    id : 'timeStart_choice',
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                arrayOfChoices : timeStartCollection,
                propertyToRender : 'time',
                menuLanguage : 'a1r',
                isArrayOfObjects : true,

            },
            timeEndChoice : {
                element : 'dropdown',
                label : 'Choose time End',
                value : '',
                config : {
                    name : 'timeEnd_choice',
                    id : 'timeEnd_choice',
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                arrayOfChoices : timeEndCollection,
                propertyToRender : 'time',
                menuLanguage : 'ar',
                isArrayOfObjects : true
            },
            level : {
                element : 'dropdown',
                label : 'Choose Level',
                value : '',
                config : {
                    name : 'level_choice',
                    id : 'level_choice',
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                arrayOfChoices : levelsCollection,
                propertyToRender : 'time',
                menuLanguage : 'ar',
                isArrayOfObjects : false
            },
            sessionNumber : {
                element : 'input',
                label : 'Choose Session Number',
                value : '',
                config : {
                    name : 'session_number',
                    type : 'number',
                    id : 'center_phone',
                    placeholder : 'Session number ..'
                },
                vaildation : {
                    required : true,
                    postiveNumber : true
                },
                vaild : false,
                vaildationMessage : ''
            },
        }
    }

    componentWillMount () {

        const {formData} = this.state;
        const newFormData = {...formData} ;
        const newCentersChiocesObject = newFormData['centerID']; 
        newCentersChiocesObject.arrayOfChoices = centersCollection;
        newFormData['centerID'] = newCentersChiocesObject;
        this.setState({
            formData : newFormData 
        })
    }

    componentWillUnmount() {
        clearTimeout(messageTimeout);
    }
    

    updateGroupForm = ({event : {target},formID}) => {
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
            getCenterName(centersCollection,dataToSubmit.centerID,dataToSubmit)
            this.setState({
                formSucces : `Add Group "${dataToSubmit.centerID} ${dataToSubmit.dayChoice} from ${dataToSubmit.timeStartChoice} to ${dataToSubmit.timeEndChoice}" successfuly 😊`
            }, () => {
                succesRegister(this.state.formSucces);
                setTimeout(() => {
                    swal.close();
                    this.resetForm()
                }, 2000);
            })

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
        const {formData : {centerID,dayChoice,timeStartChoice,timeEndChoice,level,sessionNumber},formError} = this.state;
        return (
            <Fragment>
                <div className="Additions-Form">
                    <div className="Form-title">Add Group</div>
                    <form onSubmit = {this.submitForm} className = "Form">
                        <FormField
                            formID = "centerID"
                            formInfo = {centerID}
                            onChange = {(element) => this.updateGroupForm(element)}
                        />
                        <FormField
                            formID = "dayChoice"
                            formInfo = {dayChoice}
                            onChange = {(element) => this.updateGroupForm(element)}
                        />
                        <FormField
                            formID = "timeStartChoice"
                            formInfo = {timeStartChoice}
                            onChange = {(element) => this.updateGroupForm(element)}
                        />
                        <FormField
                            formID = "timeEndChoice"
                            formInfo = {timeEndChoice}
                            onChange = {(element) => this.updateGroupForm(element)}
                        />
                        <FormField
                            formID = "level"
                            formInfo = {level}
                            onChange = {(element) => this.updateGroupForm(element)}
                        />
                        <FormField
                            formID = "sessionNumber"
                            formInfo = {sessionNumber}
                            onChange = {(element) => this.updateGroupForm(element)}
                            style = {{
                                textAlign : 'left',
                                fontSize : 16,
                                marginTop : 20
                            }}
                            labelStyling = {{
                                marginLeft : 0
                            }}
                        />
                        <button className="Form-submit" onClick={this.submitForm}>submit</button>
                    </form>
                    {formError ? failedRegister('Please fill all the form fields !') : null}

                </div>
            </Fragment>
        )
    }
}
