import React from 'react';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';


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



export const renderDropDowns = (arrayOfChoices,isArrayOfObjects,propetyToRender) => {
    if(isArrayOfObjects)
    {
        return  arrayOfChoices.map(({propetyToRender},index)=>
            <MenuItem 
                key={index} 
                value = {propetyToRender}
                style = {{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontFamily : 'Tajawal , sans-serif',
                    fontWeight : '600',

                }}
            >
                {propetyToRender} 
            </MenuItem>
        )

    } else {
        return  arrayOfChoices.map((element,index)=>
            <MenuItem 
                key={index} 
                value = {element}
                style = {{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontFamily : 'Tajawal , sans-serif',
                    fontWeight : '600',

                }}
            >
                {element} 
            </MenuItem>
        )
    }
}