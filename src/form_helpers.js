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

function createDropDownField (selectFor,selectArray,selectName) {
    return {
        selectFor,
        selectArray,
        selectName
    }
}
function vaildSubmitFields (obb,currentField) {
    let checkFlag = true ; 
    for (const key in obb) {
            if(!key.includes(currentField) && key.includes('error')) {
                checkFlag = obb[key] === 'no' ? true : false ;
            }
    }
    return checkFlag ;
}

function checkFromFireBase(firebaseMessage,pathtoGoIFSuccess) {
    if(firebaseMessage.length > 0) {
        failedRegister();
    }
    else {
        succesRegister(pathtoGoIFSuccess)
    }

}
function succesRegister (pathtoGo,messageFB) {
    
    console.log(messageFB)
    swal({
        title: "Good job!",
        text: (!messageFB)? "تم التسجيل الدخول بنجاح" : messageFB ,
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


export {createInputField,createDropDownField,checkFromFireBase,failedRegister,vaildSubmitFields,succesRegister} ;