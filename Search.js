import {useEffect, useState} from "react"
import axios from "axios"
import Cake from "./Cake";
import queryString from "query-string";

function Search(props){
	const parsed = queryString.parse(props.location.search);
	//console.log("parsed", parsed);

	let [cakesearch, setCakeSearch] = useState([])	

	
	useEffect(()=>{	
		let searchcakeapiurl = "https://apibyashu.herokuapp.com/api/searchcakes?q="+parsed.searchtext;
		axios({
			url : searchcakeapiurl,
			method : "get" 
		}).then((response)=>{
				//console.log("response from search cake api", response.data)
				setCakeSearch(response.data.data)
			}, (error)=>{
				console.log("Error from search cake api", error)
			})
	}, [[props.location.search]]) //We want to prevent the call of componentdidupdate()

	var [cakedata, setCakeData] = useState();
    function getCakeData (data) {
        console.log("...... getCakeData" , data)
        setCakeData(data)
    }
    
	return  (
	 <div className="container">

		<div className="row">
			
		
			{ cakesearch?.length>0 ? cakesearch.map((each, index) =>{
				return <Cake cakedata={each} index={index} />
			}) : <div className="alert alert-danger">No search result. Please search another cake.</div>	}

		</div>
		
		</div>
	);
}

export default Search;

