import React from 'react';
import swal from 'sweetalert';


function createInputField (label,type,name,placeholder,errorPlace) {
    return {
        label_name : label,
        type : type,
        input_name : name,
        placeholder : placeholder,
        error : errorPlace
    }

}


function createNav_li (textContent,active=false,num) {
    return <li  key={num}className={`Additions-card-box ${active ?'Addition-card-box-active' : ''}`}>
        <i className="fas fa-plus fa-1x"></i>
        <p>{textContent}</p>
    </li>
}


function boss_nav (active) {
    const array = [createNav_li('اضافة اسيسنت',(active === 'assistant'),0),
    createNav_li('اضافة طالب',(active === 'student'),1),
    createNav_li('اضافة سنتر',(active === 'center'),2),
    createNav_li('اضافة مجموعة',(active === 'session'),3) ]

    return array;
}

function assistant_nav (active) {
    const array = [
        createNav_li('اضافة طالب',(active === 'student'),1),
        createNav_li('اضافة سنتر',(active === 'center'),2),
        createNav_li('اضافة مجموعة',(active === 'session'),3) ]
    return array ;
}
function checkFromFireBase(firebaseMessage,pathtoGoIFSuccess) {
    if(firebaseMessage.length > 0) {
        failedRegister();
    }
    else {
        succesRegister(pathtoGoIFSuccess)
    }

}
function succesRegister (pathtoGo) {
    
    swal({
        title: "Good job!",
        text: "تم التسجيل الدخول بنجاح",
        icon: "success",
        button: false,
      });
    setTimeout(() => {
        window.location.assign(pathtoGo) /* will be updated to Profile for user,assistant,amrElsafiy */
    }, 2000);
}


function failedRegister () {
    swal('!!! راجع حسابك و كلمة السر',)
}


export {createInputField,checkFromFireBase,failedRegister,boss_nav,assistant_nav} ;