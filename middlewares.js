// export function FirstMiddleWare(store){
// 	return function(next){
// 		return function(action){
			
// 		}
// 	}
// }

//ES6
let logger = store=>next=>action=>{
	console.log("before action", action.type,  store.getState())

			var  result =  next(action)
			console.log("after action store state is.....", store.getState())
			return result
}

export default logger;
//redux logging