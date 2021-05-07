import  axios  from "axios"
import {call, put, takeEvery ,all} from "redux-saga/effects"

var base_url = process.env.REACT_APP_BASE_URL;

function login(action){
	//alert(base_url+"/api/login");

	return axios({
		method:"post",
		url : base_url+"/api/login",
		data: action.payload
	})
}

function place_order(action){
	return axios({
		method:"post",
		url : base_url+"/api/addcakeorder",
		data: action.payload,
		headers : {
            authtoken: localStorage.token
        }
	})
}

function orderDetails(action){
	return axios({
		method:"post",
		url : base_url+"/api/cakeorders",
		headers : {
            authtoken: localStorage.token
        }
	})
}

function* LoginGenerator(action){
	var result = yield call(login,action)
	if(result.data.token){
		console.log("payload for LOGIN_SUCCESS= ", result.data) //name, email , token, role
		yield put({type:"LOGIN_SUCCESS", payload:result.data}) //call to reducer
		localStorage.token= result.data.token
        // localStorage.email= result.data.email
         localStorage.name = result.data.name

	}
	else
	{
		yield put({type:"LOGIN_FAILURE"})
	}
}

function* OrderGenerator(action){
	var response = yield call(place_order,action)
	yield put({type:'PLACE_ORDER_SUCCESS', success_msg: response.data.messageg})
	
}

function* OrderDetailsGenerator(action){
	var res = yield call(orderDetails,action)
	if(res){
		yield put({type:"ORDER_DETAILS_SUCCESS", payload:res.data.cakeorders}) //call to reducer
	}
	else
	{
		yield put({type:"ORDER_DETAILS_FAILURE", orderDetailsError: "No Orders currently"})
	}
}

export function* LoginSaga(){
	 yield takeEvery("LOGIN", LoginGenerator)
} 

export function* OrderSaga(){
	 yield takeEvery("PLACE_ORDER", OrderGenerator)	
} 

export function* OrderDetailsSaga(){
	 yield takeEvery("ORDER_DETAILS", OrderDetailsGenerator)	
} 

export function* RootSaga(){
	yield all([LoginSaga(), OrderSaga(), OrderDetailsSaga()])
}