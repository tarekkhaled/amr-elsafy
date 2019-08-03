import swal from 'sweetalert';

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


export {succesRegister,failedRegister}