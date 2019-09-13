import React , {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormField from '../../../../reComponents/formField';


const groups = [
    {
        StudentsNumber: 226,
        centerID: "22",
        centerName: "trika",
        day: "Saturday",
        groupID: "3m748nBxdIrawbYBcKkY9q",
        timeEnd: "11:00 AM",
        timeStart: "8:00 AM",
        studentsNumber : '213'
    },
    {
        StudentsNumber: 220,
        centerID: "220",
        centerName: "trika",
        day: "Saturday",
        groupID: "3m748nBxdIrbwqwYBcKkY9q",
        timeEnd: "9:00 PM",
        timeStart: "12:00 PM",
        studentsNumber : '213'
    },
    {
        StudentsNumber: 220,
        centerID: "100",
        centerName: "messi",
        day: "Sunday",
        groupID: "3m748nfffBxdIrbYBcKkY9q",
        timeEnd: "1:00 PM",
        timeStart: "12:00 PM",
        studentsNumber : '213'
    },
    {
        StudentsNumber: 220,
        centerID: "121",
        centerName: "neymar",
        day: "tarekday",
        groupID: "3m748nBxaadIrbYBcKkY9q",
        timeEnd: "23:00 AM",
        timeStart: "24:00 PM",
        studentsNumber : '213'
    },
    {
        StudentsNumber: 220,
        centerID: "74",
        centerName: "salah",
        day: "friday",
        groupID: "3m748ssnBxdIrbYBcKkY9q",
        timeEnd: "5:00 AM",
        timeStart: "7:00 PM",
        studentsNumber : '213'
    },
    
]
const centers = [
    {
      centerName : 'trika',
      centerAddress : 'Saudia Mekkah',
      centerID : '22',
      phoneNumber : '01142739179239',
      noGroups : 1028,
      noStudents : 1019

    },
    {
        centerName : 'messi',
        centerAddress : 'Saudia Jeddeh',
        centerID : '10',
        phoneNumber : '0102810291819',
        noGroups : 1028,
        noStudents : 1019
    },
    {
        centerName : 'neymar',
        centerAddress : 'Saudia Cairo',
        centerID : '11',
        phoneNumber : '01142739179239',
        noGroups : 1028,
        noStudents : 1019
    },
    {
        centerName : 'salah',
        centerAddress : 'Saudia Alexandria',
        centerID : '74',
        phoneNumber : '0213721037071',
        noGroups : 1028,
        noStudents : 1019
    },

]

export default class Create extends Component {

    state = {
        formData : {
            centerID : {
                element : 'dropdown',
                label : 'Choose Center',
                value : '',
                config : {
                    name : 'center_choice',
                    id : 'center_choice',
                },
                arrayOfChoices : [],// firebase
                propertyToRender : ['centerName','centerID'], //  firebase
                menuLanguage : 'ar',
                isArrayOfObjects : true
            },
            groupID : {
                element : 'dropdown',
                label : 'Choose Group',
                value : '',
                config : {
                    name : 'group_choice',
                    id : 'group_choice',
                },
                arrayOfChoices : [],
                multiPropertiesToRender : true,
                menuLanguage : 'en',
                isArrayOfObjects : true
            },
        },
        open : this.props.open ,
        dataToSubmit : {
            oldGroup_ID: '',
            oldCenter_ID: '',
            newGroup_ID : '',
            newCenter_ID : ''
        }
    }

    closePopUP = (e)=> {
       this.setState({
           open : !this.state.open
       })
   }

    updateChioce = ({event : {target},formID}) => {
    const {formData} = this.state;
    const newFormData = {...formData};
    const newElements = newFormData[formID];
    newElements.value = target.value ;
    newFormData[formID] = newElements ; 
    this.setState({
        formData : newFormData,
        formError : false
    })
    }

    componentDidMount(){
        this.setState({
            centersCollection : centers,
            groupsCollection : groups
        } , () => {
            const formData = this.state.formData ;
            const newFormData = {...formData} ;
            const newGroupsElement = newFormData['groupID'];
            const newCentersElement = newFormData['centerID'];
            newGroupsElement.arrayOfChoices = this.state.groupsCollection;
            newCentersElement.arrayOfChoices = this.state.centersCollection;
            newFormData['centerID'] = newCentersElement
            newFormData['groupID'] = newGroupsElement;
            this.setState({
                formData : newFormData
            })
        }) 

    }

    submitButton = (e) => {
        const {dataToSubmit,formData : {centerID,groupID}} = this.state;
        const newDataToSubmit = {...dataToSubmit};
        newDataToSubmit['newCenter_ID'] = centerID.value;
        newDataToSubmit['newGroup_ID'] = groupID.value;
        newDataToSubmit['oldCenter_ID'] = this.props.old.centerID;
        newDataToSubmit['oldGroup_ID'] = this.props.old.groupID;
        console.log(newDataToSubmit);
        this.setState({
            dataToSubmit : newDataToSubmit,
            open : false
        })
 
    }

    render() {
        const {open,formData:{centerID,groupID}} = this.state ; 
        return (
            <Dialog  open={open} aria-labelledby="form-dialog-title">
                <DialogContent style = {{backgroundColor : '#13131f' , textAlign :'center'}}>
                        <div className ="close-div" style={{textAlign : 'right' , padding : '20px' , cursor : 'pointer' , color : 'beige'}}>
                        <i className="fas fa-window-close fa-2x" onClick = {this.closePopUP}></i>
                    </div>    
                    <div style = {{padding : '3rem'}}>
                        <FormField
                                formID = "centerID"
                                formInfo = {centerID}
                                onChange = {(element) => this.updateChioce(element)}
                        />
                        <FormField
                                formID = "groupID"
                                formInfo = {groupID}
                                onChange = {(element) => this.updateChioce(element)}
                        />
                    </div>
                    <button onClick = {this.submitButton}style = {{marginBottom : '20px' ,padding: '5px 16px',border: '1px solid #777',color: '#fff'}}>Submit</button>
                </DialogContent>
            </Dialog>
        )

    }
    
}