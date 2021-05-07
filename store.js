import  {createStore , applyMiddleware} from "redux"
import demo from "./reducers"
import logger from "./middlewares"
import createSaga from "redux-saga"
import {LoginSaga, RootSaga} from "./sagas.js"
import thunk from "redux-thunk"

var sagaMiddleware = createSaga()

var middlewares = applyMiddleware( sagaMiddleware , thunk)
var store = createStore(demo, middlewares)
{
sagaMiddleware.run(RootSaga)
}

//console.log(".........",store.getState())

// store.dispatch(
// {
// 	type:"LOGIN",
// 	payload:{email:"pranalidalvi@gmail.com", name:"Pranali Dalvi"}
// }) //parameters are actions 
//acions are plain js objects with key known as type
// console.log("........ after login match", store.getState())

export default store
