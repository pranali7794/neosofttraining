import {useState,useEffect} from 'react'
import axios from "axios"
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux"

function Login(props){
    // useEffect(()=>{
    //     alert('Mounted and Updated')
    // },[])
    //console.log(">>>>props", props)
    var user={}
    var [user, setUser]=useState({})

    const emailRegx = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
    const passwordRegx = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    
    //var [error,setError]=useState('')
    var [emailError,setEmailError]=useState('')
    var [pwdError,setPwdError]=useState('')
    var emailFlag=0, pwdFlag=0;

    let getEmail=(event)=>{
        setUser({
            ...user,
            email:event.target.value
        })
        user.email=event.target.value;
    }

    let getPassword=(event)=>{
        setUser({
            ...user,
            password:event.target.value
        })
        user.password=event.target.value;
    }

    let login=function(){
        console.log("user ", user.email, user.password)
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

       if(user.password=="undefined" || user.password==undefined)
       {
        setPwdError("Please enter password")
        pwdFlag=1;
       }
       
       else if(user.password && !passwordRegx.test(user.password))
       {
        setPwdError("Please enter valid password")
        pwdFlag=1;
       }
       else{
        setPwdError("")
        pwdFlag=0;
       }

console.log("setEmailError= ", emailError)
console.log("pwdError = ", pwdError)

       if(emailFlag==0 && pwdFlag==0){
        console.log("user in login api",user)
       // props.setLogin(true)
        //setError("")
        // setEmailError("")
        // setPwdError("")

        let apiurl = "https://apibyashu.herokuapp.com/api/login"
            axios({
                url : apiurl,
                method : "post",
                data : user
            }).then((response)=>{
                console.log("response from login api", response.data)
                if(response.data.token){
                    localStorage.token= response.data.token
                    localStorage.email= response.data.email
                    props.dispatch({
                        type:"LOGIN",
                        payload:response.data
                    })

                    props.informlogin(localStorage)
                    props.history.push("/")

                }else{
                    alert("Invalid login credentials")
                }

            }, (error)=>{
                console.log("Error from login api", error)
                alert("Invalid login credentials")
            })
       }
    }

    return(
        <div>
            <center><h3>Login</h3></center>
            <div style={{"width":"50%", "margin":"auto"}}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={getEmail}></input>
                         { emailError && 
                        <div className="text-danger">
                           {emailError}
                        </div>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={getPassword}></input>
                        { pwdError && 
                        <div className="text-danger">
                            {pwdError}
                        </div>}

                    </div>
                   

                    <div style={{float:"right"}}>
                        <Link to="/forgot">Forgot Password?</Link>
                    </div>
                    <div>
                        <Link to="/signup">New User? Click Here</Link>
                    </div>
                    <button className="btn btn-primary" onClick={login} >Login</button>
                </div>
            
        </div>
    )
}

Login = withRouter(Login)
export default connect(function(state,props){
    console.log(".... state initially in login", state)
    return {
        user : state?.user?.name,
        loginstatus : state?.isloggedin
    }
})(Login)