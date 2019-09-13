import React, { Component, Fragment } from 'react';
import FormField from '../../../reComponents/formField';
import Search from '../../search';
import {getIndexForItem} from '../../../component_helpers/helpers'
import '../../../resources/css/dataShown.css';
import '../../../resources/css/responsive.css'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NavButton from '../../../reComponents/navButton';
import {students} from '../../../students';
import swal from 'sweetalert';
import POPUP from './popup';

const style = {
    border : '1px solid #4e4c4c',
    borderRadius : '11px' ,
    padding : '20px',
    margin : '20px',
    textAlign : 'left'
}
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

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#2f253b',
      color: theme.palette.common.white,
      fontSize : '16px'
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

export default class Centers_Groups_data extends Component {
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
                centerID_ToGO : {
                    element : 'dropdown',
                    label  : 'Choose Center To Move in',
                    value : '',
                    config : {
                        name : 'center_togo_choice',
                        id : 'center_togo_choice'
                    },
                    arrayOfChoices : [],
                    propertyToRender : ['centerName','centerID'],
                    menuLanguage : 'ar',
                    isArrayOfObjects : true
                },
                groupID_ToGO : {
                    element : 'dropdown',
                    label : 'Choose Group To Move in',
                    value : '',
                    config : {
                        name : 'group_choice',
                        id : 'group_choice',
                    },
                    arrayOfChoices : [],
                    multiPropertiesToRender : true,
                    menuLanguage : 'en',
                    isArrayOfObjects : true
                }
            },
            centersCollection : [], 
            groupsCollection : [],
            searchValue : '',
            studentsToBeShown : [],
            /** for transfer random students from one group to another */
            dataToSubmit : {
                studentsToMove : [],
                centerID : '',
                groupID : '',
                centerID_ToGO : '',
                groupID_ToGO : '',
            },   
            showColumn : true,
            popUP : false,
            /** This will be assisgned when he selected move button for any group */
            selectedGroupToMove : {
                centerID : '',
                groupID : ''
            }
    }
    componentDidMount(){
        this.setState({
            centersCollection : centers,
            groupsCollection : groups
        } , () => {
            const formData = this.state.formData ;
            const newFormData = {...formData} ;
            const newGroupsElement = newFormData['groupID'];
            const newGroupsElement2 = newFormData['groupID_ToGO'];
            const newCentersElement = newFormData['centerID'];
            const newCentersElement2 = newFormData['centerID_ToGO'];
            newGroupsElement.arrayOfChoices = this.state.groupsCollection;
            newGroupsElement2.arrayOfChoices = this.state.groupsCollection;
            newCentersElement.arrayOfChoices = this.state.centersCollection;
            newCentersElement2.arrayOfChoices = this.state.centersCollection;
            newFormData['centerID'] = newCentersElement
            newFormData['centerID_ToGO'] = newCentersElement2
            newFormData['groupID'] = newGroupsElement;
            newFormData['groupID_ToGO'] = newGroupsElement2;
            this.setState({
                formData : newFormData
            })
        }) 

    }
    removeGroup = (e) => {
        let returnObject ;
        if(e.target.nodeName === 'BUTTON') {
            returnObject = {id : (e.target.id)}
        } else {
            returnObject = {id :(e.target.parentNode.id)}
        }
        console.log(returnObject)
    }
    showStudentsInSearch = (inputValue) => {
        const {formData : {centerID,groupID}} = this.state;
        /* here the id of group and center that selected for get the array of students inside this group*/
        const studentsShown = students.filter((student) => student['studentName'].toLowerCase().includes(inputValue.toLowerCase())) 
        this.setState({
            studentsToBeShown :(inputValue) ? studentsShown : []
        })
        
    }
    updateSearchBox = (e) => {
        let searchValue = e.target.value;
        const {formData} = this.state;
        const newFormData = {...formData};
        newFormData['centerID'].arrayOfChoices = [];
        newFormData['groupID'].arrayOfChoices = [];
        this.setState({
            
            [e.target.name] : searchValue,
        },this.showStudentsInSearch(searchValue))

    }
    removeCenterOrGroup = (e,table) => {
        let id ;
        if(e.target.nodeName === 'BUTTON') {
            id = e.target.id;
        } else {
            id  = (e.target.parentNode.id) 
        }
        if(table === 'center') {
            const index = getIndexForItem(id,this.state.centersCollection,'centerID');
            // al mafrood ncheck b2a 3la students number fe al center dh lw 0 yms7 3ltool
            // lw la my3mla4 7aga 
            /*
            this.setState({
                centersCollection : this.state.centersCollection.filter((element,i) => i !== index)
            })
            */
        }
        else {
            const index = getIndexForItem(id,this.state.groupsCollection,'groupID');
            // al mafrood ncheck b2a 3la students number fe al center dh lw 0 yms7 3ltool
            // lw la my3mla4 7aga 

            /*
            this.setState({
                groupsCollection : this.state.groupsCollection.filter((element,i) => i !== index)
            }) */
        }
    }
    showTransferPoPup = (e) => {
        return <POPUP open = {this.state.popUP}  old ={this.state.selectedGroupToMove}/>
    }
    dangerousRemoveCenterOrGroup = (e,table) => {
        const id = e.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              if(table === 'center') {
                    const index = getIndexForItem(id,this.state.centersCollection,'centerID');
                    this.setState({
                        centersCollection : this.state.centersCollection.filter((element,i) => i !== index)
                    })
              }
              else {
                    const index = getIndexForItem(id,this.state.groupsCollection,'groupID');
                    this.setState({
                        groupsCollection : this.state.groupsCollection.filter((element,i) => i !== index)
                    })
              }
            } 
          });
    }
    renderCentersTable = (Centers) => {
    return  <Fragment>
        <Paper style={{overflowX : 'scroll'}}>    
                <Table>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Centers</StyledTableCell>
                        <StyledTableCell align="right">Center Phone</StyledTableCell>
                        <StyledTableCell align="right">Center Address</StyledTableCell>
                        <StyledTableCell align="right">Groups Number</StyledTableCell>
                        <StyledTableCell align="right">Students Number</StyledTableCell>
                        <StyledTableCell align="right">Remove Center</StyledTableCell>
                        {this.state.showColumn && <StyledTableCell align="right">Dangerous Remove Center
                            </StyledTableCell>}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {Centers.map((center,i) => (
                        <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                            {center.centerName}
                        </StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{center.phoneNumber}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{center.centerAddress}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{center.noGroups}   
                        </StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{center.noStudents}   
                        </StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton
                                icon = "fas fa-trash"
                                tableNav = 'true'
                                id = {center.id}
                                onChange = {(e) => {this.removeCenterOrGroup(e,'center')}}
                            /> 
                        </StyledTableCell>
                        {this.state.showColumn && <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton
                                tableNav = 'true'
                                name = "Dn Remove"
                                id = {center.centerID}
                                onChange = {(e) => {this.dangerousRemoveCenterOrGroup(e,'center')}}
                            /> 
                        </StyledTableCell>}
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
    </Fragment>
    }
    updatePOPUP = (e,groupID,centerID) => {

        const {selectedGroupToMove} = this.state;
        const newSelectedGroupToMOve = {...selectedGroupToMove};
        newSelectedGroupToMOve['groupID'] = groupID
        newSelectedGroupToMOve['centerID'] = centerID

        this.setState({
            selectedGroupToMove : newSelectedGroupToMOve,
            popUP : true
        })
    }
    renderGroupsTable = (Groups) => {
        return  <Fragment>
            <Paper style={{overflowX : 'scroll'}}>    
                    <Table >
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Center Name</StyledTableCell>
                            <StyledTableCell align="right">Day</StyledTableCell>
                            <StyledTableCell align="right">Starting Time</StyledTableCell>
                            <StyledTableCell align="right">Ending Time</StyledTableCell>
                            <StyledTableCell align="right">Students Number</StyledTableCell>
                            {this.state.showColumn &&<StyledTableCell align="right">Move Group</StyledTableCell>}
                            <StyledTableCell align="right">Remove</StyledTableCell>
                            {this.state.showColumn &&<StyledTableCell align="right">Dangerous Remove Group</StyledTableCell>}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {Groups.map((group,i) => (
                            <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row">
                                {group.centerName}
                            </StyledTableCell>
                            <StyledTableCell style={{background: '#fff'}} align="right">{group.day}</StyledTableCell>
                            <StyledTableCell style={{background: '#fff'}} align="right">{group.timeStart}</StyledTableCell>
                            <StyledTableCell style={{background: '#fff'}} align="right">{group.timeEnd}   
                            </StyledTableCell>
                            <StyledTableCell style={{background: '#fff'}} align="right">{group.studentsNumber}   
                            </StyledTableCell>
                            {this.state.showColumn &&
                            <StyledTableCell style={{background: '#fff'}} align="right">
                                <NavButton
                                    tableNav = 'true'
                                    id = {group.groupID}
                                    name = "move"
                                    onChange = {(e) => this.updatePOPUP(e,group.groupID,group.centerID)}   
                                /> 
                            </StyledTableCell>}
                            <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton
                                icon = "fas fa-trash"
                                tableNav = 'true'
                                id = {group.groupID}
                                onChange = {(e) => {this.removeCenterOrGroup(e,'group')}}       
                            /> 
                            </StyledTableCell>
                            {this.state.showColumn &&
                            <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton
                                tableNav = 'true'
                                id = {group.groupID}
                                name = "Dg Remove"
                                onChange = {(e) => {this.dangerousRemoveCenterOrGroup(e,'group')}}       
                            /> 
                            </StyledTableCell>}
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
    
        </Fragment>
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
    speedRemoveForStudent = (index) => {
        const {dataToSubmit} = this.state;
        const newDataToSubmit = {...dataToSubmit};
        const newArrays = newDataToSubmit['studentsToMove'];
        newArrays.splice(index,1);
        newDataToSubmit['studentsToMove'] = newArrays;
        this.setState({
            dataToSubmit : newDataToSubmit 
        })     
    }
    resultFromSearch = (studentObject) => { 
        const {formData : {centerID,groupID}} = this.state
        /** Part of student in search when clicked */
        const {dataToSubmit} = this.state;
        const newDataToSubmit = {...dataToSubmit};
        let newArrays = newDataToSubmit['studentsToMove'];
        newArrays = [...newArrays,studentObject]
        newDataToSubmit['studentsToMove'] = newArrays;

        /** Part of put centerID,GroupID in dataToSubmit */
        let newGroupID = newDataToSubmit['groupID'];
        newGroupID = groupID.value;
        let newCenterID = newDataToSubmit['centerID'];
        newCenterID = centerID.value;

        newDataToSubmit['centerID'] = newGroupID;
        newDataToSubmit['groupID'] =  newCenterID;
        this.setState({
            dataToSubmit : newDataToSubmit 
        })     
    }
    submitForm = (e) => {
        const {formData : {centerID_ToGO,groupID_ToGO}} = this.state;
        e.preventDefault();
        const {dataToSubmit} = this.state;
        const newDataToSubmit = {...dataToSubmit};
        let newCenterToGo = newDataToSubmit['centerID_ToGO'];
        newCenterToGo = centerID_ToGO.value;
        let newGroupToGo = newDataToSubmit['centerID_ToGO'];
        newGroupToGo = groupID_ToGO.value;
        newDataToSubmit['groupID_ToGO'] = newGroupToGo;
        newDataToSubmit['centerID_ToGO'] = newCenterToGo;
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

        this.setState({
            dataToSubmit : newDataToSubmit
        }, () => {
            console.log(this.state.dataToSubmit);
            //window.location.assign('/Groups_Centers_info'); /** khaled */
        })

        
    }
    render() {
        const {centersCollection,groupsCollection,formData : {centerID,centerID_ToGO,groupID_ToGO,groupID},dataToSubmit : {studentsToMove},popUP} = this.state;
        return (
            <Fragment>
                <div className = "Data-table">
                    <div className="students-move">
                        <div className="students-move-left">
                                <form>
                                    <div className="students-move-navbar">
                                        <div className="form-field-nav">
                                            <FormField
                                                formID = "centerID"
                                                formInfo = {centerID}
                                                onChange = {(element) => this.updateChioce(element)}
                                                studentDropDown = 'true'
                                            />
                                        </div>

                                        <div className="form-field-nav">
                                            <FormField
                                                formID = "groupID"
                                                formInfo = {groupID}
                                                onChange = {(element) => this.updateChioce(element)}
                                                studentDropDown = 'true'
                                            />
                                        </div>

                                        <div className = "students-to-move" style = {(studentsToMove.length > 0 ? style : null)}>
                                            {studentsToMove.map((student,index) => {
                                                return <span key ={index} onClick = {() => {this.speedRemoveForStudent(index)}} className ="student-to-move-p">{student.studentName}</span>
                                            })}
                                        </div>
                                    </div>
                                    <div className="small-box">
                                        <Search 
                                            searchOnChange = {(e) => {this.updateSearchBox(e)}}
                                            resultsToBeShown={this.state.studentsToBeShown}
                                            onResultClick = {(result) => {this.resultFromSearch(result)}}
                                        />
                                    </div>
                                </form>
                        </div>
                        <div className="students-move-right">
                            <form>
                                <div className="students-move-navbar">
                                    <div className="form-field-nav">
                                        <FormField
                                            formID = "centerID_ToGO"
                                            formInfo = {centerID_ToGO}
                                            onChange = {(element) => this.updateChioce(element)}
                                            studentDropDown = 'true'
                                        />
                                    </div>
                                    <div className="form-field-nav">
                                        <FormField
                                            formID = "groupID_ToGO"
                                            formInfo = {groupID_ToGO}
                                            onChange = {(element) => this.updateChioce(element)}
                                            studentDropDown = 'true'
                                        />
                                    </div>
                                </div>
                                <button  className="Form-submit student-submit" onClick={this.submitForm}>submit</button>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="Data-table-shown">
                        {this.renderCentersTable(centersCollection)}
                        <br/>
                        <br/>
                        <br/>
                        {this.renderGroupsTable(groupsCollection)}
                    </div>
                </div>

                {popUP  ? this.showTransferPoPup() : null}
          </Fragment>
        )
    }
}
