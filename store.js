import  {createStore , applyMiddleware} from "redux"
import demo from "./reducers"
import logger from "./middlewares"

var middlewares = applyMiddleware(logger)
var store = createStore(demo, middlewares)


//console.log(".........",store.getState())

// store.dispatch(
// {
// 	type:"LOGIN",
// 	payload:{email:"pranalidalvi@gmail.com", name:"Pranali Dalvi"}
// }) //parameters are actions 
//acions are plain js objects with key known as type
// console.log("........ after login match", store.getState())

export default store
