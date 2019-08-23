import React, { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {renderDropDowns} from '../component_helpers/helpers';


export default function FormField(
    {   formID,
        formInfo:{element,vaildation,vaild,vaildationMessage,config,value,label,arrayOfChoices,isArrayOfObjects,propertyToRender,menuLanguage},onChange
    }) 

    {

    const showError = () => {
        let errorMessage = <Fragment>
            {
                (vaildation && vaild ) ?  null : <div className={`${vaildationMessage? 'Form-error' : ''}`}>{vaildationMessage}</div>
            }
        </Fragment>
        return errorMessage;
    }

    
    const showField = () => {
        let formTemplate = null;
        switch (element) {
            case 'input':
                formTemplate = (
                    <div className="Form-field">
                            <label className="Form-label" htmlFor={config.id}>{label}:</label>
                            <input 
                                onChange={(event)=>onChange({event,formID})}
                                className="Form-input" {...config} 
                                value={value} 
                                autoComplete={formID === 'password' ? 'current-password' : ''}
                            />
                            {showError()}
                    </div>
                )
                break;
            case 'dropdown' : 
                formTemplate = (
                    <FormControl  
                        style={{
                            display : 'flex',
                            minWidth : '400px',
                            marginBottom : '10px'
                        }}>
                        <InputLabel 
                            htmlFor={config.id}
                            style = {{
                                left : '0',
                                color : '#F1D885',
                                fontFamily : 'Tajawal , sans-serif'
                            }}
                        >
                            {label}
                        </InputLabel>
                        <Select
                            style = {{
                                textAlign : 'right',
                                color : '#8a8a8a'
                            }}
                            onChange = {(event) => onChange({event,formID})}
                            value = {value}
                            inputProps={{
                                        name: config.name,
                                        id: config.id
                                    }}
                        >                    
                             { renderDropDowns(arrayOfChoices,isArrayOfObjects,propertyToRender,menuLanguage)}
                        </Select>
                    </FormControl>
                )
                break;
                default:
                    formTemplate = null
                break;
        }
        return formTemplate;
    }
    return (
        <Fragment>
            {showField()}
        </Fragment>
    )
}
