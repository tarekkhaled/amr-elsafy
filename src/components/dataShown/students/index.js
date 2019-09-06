import React, { Component, Fragment } from 'react';
import FormField from '../../../reComponents/formField';
import {getGroupsDropArrayByID,allFormIsVaild} from '../../../component_helpers/helpers';
import '../../../resources/css/dataShown.css'
import '../../../resources/css/responsive.css'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NavButton from '../../../reComponents/navButton';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#2f253b',
      color: theme.palette.common.white,
      fontSize : '17px'
    },
    body: {
      fontSize: 15,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  
const centers = [
    {
        centerName : 'ام ابراهيم',
        centerID : 1200
    },
    {
        centerName : 'ام نحمدو',
        centerID : 1300
    },
    {
        centerName : 'ام شربات',
        centerID : 1400
    }
]
const groups = [   
    {
        groupID : 12,
        centerID : 1200,
        timeStart : '1:00AM',
        timeEnd : '3:00AM',
        day : 'sunday',
        students : [ {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 'erwerr324324234',
            centerID : 111,
            groupID : 10232131
        }, {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 'hkjewriojwk3242432',
            centerID : 111,
            groupID : 10232131
        }, {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        }, {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        }, {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        },],
        studentsNumber : 5
    },
    {
        groupID : 13,
        centerID : 1300,
        timeStart : '9:00AM',
        timeEnd : '12:00AM',
        day : 'friday',
        studentsNumber : 2,
        students : [ {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        }, {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        },]
    },
    {
        groupID : 11,
        centerID : 1200,
        timeStart : '4:00AM',
        timeEnd : '6:00AM',
        day : 'monday',
        studentsNumber : 4,
        students : [ {
            studentName : 'tarek khaled',
            studentMail : 'tarekt820@gmail.com',
            studentPassword : 200888,
            fatherPhone : '08127832183',
            studentPhone : '017217302',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        },
        {
            studentName : 'mohame khaled',
            studentMail : 'omom@gmail.com',
            studentPassword : 212888,
            fatherPhone : '081232132183',
            studentPhone : '01141073',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        },
        {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        },
        {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        },
    ]

    },
    {
        groupID : 19,
        centerID : 1400,
        timeStart : '9:00PM',
        timeEnd : '12:00PM',
        day : 'sunday',
        studentsNumber : 3,
        students : [ {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        }, {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        }, {
            studentName : 'khaled abdllah',
            studentMail : 'khaled@gmail.com',
            studentPassword : 244888,
            fatherPhone : '01231231131',
            studentPhone : '0172301273',
            studentID : 12323,
            centerID : 111,
            groupID : 10232131
        },]

    }
]


export default class Students extends Component {
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
                menuLanguage : 'ar',
                isArrayOfObjects : true
            }
        }
    }

    removeStudent = (e) => {
        let returnObject ;

        if(e.target.nodeName === 'BUTTON') {
            console.log(e.target.id)
            returnObject = {id: (e.target.id)};
        }
        else {
            returnObject = {id :(e.target.parentNode.id)}
        }
        console.log(returnObject)
    }
    componentDidMount(){
        const {formData} = this.state;
        const newFormData = formData;
        const newCentersID = newFormData['centerID'];
        newCentersID.arrayOfChoices = centers;
        newFormData['centerID'] = newCentersID;
        this.setState({
            formData : newFormData
        })

    }
    updateStudentForm = ({event : {target},formID}) => {
        const {formData} = this.state;
        const newFormData = {...formData};
        const newElements = newFormData[formID];
        const newGroups = newFormData['groupID'];
        newElements.value = target.value ;
        newElements.vaild = true
        if(newFormData['centerID'].value && formID === 'centerID') {
            newGroups['arrayOfChoices'] = getGroupsDropArrayByID(groups,target.value);
        }
        newFormData['groupID'] = newGroups;
        newFormData[formID] = newElements ; 
        this.setState({
            formData : newFormData,
        })
        
    }
    DealWithFireBase = (formData) => {
        const dataToSubmit = {} ;
        if(allFormIsVaild(formData,dataToSubmit)) {
            const foundedGroup = groups.find((group) => group.centerID === dataToSubmit.centerID && group.groupID === dataToSubmit.groupID)
            if(foundedGroup && foundedGroup.students) {
                return this.renderTable(foundedGroup,foundedGroup.students)
            } else {
                return null
            }
            
            
        }
    }
    renderTable = (foundedGroup,rows) => {
    return  <Fragment>
         <div className="students-number">
                    Number of students : {foundedGroup.studentsNumber}
        </div>
        <Paper style={{overflowX : 'scroll'}}>    
                <Table >
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Students</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Password</StyledTableCell>
                        <StyledTableCell align="right">Father's Phone</StyledTableCell>
                        <StyledTableCell align="right">Profile</StyledTableCell>
                        <StyledTableCell align="right">Remove</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row,i) => (
                        <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                            {row.studentName}
                        </StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{row.studentMail}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{row.studentPassword}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{row.fatherPhone}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton 
                                icon = "fas fa-user-circle"
                                withLink = 'true'
                                linkTO = {`student/${row.studentID}`}
                                tableNav = 'true'
                            />
                        </StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton
                                icon = "fas fa-trash"
                                tableNav = 'true'
                                id = {row.studentID}
                                onChange = {(e) => {this.removeStudent(e)}}
                                
                            /> 
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>

    </Fragment>
    }
    render() {
        const {formData,formData : {centerID,groupID}} = this.state;
        return (
          <div className = "Data-table">
              <div className="Data-table-dropdown">
                <FormField 
                    formID = 'centerID'
                    formInfo = {centerID}
                    onChange ={(element)=>{this.updateStudentForm(element)}}
                />
              </div>
             
             <div className="Data-table-dropdown">
                <FormField 
                    formID = 'groupID'
                    formInfo = {groupID}
                    onChange ={(element)=>{this.updateStudentForm(element)}}
                />
             </div>

             <div className="Data-table-shown">
                 {this.DealWithFireBase(formData)}
             </div>
          </div>
        )
    }
}
