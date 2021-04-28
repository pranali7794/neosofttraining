import {Route} from "react-router"
import CartSummary from "./CartSummary"
import Address from "./Address"
import Payment from "./Payment"
import Order from "./Order"
import {useRouteMatch , Link, withRouter } from "react-router-dom"
import {connect} from "react-redux"

function Checkout(props){
	var route = useRouteMatch()
	var url = route.url
	var path = route.path

	return (
		<div className="row">
		<div className="col-4" style={{padding:"30px"}}>
			<Link to={url}><li className="form-control" style={{ background:"orange"}}>Cart Summary</li></Link><br/>

			{props?.counter>1 ? <Link to={url + "/address"}>
			<li className="form-control" style={{ background:"orange"}}>Add Address</li></Link>:<li className="form-control" style={{ background:"orange"}}>Address</li>} <br/>

			{props?.counter>2 ? <Link to={url + "/payment"}>
			<li className="form-control" style={{ background:"orange"}}>Payment</li></Link>:<li className="form-control" style={{ background:"orange"}}>Payment</li>} <br/>

			{props?.counter>3 ? <Link to={url + "/order"}>
			<li className="form-control" style={{ background:"orange"}}>Order</li></Link>:<li className="form-control" style={{ background:"orange"}}>Order</li>}

		</div>
		<div className="col-8">
		<Route path={path} exact component={CartSummary} ></Route>
		{props?.counter>1 && <Route path={path + "/address"} exact component={Address}></Route>}
		{props?.counter>2 && <Route path={path + "/payment"} exact component={Payment}></Route>}
		{props?.counter>3 && <Route path={path + "/order"} exact component={Order}></Route>}
		</div>
		</div>
		)
} 

Checkout = withRouter(Checkout)

export default connect(function(state,props){
    console.log(".... state initially in checkout", state)
    return {
        counter : state?.counter
    }
})(Checkout)