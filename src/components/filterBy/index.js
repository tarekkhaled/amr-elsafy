import React, { Component ,Fragment } from 'react';
import '../../resources/css/filterBy.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NavButton from '../../reComponents/navButton';
import Paper from '@material-ui/core/Paper';
import {students} from '../../students.js';
import swal from 'sweetalert';


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


const whatPropertyToShown = ()=>{
    const pathName = (String(window.location.pathname));
    if(pathName.includes('fatherJob')) {
        return 'fatherJob'
        
    } else {
        return 'schoolName'
    }
}


export default class FilterBy extends Component {

    state = {
        studentsToBeShown : [],
        searchValue : '',
        propertyToFilterBy : whatPropertyToShown() === 'fatherJob' ? 'fatherJob' : 'schoolName'
    }
    
    updateSearchBox = (e) => {
        let searchValue = e.target.value
        this.setState({
            [e.target.name] : searchValue 
        },this.showStudentsInSearch(searchValue))
    }


    showStudentsInSearch = (inputValue) => {
        const studentsShown = students.filter((student) => student['studentName'].toLowerCase().includes(inputValue.toLowerCase())) 
        this.setState({
            studentsToBeShown :(inputValue) ? studentsShown : []
        })
        
    }


    getPathName_placeholder = () => {
        const pathName = (String(window.location.pathname));
        if(pathName.includes('fatherJob')) {
            return 'Enter father job ...'
            
        } else {
            return 'Enter school name ...'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitForm = () => {
        const {searchValue,propertyToFilterBy} = this.state;
        if(!searchValue) {
            swal('Please fill the form !')
        } else {
            const studentsToShown = students.filter((student) => 
                student[propertyToFilterBy] === searchValue
            )
            this.setState({studentsToBeShown : studentsToShown})
        }
    }

    renderTable = (rows) => {
        const {propertyToFilterBy} = this.state;
        return  <Fragment>
            <Paper style={{overflowX : 'scroll'}}>    
                    <Table >
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Students</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Password</StyledTableCell>
                            <StyledTableCell align="right">{propertyToFilterBy}</StyledTableCell>
                            <StyledTableCell align="right">Profile</StyledTableCell>
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
                            <StyledTableCell style={{background: '#fff'}} align="right">{row[propertyToFilterBy]}</StyledTableCell>
                            <StyledTableCell style={{background: '#fff'}} align="right">
                                <NavButton 
                                    icon = "fas fa-user-circle"
                                    withLink = 'true'
                                    linkTO = {`student/${row.studentID}`}
                                    tableNav = 'true'
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
        const {studentsToBeShown} = this.state;
        return (
            <div className="filterBy">
                <div className="filterBy-search">

                    <input  name = "searchValue" type="text" placeholder ={this.getPathName_placeholder()} onChange ={this.handleChange}/>
                    <button  className="Form-submit " onClick={this.submitForm}>submit</button>

                </div>

                <div className="table-shown">
                    {studentsToBeShown.length > 0 ? this.renderTable(studentsToBeShown) : null}
                </div>
            </div>
        )
    }
}
