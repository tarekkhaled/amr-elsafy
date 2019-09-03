import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../../../../resources/css/popup.css';


function cutFirstName (sentence) {
    let countflag = 0 ;
    let startIndex = 0;
    for (let i = 0 ; i < sentence.length ; i++) {
        if(sentence[i] === '"')
        {
            startIndex = i+1 ;
        }
        if(sentence[i] === ' ') {
            countflag ++ ;
        }
       
        if (sentence[i] === ' ' && countflag === 2) {
            return `(${sentence.substring(startIndex,i)})`;
        }
    }
}

export default class PoPup extends Component {
    state = {
        openDialog : this.props.open,
        file : null
    }


    updateFile = (e)=> {
        this.setState({
            file : e.target.files[0]
        })
    }

    showsuccessfulMessage = (message) => {
        return  <DialogContentText>
                {message}
                </DialogContentText>
    }
    render() {
        
        const {updateQrFile,generatedID,registerMessage} = this.props;

        return (
            <Fragment>
                <Dialog
                    className= "background-popup"
                    open={this.state.openDialog}   
                    aria-labelledby="form-title-dialog"
                >
                    <DialogTitle 
                        id="form-title-dialog">
                        Complete {cutFirstName(registerMessage)} profile :
                    </DialogTitle>

                    <DialogContent>

                        <div className="instruction-title">Instructions:</div>
                        <div className="instructions">
                            <p>1- Please copy the id for generate student Qr code </p>
                            <p>2- Click on "generate qr code" and paste the "id" there and save the qr code</p>
                            <p>3- Choose Qr code image that you are saved from your device</p>
                            <p>4- Click update file and that's all :)</p>
                        </div>

                         <div className="student-part">
                             Student ID :
                             <p className="student-id">
                                {generatedID}
                             </p>
                        </div>

                        <div className="generate-code">
                            <a 
                                href="|#"
                                target = "_blank"
                                onClick = {()=>{
                                    window.open('https://www.the-qrcode-generator.com/','_blank')
                                }}
                            >Generate Qr Code</a>
                        </div>
                        
                       
                       <form action="" className="qr-form">
                            <label htmlFor="choose-image"></label>
                            <input id="choose-image" type="file" onChange={this.updateFile}/>
                       </form>

                      <div className="button">
                        <button className="Form-submit" onClick={() =>updateQrFile(this.state.file)}>
                            Upload File
                        </button>

                      </div>
                       
                    </DialogContent>

                </Dialog>
            </Fragment>
        )
    }
}
