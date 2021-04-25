import './App.css';
import Navbar from './Navbar';
import Signup from './Signup'
import Login from './Login'
import {useState, useEffect} from 'react';
import Home from "./Home";
import CakeDetails from "./CakeDetails";
import Search from "./Search";
import { BrowserRouter as Router , Route, Redirect, Switch, withRouter} from "react-router-dom";
import axios from "axios"
import {connect} from "react-redux"
import Cart from "./Cart"
import Checkout from "./Checkout"
import ForgotPassword from './forgotPassword.js'

function App(props) {
  console.log("props in app", props.user)
  useEffect(() => {
  if(props.token && props.user===null){
  var token = localStorage.token
  console.log("Means user is already logged in..." , props)
  axios({
    method : "get",
    url : 'https://apibyashu.herokuapp.com/api/getuserdetails',
    headers:{
      authtoken : token
    }
  }).then((response)=>{
    console.log("response from user details api ", response);
    props.dispatch({
      type:"INITIALISE_USER",
      payload: response.data.data
    })
  },
  (error)=>{
    console.log("error from user details api ", error)

  })
  
   let detailsapiurl = "https://apibyashu.herokuapp.com/api/cakecart";
      axios({
        url: detailsapiurl,
        method: "post",
        data: {},
        headers: {
          authtoken: token,
        },
      })
        .then((response) => {
          console.log("cart data", response.data);
          props.dispatch({
            type: "CART_DATA",
            payload: response.data.data,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [props.user, props.token]);



var [user, setUser] = useState();
var [login,setLogin]=useState(false);

function logindone(data) {
  setUser(data)
  setLogin(true)
}

//Router will look for /path into address bar and load corredponding component
  return (
    <div>
    <Router>
    <Navbar loginstatus={login}/>

    <div>
    <Switch>
    <Route path="/" exact component={Home} />
      
      <Route path="/login" exact  ><Login informlogin={logindone} /></Route>
      <Route path="/signup" exact component={Signup} />
      <Route path="/search" exact component={Search} />
      <Route path="/cake/:cakeid" exact component={CakeDetails} />
      <Route path="/forgot" exact component={ForgotPassword} />
      //route guard for cart and checkout
      { props.user ?
    <div>
        <Route path="/cart" exact component={Cart} />
        <Route path="/checkout"  component={Checkout} />
    </div> : ''
      }
      <Route path="/*">
        <Redirect to="/"></Redirect>
      </Route>
     </Switch>
     </div>
      </Router>
    

    </div>
  );
}
//App = withRouter(App)
export default connect(function (state, props) {
  return {
    user: state?.user,
    token: state?.token,
    cart : state?.cart
  };
})(App);
