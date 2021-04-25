import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoodIcon from "@material-ui/icons/Mood";
import { Link } from "react-router-dom"

function CartSummary(props){
  const [cartSumry, setCartSumry] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  var email = localStorage.email

  useEffect(() => {
    let detailsapiurl = "https://apibyashu.herokuapp.com/api/cakecart";
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
        setCartSumry(response.data.data);
        var total = 0;
        response.data.data.map(({ price }) => {
          total = total + price;
        });
        setTotalPrice(total);
      })
      .catch((error) => console.log(error));
  }, [props.token]);

   function continue_checkout(){

    props.dispatch({
      type:"CHECKOUT_STAGE",
      counter : 2
    })
    props.history.push("/checkout/address")
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
         Cart Summary <ShoppingCartIcon style={{ fontSize: "40px" }} />
      </h1>
      <div className="row" style={{ padding: "10px" }}>
        {cartSumry?.length > 0 ? (
          <>
            <div className="col-sm-8 col-md-8 col-md-offset-1 container">
              <table className="table table-hover">
                <tbody>
                  {cartSumry?.length > 0 &&
                    cartSumry.map((cart, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <img
                              className="media-object"
                              src={cart?.image}
                              style={{ width: "45px", height: "45px" }}
                            />{" "}
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
                          
                        </tr>
                      );
                    })}
                <tr>
              
               
                <td  className="text-center"> 
                  Total (USD) 

                  </td>

                  <td  className="text-center"> 
                  </td>

                  <td  className="text-center"> 
                   $ {totalPrice}
                	</td>
              
              
              </tr>
              </tbody>
              </table>
              <button class="btn btn-outline-primary" onClick={continue_checkout}>Next</button>
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

export default connect(function (state, props) {
  return {
    token: state?.user?.token,
    cart: state?.cart,
    remove_msg : state?.remove_msg
  };
})(CartSummary);
 
