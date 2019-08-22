import swal from 'sweetalert';

// vaildation form email and any other input
export const validate = ({vaildation:{required,email},value}) => {
    let errorOjbect = {
        message : '',
        vaild : true
    }

    if (email) {
        errorOjbect = (/\S+@\S+\.\S+/.test(value)) ? errorOjbect : {message : 'Not vaild email', vaild : false }
    }

    if (required) {
        errorOjbect = value ? errorOjbect : {message : 'This field is required', vaild : false }
    }

    return errorOjbect ;
}




export const allFormIsVaild = (formData,dataToSubmit) => {
    let formVaild = true; 
    for (let key in formData) {
        // you have 2 key one form email and one for password
        dataToSubmit[key] = formData[key].value;
        formVaild = formData[key].vaild && formVaild /* the second check to avoid change formVaild to true if the last input is true and the ones before it is false don't */
    }
    return formVaild

}


export const succesRegister = (message,buttonName) => {

    swal({
        title: "Good job!",
        text: message ,
        icon: "success",
        button: buttonName ? buttonName : false,
      });
    
}


export const failedRegister = (message) => {
    swal(`${message}`)
}
