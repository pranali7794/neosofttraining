const demo = function (state={
	
	user: null,
	
	isloggedin : localStorage.getItem('token')? true : false,

	counter : 1,
	token : localStorage.getItem('token')? localStorage.getItem('token') : null

}, action) {
	switch(action.type){
		case "LOGIN":{
			console.log("Here we have to write logic for LOGIN")
			state = {...state}

			
			state["isloginfetch"] = true
			
			return state
		}
		case "LOGIN_SUCCESS":{
			console.log("Here we have to write logic for LOGIN_SUCCESS")
			state = {...state}

			state["isloggedin"] = true
			state["user"] = action.payload
			state["isloginfetch"] = false
			state["isloginerror"] = false
			return state
		}
		case "LOGIN_FAILURE":{
			console.log("Here we have to write logic for LOGIN_FAILURE")
			state = {...state}

			
			state["isloginfetch"] = false
			state["isloginerror"] = true
			return state
		}
		case "INITIALISE_USER":{
			console.log("Here we have to INITIALISE USER")
			state = {...state}

			state["isloggedin"] = true
			state["user"] = action.payload
			console.log("after setting state ", state)
			return state
		}
		case "LOGOUT":{
			console.log("Here we have to LOGOUT USER")
			state = {...state}
			localStorage.clear()
			delete state["isloggedin"]
			delete state["user"]
			
			console.log("after removing state ", state)
			console.log("after removing localStorage ", localStorage)
			return state
		} 
		case "ADD_CART": {
	      state = { ...state };
	      console.log("state in ADD_CART = ", state)
	      state["cart"] = [state.cart, action.payload];
	      state["total"] = state.total + action.payload.price;
	      return state;
	    }
	    case "CART_DATA": {
	      state = { ...state };
	      state["cart"] = action.payload;
	      state["total"] = action.total;
	      console.log("cart total", state.total);

	      return state;
	    }

		case "REMOVE_CAKE_FROM_CART": {
			console.log("Here we have to REMOVE CAKE FROM CART ", state)
			 state = {...state}
			
			// //state["cart"] = state["cart"].filter((x) => (x.cakeid != action.payload.cake_id));
			//   var array_cart = state["cart"]; // make a separate copy of the array
			//   console.log("array_cart= ", array_cart)
			//   var index = array_cart.indexOf(action.payload.cake_id)
			//   if (index !== -1) {
			//     array_cart.splice(index, 1);
			//     state["cart"] = array_cart;
			//   }
			console.log("state['cart']", state.cart.data)
            state.cart.data.splice(action.array_index, 1);

     		 state["total"] = state["total"] - action.price;
			
			console.log("after removing cake from cart state = ", state);
			
			return state;
		}

		case "ADD_ADDRESS": 
		{
			console.log("Here we have to ADD_ADDRESS ", state)
			 state = {...state}
			 state["username"] = action.payload.name;
			 state["address"] = action.payload.address;
			 state["phone"] = action.payload.phone;
			 state["city"] = action.payload.city;
			 state["pincode"] = action.payload.pincode;
			
			console.log("after adding address state = ", state);
			
			return state;

		}

		case "CHECKOUT_STAGE":
		{
			console.log("Here we have to CHECKOUT_STAGE ", state)
			 state = {...state}
			 state["counter"] = action.counter+1

			 console.log("after incrementing counter = ", state);
			
			return state;
		}

		case "PLACE_ORDER":
		{
			console.log("Here we have to write logic for PLACE_ORDER")
			state = {...state}

			
			state["isorderfetch"] = true
			
			return state
		}

		case "PLACE_ORDER_SUCCESS":
		{			
			state = {...state}
			state["success_msg"] = action.success_msg
			state["isorderfetch"] = false
			console.log("After PLACE_ORDER state =", state)
			return state
		} 

		case "ORDER_DETAILS":
		{
			state = {...state}
			state["isorderdetailsfetch"] = true
			console.log("Before ORDER_DETAILS state =", state)

			return state
		}
		case "ORDER_DETAILS_SUCCESS":
		{
			state = {...state}
			state["isorderdetailsfetch"] = false
			state["error_orderDetails"] = null
			state["cake_orders"] = action.payload
			console.log("After ORDER_DETAILS state =", state)

			return state
		}
		case "ORDER_DETAILS_FAILURE":
		{
			state = {...state}
			state["isorderdetailsfetch"] = false
			state["error_orderDetails"] = action.orderDetailsError
			console.log("After ORDER_DETAILS state =", state)

			return state
		}

		default : return state
	}
}

export default demo