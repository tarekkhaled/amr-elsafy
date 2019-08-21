export const validate = ({value,vaildation : {required,email}})=> {
    
    let noErrors = [true,''];

    if(email) {
        const vaild = /\S+@\S+\.\S+/.test(value);
        const message = `${!vaild ? 'This is not a vaild email' : ''}`;
        noErrors = !vaild ? [vaild,message] : noErrors; 
    }
    if(required) {
        const vaild = value.trim() !== ''; // true means that he write something
        const message = ` ${!vaild ? 'this field is required' : ''}`;
        noErrors = !vaild ? [vaild,message] : noErrors ; 
    }
    return noErrors;
}

