import React , {Component} from 'react';
import './css/form.css';

class Form extends Component {
    state = { 
        login_form_student : {
            student_name : '',
            student_code : ''
        },
      
    }


    handleChange =  (e) => {
         this.updateWhichForm(this.props.form,e)
    }
    

    renderTheComingForm = ()=>{
        const inputsToShown = []
        const input_value_part1 = this.props.form;
        for (let key in this.props) {
            if(`${key}`.includes('_field'))
            {
                const inputvalue_part2 = this.props[key].input_name;
                inputsToShown.push(
                    <div className="Form-field" key={this.props[key].label_name}>
                        <input className="Form-input" value = {this.state[input_value_part1][inputvalue_part2]}  id={this.props[key].label_name} onChange={this.handleChange} type={this.props[key].type} placeholder={`...${this.props[key].label_name}`} name={this.props[key].input_name} />
                        <label className="Form-label" htmlFor={this.props[key].label_name}>{`:${this.props[key].label_name}`}</label>
                </div>)

            }

              
            }
            return inputsToShown
    }

    handleSubmit= (e) => {
        e.preventDefault();
        console.log(this.props);
    }


    updateWhichForm =  (formComing,e) => {
        if (formComing === 'login_form_student')
        {
            this.setState(
                { login_form_student : { ...this.state.login_form_student, [e.target.name]: e.target.value} 
            });  
        }
       
    }
    

    render () {
        return (
            <form className="Form">
                {this.renderTheComingForm()}
            <button className="Form-submit" onClick = {this.handleSubmit}type="submit">تسجيل الدخول</button>
            </form>
        )
    }
}


export default Form ; 