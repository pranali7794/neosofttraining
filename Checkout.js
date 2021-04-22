import {Route} from "react-router"
import CartSummary from "./CartSummary"
import Address from "./Address"
import Payment from "./Payment"
import Order from "./Order"
import {useRouteMatch , Link } from "react-router-dom"
import {connect} from "react-redux"

function Checkout(){
	var route = useRouteMatch()
	var url = route.url
	var path = route.path

	console.log(".....route ", route)
	console.log(".....url ", url)
	console.log(".....path ", path)

	return (
		<div className="row">
		<div className="col-4">
			<Link to={url}><li>Cart Summary</li></Link>
			<Link to={url + "/address"}><li>Add Address</li></Link>
			<Link to={url + "/payment"}><li>Payment</li></Link>
			<Link to={url + "/order"}><li>Order</li></Link>

		</div>
		<div className="col-8">
		<Route path={path} exact component={CartSummary} ></Route>
		<Route path={path + "/address"} exact component={Address}></Route>
		<Route path={path + "/payment"} exact component={Payment}></Route>
		<Route path={path + "/order"} exact component={Order}></Route>
		</div>
		</div>
		)
} 
export default Checkout;