import Cake from "./Cake";
import Caraousel from "./Caraousel";
import {useEffect, useState} from "react"
import axios from "axios"
import React from "react"

export const DiscountContext = React.createContext()

var obj = {
	name:"Chocolate Truffle",
	image:"choc_truffle1.jpeg",
	price:"500",
	id:"212"
}
var base_url = process.env.REACT_APP_BASE_URL;
//alert(base_url)

function Home(){
	let [cakeres, setCake] = useState([])	
	let allcakeapiurl = base_url+"/api/allCakes";
	//alert(allcakeapiurl)
	useEffect(()=>{	
		axios({
			url : allcakeapiurl,
			method : "get" 
		}).then((response)=>{
				//console.log("response from cake api", response.data)
				setCake(response.data.data)				
			}, (error)=>{
				console.log("Error from cake api", error)
			})
	}, [])
	return  (
	 
		<div>
		<Caraousel />
		<div className="row">
					

			{cakeres?.length > 0 && cakeres.map((each, index) =>{
				return <DiscountContext.Provider value="discountchahiyegareeblog">
					<Cake cakedata={each} index={index} />
					</DiscountContext.Provider>
			})
		}

		</div>
		</div>
		)
}


export default Home;
