const demo = function (state={
	token: localStorage.getItem('token'),
	user:null,
	isloggedin	: localStorage.getItem('token') ? true : false,

}, action) {
	switch(action.type){
		case "LOGIN":{
			console.log("Here we have to write logic for LOGIN")
			state = {...state}

			state["isloggedin"] = true
			state["user"] = action.payload
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

		default : return state
	}
}

export default demo