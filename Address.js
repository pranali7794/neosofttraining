import { Link , withRouter} from "react-router-dom"
import { useState } from "react"
import {connect} from "react-redux"

function Address(props){
	var  [formerrors, setFormerrors] = useState({})
	const [nameErr, setNameErr] = useState(false);
	const [addressErr, setAddressErr] = useState(false);
	const [phoneErr, setPhoneErr] = useState(false);
	const [cityErr, setCityErr] = useState(false);
	const [pincodeErr, setPincodeErr] = useState(false);
	const nameRegx = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");
	const phoneRegx = new RegExp("^\\d{10}$");
	const pincodeRegx = new RegExp("^\\d{6}$");

	var validate = function (elements) {
		var errors = {}
		console.log("elements received for validation", elements)
		if(!elements.name.value){
			errors.name="Name is required"
		}
		if(!elements.address.value){
			errors.address="Address is required"
		}
		if(!elements.phone.value){
			errors.phone="Phone is required"
		}
		if(!elements.city.value){
			errors.city="City is required"
		}
		if(!elements.pincode.value){
			errors.pincode="Pincode is required"
		}

		if(elements.name.value && !nameRegx.test(elements.name.value)) {
         errors.name="Name is invalid"
      	}
      	if(elements.phone.value && !phoneRegx.test(elements.phone.value)) {
         errors.phone="Phone is invalid"
      	}
      	if(elements.pincode.value && !pincodeRegx.test(elements.pincode.value)) {
         errors.pincode="Pincode is invalid"
      	}
      	

		var errorkeys = Object.keys(errors)
		if(errorkeys.length>0)
			return errors
		else
			return false
	}

	var placeOrder = function(event) {
		event.preventDefault()
		var form = document.getElementById("addressForm")
		console.log("form elements in this", form.elements, form.controls)
		var errors = validate(form.elements) //validate call

		var name = form.elements[0].value;
		var address = form.elements[1].value;
		var phone = form.elements[2].value;
		var city = form.elements[3].value;
		var pincode = form.elements[4].value;

		if(errors){
			setFormerrors(errors)
		}
		else{
			setFormerrors({})
			props.dispatch({
				type:"ADD_ADDRESS",
				payload : {name : name, address:address, phone:phone, city:city, pincode:pincode}
			})
			
			alert("Form submitted successfully")

			props.dispatch({
	      	type:"CHECKOUT_STAGE",
	      	counter : props.counter
		    })
		    props.history.push("/checkout/payment")

		}
	}

	return(
		<div><h2 style={{ padding: "30px" }}>Shipping Details</h2> 
		
		<form id="addressForm" style={{align:"center"}}>
			<div className="form-group">

			<div className="row">
				<label className="col-md-2 text-left">Name</label>
				<input type="text" name="name" className="col-8 form-control" />
				
				<div className="form-error ">
					{formerrors?.name && <div> { formerrors.name } </div>}
				</div>
			</div>
			<br/>

			<div className="row">
				<label className="col-md-2 text-left">Address </label>
				<input type="text" name="address" className="col-8 form-control" />
				
				<div className="form-error">
					{formerrors?.address && <div> { formerrors.address } </div>}
				</div>
			</div>
			<br/>

			<div className="row">
				<label className="col-md-2 text-left">Phone </label>
				<input type="text" name="phone" className="col-8 form-control" />
				&emsp;	
				<div className="form-error">
					{formerrors?.phone && <div> { formerrors.phone } </div>}
				</div>
			</div>
			<br/>

			<div className="row">
				<label className="col-md-2 text-left">City </label>
				<input type="text" name="city" className="col-5 form-control" />
				&emsp;	
				<div className="form-error">
					{formerrors?.city && <div> { formerrors.city } </div>}
				</div>
			</div>
			<br/>

			<div className="row">
				<label className="col-md-2 text-left">Pincode </label>
				<input type="text" name="pincode" className="col-5 form-control" />
				&emsp;	
				<div className="form-error">
					{formerrors?.pincode && <div> { formerrors.pincode } </div>}
				</div>
			</div>

			</div>

			<div className="form-group" >
				<div className="row">
				<center>
	              <button onClick={placeOrder}
	                style={{ display: "flex",  margin: "50px", float:"left", marginLeft:"20px" }}
	                className="btn btn-outline-primary"
	              >
	               Add Shipping Details
	              </button>
	              </center>
	              </div>
			</div>
		</form>
		</div>
		)
}

Address = withRouter(Address)
 export default connect(function(state,props){
 	console.log(".... state initially in address", state)
 	return{
        counter : state?.counter

 	}
 })(Address);