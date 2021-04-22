import {Component} from "react"
import axios from "axios"

class Signup extends Component{
	constructor(){
		super()
		this.state ={
			
		}
	}
	user ={}

	emailRegx = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
    passwordRegx = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    nameRegx = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");

	getEmail= (event)=>{
		this.user.email=event.target.value
	}
	getName= (event)=>{
		this.user.name=event.target.value
	}
	getPassword =(event)=>{
		this.user.password=event.target.value
	}
	
	
	register =()=>{
		if(!this.user.email){
			this.setState({
				emailError:"Please enter email"
			})
		}
		else if(!this.emailRegx.test(this.user.email)){
			this.setState({
				emailError:"Please enter valid email"
			})
		}
		else{
			this.setState({
				emailError:""
			})
		}

		if(!this.user.password)
		{
			this.setState({
				pwdError:"Please enter password"
			})
		}
		else if(!this.passwordRegx.test(this.user.password)){
			this.setState({
				pwdError:"Please enter valid password"
			})
		}
		else{
			this.setState({
				pwdError:""
			})
		}

		if(!this.user.name)
		{
			this.setState({
				nameError:"Please enter name"
			})
		}
		else if(!this.nameRegx.test(this.user.name)){
			this.setState({
				nameError:"Please enter valid name"
			})
		}
		else{
			this.setState({
				nameError:""
			})
		}

		if(this.state.nameError=="" && this.state.pwdError=="" && this.state.emailError=="")
		{
			let apiurl = "https://apibyashu.herokuapp.com/api/register"
			axios({
				url : apiurl,
				method : "post",
				data : this.user
			}).then((response)=>{
				console.log("response from signup api", response.data)
				alert(response.data.message)
				
			}, (error)=>{
				console.log("Error from signup api", error)
				alert("Error in Signup.. Please try again")
			})
		}
		console.log("....user details", this.user)
	}
		
	render(){
		return(
			<div style={{width:"50%", margin:"auto"}}>
			<h2> Sign Up </h2>
			<br/>
			<div className="form-group">
				<label>Email:</label>
				<input type="email" className="form-control" onChange={this.getEmail} />
				{ this.state.emailError &&
					<div style={{color:"red"}}>
					{this.state.emailError}
				</div> }
			</div>
			<div className="form-group">
				<label>Name:</label>
				<input type="name" className="form-control" onChange={this.getName} />
				{ this.state.nameError &&
					<div style={{color:"red"}}>
					{this.state.nameError}
				</div> }
			</div>
			<div className="form-group">
				<label>Password:</label>
				<input type="password" className="form-control" onChange={this.getPassword} />
				{ this.state.pwdError &&
					<div style={{color:"red"}}>
					{this.state.pwdError}
				</div> }
			</div>
			{ this.state.errorMessage &&
			<div style={{color:"red"}}>
				{this.state.errorMessage}
			</div> }
			<button className="btn btn-primary" onClick={this.register}>Register</button>
			</div> 

			)
	}
}
export default Signup