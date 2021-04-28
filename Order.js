import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

function Order(props) {
  
  //console.log(props.history);
  const onOrder = (event) => {
    event.preventDefault();
    props.dispatch({
      type: "CHECKOUT_STAGE",
      counter: 0
    });

    props.dispatch({
      type : "PLACE_ORDER",
      payload : {
          price: props.TotalPrice, 
          name: props.username, 
          address: props.address, 
          phone: props.phone,           
          city: props.city, 
          pincode: props.pincode, 
          cakes: props.cartData
        }
    })

    alert("Order placed successfully")
    props.history.replace("/");
  };
  return (
    <>
      <div className="alert alert-info container" role="alert" style={{margin: "30px"}}>
        <h4 className="alert-heading" style={{ textAlign: "center" }}>
          Please proceed further
        </h4>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="mb-0">Sweet Shopping !</p>
        </div>
      </div>
      <div>
        <button onClick={onOrder} className="btn btn-outline-primary">
         Place Order
        </button>
      </div>
    </>
  );
}

export default connect(function (state, props) {
	console.log("state in order= ", state)
  return {
    counter : state?.counter,
    TotalPrice : state?.total,
    cartData: state?.cart?.data,
    username : state?.username,
    address  : state?.address,
    phone : state?.phone,
    city : state?.city,
    pincode : state?.pincode
  };
})(withRouter(Order));