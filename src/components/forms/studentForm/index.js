import React, { Component, Fragment } from 'react';
import swal from 'sweetalert';
import FormField from '../../../reComponents/formField';
import '../../../resources/css/additions.css';
import {validate,allFormIsVaild,succesRegister,failedRegister,getGroupsDropArrayByID} from '../../../component_helpers/helpers';
let messageTimeout ;

const centersCollection = [
    {
        centerName : 'ام ابراهيم',
        centerID : 1200
    },
    {
        centerName : 'ام نحمدو',
        centerID : 1300
    },
    {
        centerName : 'ام شربات',
        centerID : 1400
    }
]


const groupCollection = [   
    {
        groupID : 12,
        centerID : 1200,
        timeStart : '1:00AM',
        timeEnd : '3:00AM',
        day : 'sunday'
    },
    {
        groupID : 13,
        centerID : 1300,
        timeStart : '9:00AM',
        timeEnd : '12:00AM',
        day : 'friday'
    },
    {
        groupID : 11,
        centerID : 1200,
        timeStart : '4:00AM',
        timeEnd : '6:00AM',
        day : 'monday',
    },
    {
        groupID : 19,
        centerID : 1400,
        timeStart : '9:00PM',
        timeEnd : '12:00PM',
        day : 'sunday'
    }
]


export default class AddStudent extends Component {
    state = {
        formError : false,
        formSuccess  : '',
        formData : {
            studentName : {
                element : 'input',
                label : 'Student Name',
                value : '',
                config : {
                    name : 'student_fullname',
                    type : 'text',
                    id : 'student_fullname',
                    placeholder : 'محمد صلاح'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                placeholderLanguage : 'ar'
            },
            studentSchool : {
                element : 'input',
                label : 'student School',
                value : '',
                config : {
                    name : 'student_school',
                    type : 'text',
                    id : 'student_school',
                    placeholder : 'القبة الثانوية العسكرية'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                placeholderLanguage : 'ar'
            },
            studentAddress : {
                element : 'input',
                label : 'Student Address',
                value : '',
                config : {
                    name : 'student_address',
                    type : 'text',
                    id : 'student_address',
                    placeholder : ' المعادي القاهرة'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                placeholderLanguage : 'ar'
            },
            studentEmail : {
                element : 'input',
                label : 'Student Email',
                value : '',
                config : {
                    name : 'student_email',
                    type : 'email',
                    id : 'student_email',
                    placeholder : 'mohamedSalah@gmail.com'
                },
                vaildation : {
                    required : true,
                    email : true
                },
                vaild : false,
                vaildationMessage : '',
                placeholderLanguage : 'en'

            },
            studentPhone : {
                element : 'input',
                label : 'Student Phone',
                value : '',
                config : {
                    name : 'student_phone',
                    type : 'number',
                    id : 'student_phone',
                    placeholder : '01120000000'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                placeholderLanguage : 'en'
            },
            fatherPhone : {
                element : 'input',
                label : 'Father Phone',
                value : '',
                config : {
                    name : 'father_phone',
                    type : 'number',
                    id : 'father_phone',
                    placeholder : '01120000000'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                placeholderLanguage : 'en'
            },
            fatherJob : {
                element : 'input',
                label : 'Father Job',
                value : '',
                config : {
                    name : 'father_job',
                    type : 'text',
                    id : 'father_job',
                    placeholder : 'دكتور'
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                placeholderLanguage : 'ar'
            },
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
                vaildationMessage : '',
                arrayOfChoices : [],// firebase
                propertyToRender : ['centerName','centerID'], //  firebase
                menuLanguage : 'ar',
                isArrayOfObjects : true
            },
            groupID : {
                element : 'dropdown',
                label : 'Choose Group',
                value : '',
                config : {
                    name : 'group_choice',
                    id : 'group_choice',
                },
                vaildation : {
                    required : true,
                },
                vaild : false,
                vaildationMessage : '',
                arrayOfChoices : [],
                multiPropertiesToRender : true,
                menuLanguage : 'en',
                isArrayOfObjects : true
            }
        }
    }

    componentWillMount () {
        const {formData} = this.state;
        const newFormData = {...formData};
        const newElements = newFormData['centerID'];
        newElements.arrayOfChoices = centersCollection ; 
        newFormData['centerID'] = newElements ;
        this.setState({
            formData : newFormData
        })
    }

    componentWillUnmount() {
        clearTimeout(messageTimeout);
    }



    updateStudentForm = ({event : {target},formID}) => {
        const {formData} = this.state;
        const newFormData = {...formData};
        const newElements = newFormData[formID];
        const newGroups = newFormData['groupID'];
        newElements.value = target.value ;
        if(newFormData['centerID'].value && formID === 'centerID') {
            newGroups['arrayOfChoices'] = getGroupsDropArrayByID(groupCollection,target.value);
        }
        const {vaild,message} = validate(newElements);
        newElements.vaild = vaild ;
        newElements.vaildationMessage = message;
        newFormData['groupID'] = newGroups;
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
            console.log(dataToSubmit)
            this.setState({
                formSucces : `Add student ${dataToSubmit.studentName} successfuly 😊`
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
            formError : false,
            formData : newFormdata,
            formSuccess : ''
        })

    }


    render() {
        const {formData : {studentName,studentSchool,studentAddress,studentEmail,studentPhone,fatherJob,fatherPhone,centerID,groupID},formError} = this.state;
        return (
            <Fragment>
                <div className="Additions-Form">
                    <div className="Form-title">Add Student</div>

                    <form onSubmit = {this.submitForm} className = "Form" style={{display : 'flex' , flexWrap : 'wrap',justifyContent : 'center' ,  textAlign : 'center'}}>
                        <div className="left">
                            <FormField
                                formID = "studentName"
                                formInfo = {studentName}
                                onChange = {(element) => this.updateStudentForm(element)}
                            />
                            <FormField
                                formID = "studentEmail"
                                formInfo = {studentEmail}
                                onChange = {(element) => this.updateStudentForm(element)}
                            />
                            <FormField
                                formID = "studentPhone"
                                formInfo = {studentPhone}
                                onChange = {(element) => this.updateStudentForm(element)}
                            />
                            <FormField
                                formID = "studentSchool"
                                formInfo = {studentSchool}
                                onChange = {(element) => this.updateStudentForm(element)}
                            />
                        </div>
                        <div className="right">
                            <FormField
                                formID = "studentAddress"
                                formInfo = {studentAddress}
                                onChange = {(element) => this.updateStudentForm(element)}
                            />
                            <FormField
                                formID = "fatherJob"
                                formInfo = {fatherJob}
                                onChange = {(element) => this.updateStudentForm(element)}
                            />
                            <FormField
                                formID = "fatherPhone"
                                formInfo = {fatherPhone}
                                onChange = {(element) => this.updateStudentForm(element)}
                            />

                            <FormField
                            formID = "centerID"
                            formInfo = {centerID}
                            onChange = {(element) => this.updateStudentForm(element)}
                            studentDropDown = 'true'

                            />

                            <FormField
                            formID = "groupID"
                            formInfo = {groupID}
                            onChange = {(element) => this.updateStudentForm(element)}
                            studentDropDown = 'true'

                            />
                            <button  className="Form-submit" onClick={this.submitForm}>submit</button>
                        </div>
                    </form>
                    {formError ? failedRegister('Please fill all the form fields !') : null}

                </div>
            </Fragment>
        )
    }
}
