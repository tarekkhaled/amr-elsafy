import swal from 'sweetalert';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';



function createInputField (label,type,name,placeholder,errorPlace) {
    return {
        label_name : label,
        type : type,
        input_name : name,
        placeholder : placeholder,
        error : errorPlace
    }

}


export function renderDropDown(key,classes,dropDownObject,handleChange,value,comeFromFireBase) {
    return(
      <FormControl  key = {key} className={classes.FormControl}>
                        <InputLabel className={classes.Label} htmlFor={dropDownObject.selectFor}>{dropDownObject.selectName}</InputLabel>
                        <Select
                            className ={classes.Select}
                            onChange = {handleChange}
                            value = {value}
                            inputProps={{
                                        name: dropDownObject.selectFor,
                                        id: dropDownObject.selectFor,
                                    }}
                                 > 
                            
                            { 
                                (comeFromFireBase) ?   comeFromFireBase.map((item,index)=>
                            <MenuItem className={classes.Menu} key={item} value = {item}> {item} </MenuItem>
                            ) :   dropDownObject.selectArray.map((item,index)=>
                            <MenuItem className={classes.Menu} key={item} value = {item}> {item} </MenuItem>
                            )} }
                            </Select>
    </FormControl> )  
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
            if(!checkFlag)
                break;
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


function failedRegister (para) {
    if(!para)
    {
        swal('!!! راجع حسابك و كلمة السر',)
    }
    swal(para)
}


export {createInputField,createDropDownField,checkFromFireBase,failedRegister,vaildSubmitFields,succesRegister} ;