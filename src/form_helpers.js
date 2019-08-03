import swal from 'sweetalert';
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


export {checkFromFireBase} ;