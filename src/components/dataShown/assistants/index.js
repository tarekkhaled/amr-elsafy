import React, { Component, Fragment } from 'react';
import {toggleDisableEnableButton} from '../../../component_helpers/helpers';
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


const assistants = [
    {
        firstName : 'tarek',
        lastName : 'khaled',
        phone : '01151007122',
        email : 'tarek@gmail.com',
        disabled : false,
        password : '1231er32',
        id : 123
    },
    {
        firstName : 'mohamed',
        lastName : 'hany',
        phone : '01151007122',
        email : 'hany@gmail.com',
        disabled : false,
        password : '1231er32',
        id : 2223

    },{
        firstName : 'sadio',
        lastName : 'mane',
        phone : '01151007122',
        email : 'sadio@gmail.com',
        password : '1231er32',
        disabled : true,
        id : 81
    }

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

export default class Assistants extends Component {
    state = {
            assistantsCollection : [],
        }
    removeAssistant = (e) => {
        let returnObject ;
        if(e.target.nodeName === 'BUTTON') {
            returnObject = {id : (e.target.id)}
        } else {
            returnObject = {id :(e.target.parentNode.id)}
        }
        console.log(returnObject)
    }

    updateStatue = (e) => {
       const assistantStatue = toggleDisableEnableButton(e);
       console.log(assistantStatue)
    }

    componentDidMount(){
        this.setState({
            assistantsCollection : assistants
        })

    }


    renderTable = (assistants) => {
    return  <Fragment>
        <Paper style={{overflowX : 'scroll'}}>    
                <Table >
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Assistants</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Password</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>
                        <StyledTableCell align="right">Update Statue</StyledTableCell>
                        <StyledTableCell align="right">Remove</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {assistants.map((assistant,i) => (
                        <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                            {`${assistant.firstName} ${assistant.lastName}`}
                        </StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{assistant.email}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{assistant.password}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">{assistant.phone}</StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton 
                                icon = {assistant.disabled ? 'fas fa-eye' : 'fas fa-eye-slash'}
                                tableNav = 'true'
                                id = {assistant.id}
                                onChange = {(e) => {this.updateStatue(e)}}
                            />
                        </StyledTableCell>
                        <StyledTableCell style={{background: '#fff'}} align="right">
                            <NavButton
                                icon = "fas fa-trash"
                                tableNav = 'true'
                                id = {assistant.id}
                                onChange = {(e) => {this.removeAssistant(e)}}
                                
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
        const {assistantsCollection} = this.state;
        return (
          <div className = "Data-table">
             <div className="Data-table-shown">
                 {this.renderTable(assistantsCollection)}
             </div>
          </div>
        )
    }
}
