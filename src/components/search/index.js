import React,{Component} from 'react';
import NavButton from '../../reComponents/navButton.js'

export default class Search extends Component {
    state = {
        changeFlag : false
    }

    updateFlag = (e) => {
        if(e.target.value) {
            this.setState({
                changeFlag  : true
            })
        } else {
            this.setState({
                changeFlag : false
            })
        }
        
    }

    render() {
      const {searchOnChange,resultsToBeShown,onResultClick,placeHolder,yesLink} = this.props;
      console.log(placeHolder)
        return (
                <div>
                    <div className="Nav-search-box">
                            <i className="fa fa-search Search-icon"/>
                            <input   name="searchValue" onChange={(e) => {searchOnChange(e);this.updateFlag(e);}}className="Search-input" type="text" placeholder={placeHolder ? placeHolder : 'Search ...'}/>
                            <div className="Nav-search-box-results">
                            {this.state.changeFlag && resultsToBeShown.map((result,i)=> {
                                return <NavButton 
                                    withLink = {yesLink ? 'true' : false}
                                    linkTO = {`/student/${result.studentID}`}                                    name = {result.studentName}
                                    key = {i}
                                    onClickk = {(result) => {onResultClick && onResultClick(result)}}
                                    result = {result}
                                    style = {{
                                        backgroundColor : '#3d3448',
                                        width : '100%',
                                        display : 'flex',
                                        justifyContent : 'left',
                                        padding : '19px',
                                        marginBottom : '5px',
                                    }}
                                />
                            })}
                            {(this.state.changeFlag && resultsToBeShown.length === 0 ) && <div className="no-found">'No result found by this name'</div>}
                        </div>
                    </div>
                
                </div>
            )}
}