import Cake from "./Cake";
import Caraousel from "./Caraousel";
//import cake from "./data.js";
import {useEffect, useState} from "react"
import axios from "axios"

var obj = {
	name:"Chocolate Truffle",
	image:"choc_truffle1.jpeg",
	price:"500",
	id:"212"
}

function Home(){
	let [cakeres, setCake] = useState([])	
	let allcakeapiurl = "https://apibyashu.herokuapp.com/api/allCakes";
	useEffect(()=>{	
		axios({
			url : allcakeapiurl,
			method : "get" 
		}).then((response)=>{
				console.log("response from cake api", response.data)
				setCake(response.data.data)
			}, (error)=>{
				console.log("Error from cake api", error)
			})
	}, [])
	return  (
	 

		<div>
		<Caraousel />
		<div className="row">
			
			// <Cake cakedata={obj} />	
			// <Cake cakedata={obj}/>
			// <Cake cakedata={obj}/>
			// <Cake cakedata={obj}/>	
			{/* <Cake cakedata={obj}/> */}

			{cakeres?.length > 0 && cakeres.map((each, index) =>{
				return <Cake cakedata={each} index={index} />
			})
		}

		</div>
		</div>
		)
}

export default Home;
