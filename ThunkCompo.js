import {connect} from "react-redux"
import { withRouter} from "react-router-dom";
import { myThunk } from "./reduxstore/thunks.js"

function ThunkCompo(props){

let clicked = ()=>{
	console.log("clicked")

	props.dispatch(myThunk())
}
	return(

		<div>

		<button className="btn btn-outline-primary" onClick={clicked}>Click Me</button>

		</div>
		)

}
ThunkCompo = withRouter(ThunkCompo)
export default connect(function (state, props) {
  return {
    
  };
})(ThunkCompo);