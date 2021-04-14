import {useEffect, useState} from "react"
import axios from "axios"
import Cake from "./Cake";

function Search(){
	let [cakesearch, setCakeSearch] = useState([])	
	let searchcakeapiurl = "https://apibyashu.herokuapp.com/api/searchcakes?q="+"mango";
	useEffect(()=>{	
		axios({
			url : searchcakeapiurl,
			method : "get" 
		}).then((response)=>{
				console.log("response from search cake api", response.data)
				setCakeSearch(response.data.data)
			}, (error)=>{
				console.log("Error from search cake api", error)
			})
	}, [])

	return  (
	 <div className="container">

		<div className="row">
			
		
			{ cakesearch?.length>0 ? cakesearch.map((each, index) =>{
				return <Cake cakedata={each} index={index} />
			}) : <div className="alert alert-danger">No search result. Please search another cakes.</div>	}

		</div>
		
		</div>
	);
}

export default Search;

