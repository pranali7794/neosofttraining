import { Link } from "react-router-dom"
import { useState } from "react"

function Address(){
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
		if(errors){
			setFormerrors(errors)
		}
		else{
			setFormerrors({})
			alert("Form submitted successfully")

		}
	}

	return(
		<div><h1>Shipping Details</h1> <br/><br/>
		
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

			<div className="form-group">
				
	              <button onClick={placeOrder}
	                style={{ display: "flex",  margin: "100px" }}
	                className="btn btn-primary"
	              >
	               Place Order
	              </button>
	              
			</div>
		</form>
		</div>
		)
}
 export default Address;