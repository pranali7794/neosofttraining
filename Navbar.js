import {Link, useLocation, BrowserRouter as Router,withRouter} from "react-router-dom";
import ReactDOM from "react-dom";
import React , {useEffect, useState} from "react"
import { connect } from "react-redux"
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar(props){
    var counter=0;
    //console.log("props in navbar ....", props)
    //var search_str = '' 
    var [search_str, setSearchStr]=useState('')
    var [loginstatus,isloggedin]=useState('');

    let search=function(event){
        event.preventDefault()
        counter++;
        //console.log(counter)
        //console.log("props in search....", props.history)
        console.log("search_str =", search_str)
        let url = '/search?searchtext='+document.getElementById('txtSearch').value;
        //console.log("url "+url)
        props.history.push(url)

    }


    let logout = function()
    {
            props.dispatch({
            type:"LOGOUT"
        })
    }
    
    let getSearch=(event)=>{
        //console.log("input value", event.target.value)
        setSearchStr(event.target.value)
        
    }
    
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <Link to="/"> <a className="navbar-brand" >My CakeShop</a></Link>
           
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                
                <li className="nav-item">
                  {props.loginstatus &&  <a className="nav-link" tabindex="-1" aria-disabled="true">
                  Welcome {props.user} </a> }
                  
                </li>
                
               
                </ul>
                <form className="form-inline my-2 my-lg-0">
            <input id="txtSearch" className="form-control mr-sm-2" type="search" onChange={getSearch} placeholder="Search" aria-label="Search"/>
            
            <button onClick={search} className="btn btn-primary my-2 my-sm-0" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            &emsp;
                </form>
                {props.loginstatus ? 
                    <div>
                <Link to="/cart">
                <button className="btn btn-warning my-2 my-sm-0" type="submit"><FontAwesomeIcon icon={faShoppingCart} /></button>
                </Link>
                   &emsp; <button onClick={logout} className="btn btn-danger">Logout</button>
                    </div>:
                    <div>
                <Link to="/login"> <button className="btn btn-primary">Login</button></Link>
                 </div> }
                
                
            </div>
            </nav>
        </div>
    )
}
Navbar = withRouter(Navbar)
//mapstatetoprops
export default connect(function(state,props){
    console.log(".... state initially in navbar", state)
    return {
        user : state?.user?.name,
        loginstatus : state?.isloggedin
    }
})(Navbar)