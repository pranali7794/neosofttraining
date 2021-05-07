import { Component } from "react"

class ErrorBoundary extends Component{
	constructor(){
		super()
		this.state = {
			hasError : false
		}
	}

	static getDerivedStateFromError(error){
		return {
			hasError : true
		}
	}

	render(){
		if(this.state.hasError){
			return(
				<div><h1>Ooops! some error ocurred</h1></div>

				)
		}
		else{
			return this.props.children
		}
	}

}
export default ErrorBoundary
//development(blinks and disappears) or production