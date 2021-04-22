import axios from "axios"
import { useState } from "react"

function ForgotPassword(props) {
	
	var user ={}
	var [user, setUser]=useState({})
	var [emailError,setEmailError]=useState('')
	const emailRegx = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
	var emailFlag=0;

	let getEmail= (event)=>{
		setUser({
            ...user,
            email:event.target.value
        })
        user.email=event.target.value;
	}
	
	let forgot_pass =()=>{
		 if(user.email=="undefined" || user.email==undefined)
       {
        setEmailError("Please enter email")
        emailFlag=1;
        
       }
       else if(user.email && !emailRegx.test(user.email))
       {
        setEmailError("Please enter valid email")
        emailFlag=1;

       }else
       {
        setEmailError("")
        emailFlag=0;

       }
console.log("emailError = ", emailError)
console.log("user.email = ", user.email)
console.log("email flag ", emailFlag)

		if(emailFlag==0 && user.email)
		{
			let apiurl = "https://apibyashu.herokuapp.com/api/recoverpassword"
			axios({
				url : apiurl,
				method : "post",
				data : { email : user.email }

			}).then((response)=>{
				console.log("response from forgot password api", response)
				alert(response.data.message)
				props.history.push("/login")

			}, (error)=>{
				console.log("Error from forgot password api", error)
				alert("Password not recovered .. Please try again")
			})
		}
		
	}
		
	
		return(
			<div style={{width:"50%", margin:"auto"}}>
			<h2> Recover Password </h2>
			<br/>
			<div className="form-group">
				<label>Email:</label>
				<input type="email" className="form-control" onChange={getEmail} />
			</div>
			{ emailError && 
			<div style={{color:"red"}}>
				{emailError}
			</div> }
			<button className="btn btn-primary" onClick={forgot_pass}>Submit</button>
			</div> 

			)
	
}
export default ForgotPassword;