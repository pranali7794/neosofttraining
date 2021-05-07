import axios from "axios"

function ForgotPassword() {
	
	user ={}
	var [emailError,setEmailError]=useState('')
	const emailRegx = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
	var emailFlag=0;

	getEmail= (event)=>{
		user.email=event.target.value
	}
	
	forgot_pass =()=>{
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
	   var base_url = process.env.REACT_APP_BASE_URL;
		if(emailFlag==0)
		{
			let apiurl = base_url+"/api/recoverpassword"
			axios({
				url : apiurl,
				method : "post",
				data : { email : user.email }

			}).then((response)=>{
				console.log("response from forgot password api", response)
			}, (error)=>{
				console.log("Error from forgot password api", error)
			})
		}
		
	}
		
	
		return(
			<div style={{width:"50%", margin:"auto"}}>
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