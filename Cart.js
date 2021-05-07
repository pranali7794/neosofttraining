import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoodIcon from "@material-ui/icons/Mood";
import { Link , withRouter} from "react-router-dom"
import {Component} from "react"

function Cart(props) {
 
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  var email = localStorage.email
  var base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let detailsapiurl = base_url+"/api/cakecart";
    axios({
      url: detailsapiurl,
      method: "post",
      data: {},
      headers: {
        authtoken: props.token,
      },
    })
      .then((response) => {
        console.log("cart data", response.data);
        setCartData(response.data.data);
        var total = 0;
        response.data.data.map(({ price }) => {
          total = total + price;
        });
        setTotalPrice(total);
        props.dispatch({
                        type:"CART_DATA",
                        payload:response.data,
                        total: total
                    })
      })
      .catch((error) => console.log(error));
  }, [props.token]);

  function removeCartData(cake_id, index) {
    let remove_cartapiurl = base_url+"/api/removecakefromcart";
    
    axios({
      url: remove_cartapiurl,
      method: "post",
      headers: {
        authtoken: props.token,
      },
      data: { email : email , cakeid : cake_id} ,
      
    }).then((response) => {
        console.log("remove cart data api", response);
        props.dispatch({
                        type:"REMOVE_CAKE_FROM_CART",
                        array_index: index,
                        price: totalPrice

                    })
        //window.location.reload();
        
      }).catch((error) => console.log(error));
  }

  return (
    <div>
      <h1
        style={{
          margin: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          paddingBottom: "20px",
          padding: "20px",
        }}
      >
        Shopping Cart <ShoppingCartIcon style={{ fontSize: "40px" }} />
      </h1>
      <div className="row" style={{ padding: "10px" }}>
        {props.cartData?.length > 0 ? (
          <>
            <div className="col-sm-8 col-md-8 col-md-offset-1 container">
              <table className="table table-hover">
                <tbody>
                  {props.cartData?.length > 0 &&
                    props.cartData.map((cart, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <img
                              className="media-object"
                              src={cart?.image}
                              style={{ width: "72px", height: "72px" }}
                            />{" "}
                          </td>
                          <td className="text-center">
                           <strong> {cart.cakeid} </strong>
                              
                          </td>
                          <td className="text-center">
                            <div className="media-body">
                              <h4 className="media-heading">
                                <a>{cart?.name}</a>
                              </h4>
                            </div>
                          </td>
                          <td className="text-center">
                            <strong>${cart.price}</strong>
                          </td>
                          <td className="text-center">
                            <button type="button" onClick={() => removeCartData(cart.cakeid,index)} className="btn btn-danger">
                              <span className="glyphicon glyphicon-remove">X</span>{" "}
                              
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="col-sm-4 col-md-4">
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  Total Item <br /> {props.cartData?.length}
                </p>
                <p style={{ textAlign: "center" }}>
                  Total Price <br />$ {totalPrice}
                </p>
              </div>
              <Link to="/checkout">
              <button
                style={{ display: "flex", float: "right", margin: "40px" }}
                className="btn btn-success"
              >
                Checkout
              </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="alert alert-danger container" role="alert">
            <h4 className="alert-heading" style={{ textAlign: "center" }}>
              CART IS EMPTY!
            </h4>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Plaese add some cake to cart{!props?.token && ", Please login"}
              </p>

              <p className="mb-0">
                Sweet Shopping <MoodIcon style={{ color: "#08aae8" }} /> !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Cart = withRouter(Cart)
export default connect(function (state, props) {
  state = {...state}

  return {
    token: state?.user?.token,
    cartData: state?.cart?.data,
    remove_msg : state?.remove_msg
  };
})(Cart);
