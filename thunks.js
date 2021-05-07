export function myThunk(){
	return (dispatch , getState)=>{
		//task
		var state = getState()
		dispatch({
			type:"HELLO"
		})
	}
}