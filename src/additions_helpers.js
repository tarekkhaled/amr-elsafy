import React from 'react' ;
import {createInputField} from './form_helpers';
import Form from './form';


function addAssistantForm () {
    return <Form 
        title = 'اضافة اسيسنت'
        form =  'login_assistant'
        buttonSubmit = 'true'
        input_field1 = {createInputField(': البريد الالكتروني','email','assistant_mail','... البريد الالكتروني','error_assistant_mail')}
        input_field2 = {createInputField('تليفون المحمول','number','assistant_number','... تليفون المحمول','error_assistant_number')}
        input_field3 = {createInputField(': الاسم الاول','text','assistant_firstName','... الاسم الاول','error_assistant_firstName')}
        input_field4 = {createInputField(': الاسم الاخير','text','assistant_lastName','... الاسم الاخير','error_assistant_lastName')}
    />             
}


function addCenterForm() {
    return <Form 
    title = 'اضافة سنتر'
    form =  'login_center'
    buttonSubmit = 'true'
    input_field1 = {createInputField(': اسم السنتر','text','center_name','... اسم السنتر','error_center_name')}
    input_field2 = {createInputField('رقم السنتر','number','center_number','... رقم السنتر','error_center_number')}
    input_field3 = {createInputField(': عنوان السنتر','text','center_address','... عنوان السنتر','error_center_address')}
/>  
}


function boss_nav (active) {
    const array = [
        createNav_li('اضافة سنتر',(active === 'center'),3,'center_li'),
        createNav_li('اضافة مجموعة',(active === 'session'),4,'session_li'),
        createNav_li('اضافة طالب',(active === 'student'),2,'student_li'),
        createNav_li('اضافة اسيسنت',(active === 'assistant'),1,'assistant_li')]

    return array;
}



function createNav_li (textContent,active=false,num,idName) {
    return <li id={idName   } key={num} className={`Additions-card-box ${active ?'Addition-card-box-active' : ''}` }>
        <i className="fas fa-plus fa-1x"></i>
        <p>{textContent}</p>
    </li>
}


function assistant_nav (active) {
    const array = [
        createNav_li('اضافة سنتر',(active === 'center'),2,'center_li'),
        createNav_li('اضافة مجموعة',(active === 'session'),3,'session_li'),
        createNav_li('اضافة طالب',(active === 'student'),1,'student_li')]
    return array ;
}


function whatElementFireTheEvent (e) {
    if(e.target.nodeName === 'LI') {
        return (e.target.id)
    }
    if(e.target.nodeName === 'P' || e.target.nodeName === 'I') {
        return(e.target.parentNode.id)
    }
}

export {addAssistantForm,boss_nav,whatElementFireTheEvent,assistant_nav,addCenterForm};