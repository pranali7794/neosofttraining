import  axios  from "axios"
import {call, put, takeEvery ,all} from "redux-saga/effects"

function login(action){
	return axios({
		method:"post",
		url : "https://apibyashu.herokuapp.com/api/login",
		data: action.payload
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

export function* LoginSaga(){
	 yield takeEvery("LOGIN", LoginGenerator)

	
} 

export function* RootSaga(){
	yield all([LoginSaga()])
}