import { Link } from "react-router-dom"
import {useContext} from "react"
import {DiscountContext} from "./Home"

var img="choc_truffle1.jpeg";

function Cake(props) {
	const context = useContext(DiscountContext)
	console.log("........", context)
	//console.log("props received ", props)
	return (
		<div>
		<div className="card" style={{width: "16rem"}}>
			  <Link to={'/cake/' +props.cakedata.cakeid}>
			  <img src={props.cakedata.image} className="card-img-top container-fluid" style={{height:"200px"}} alt="..." />
			  </Link>
			  <div className="card-body">
			    <h5 className="card-title">{props.cakedata.name}</h5>    
			  </div>
			</div>	
		</div>
		)
}

export default Cake;