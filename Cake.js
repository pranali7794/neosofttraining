var img="choc_truffle1.jpeg";

function Cake(props) {
	console.log("props received ", props)
	return (

		<div className="card" style={{width: "16rem"}}>
			  <img src={props.cakedata.image} className="card-img-top" alt="..." />
			  <div className="card-body">
			    <h5 className="card-title">{props.cakedata.name}</h5>    
			  </div>
			</div>	
		)
}

export default Cake;