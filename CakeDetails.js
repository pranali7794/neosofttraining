import { useParams , withRouter} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'

const star = <FontAwesomeIcon icon={faStar} />
const heart = <FontAwesomeIcon icon={faHeart} />
function CakeDetails(props){
    let [cakedetails, setCakedetails] = useState({})    
    let params = useParams()
    //let [addtocart, setAddToCart] = useState({})
	var token = localStorage.token
	
    useEffect(()=>{
        let cakedetailsapi = "https://apibyashu.herokuapp.com/api/cake/"+params.cakeid
        axios({
            url:cakedetailsapi,
            method:"get"
        }).then((response)=>{
            //console.log("response from cakes api : ",response.data.data)
            setCakedetails(response.data.data)
        }, (error)=>{
            console.log("response from cakes api : ",error)
        })
    }, [])
   
    
    function addToCart(){
        if(!props.loginstatus){
            alert("Please login first for adding cake to cart !!")
        }
        else{
        let addtocartapi = "https://apibyashu.herokuapp.com/api/addcaketocart"
        
        axios({
            url:addtocartapi,
            method:"post",
            headers:{ authtoken : token	},
            data:{            	
            	cakeid : cakedetails.cakeid , name : cakedetails.name, 
            	image : cakedetails.image, price : cakedetails.price ,
            	weight : cakedetails.weight
            }
            
        }).then((response)=>{
            console.log("response from add to cart api : ",response)    
            props.dispatch({
                type: "ADD_CART",
                payload: response.data.data
            })        
            alert("Cake added to cart successfully..")
            props.history.push("/cart")

        }, (error)=>{
            console.log("error from add to cart api : ",error)
            alert("Cake not added to cart .. Please try again")
        })
      }
    }

    return(
        <div className="card" style={{margin: "20px 140px"}}>
        <div className="card-body text-center" style={{backgroundColor: "rgba(0,0,0,.03)"}}>
            <div className="row">
                <div className="col-sm-6">
                    <div style={{margin: "10px 60px"}}>
                        <img src={cakedetails.image} 
                        class="card-img-top" alt={cakedetails.name} height="500px" />
                    </div>

                </div>
                <div className="col-sm-6">
                    <div style={{margin: "10px 20px"}}>
                        <h1 className="text-uppercase font-weight-bold pt-5 pb-3">{cakedetails.name}</h1>
                        <div className="pb-3">
                            <span className="text-warning">{star} {cakedetails.ratings}</span>
                            <br/><span style={{fontSize: "18px"}}>{cakedetails.reviews} reviews</span>
                        </div>
                        <div className="pb-3">{cakedetails.description}</div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Current price: 
                            <span className="text-warning"> ${cakedetails.price}</span>
                            </span>
                        </div>
                        <div className="pb-3"><span className="font-weight-bold">91%</span> of user enjoyed this product!
                            <span className="font-weight-bold"> (87 votes)</span>
                        </div>

                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Weight: {cakedetails.weight}KG</span></div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Flavour: 
                                <span className="font-italic text-warning"> {cakedetails.flavour}</span>
                            </span>
                        </div>

                        <div className="pb-3 text-uppercase" style={{fontSize: "23px"}}><span className="font-weight-bold">type</span><br/>{cakedetails.type}</div>

                        
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-sm-6">
                    <div className="font-weight-bold" style={{fontSize: "18px"}}>Ingredient:</div>
                    <div style={{fontSize: "16px"}}>
                    
                    {/* <h2>{JSON.stringify(cakedetails.ingredients)}</h2> */}
                
                </div>
                <div>cream | chocolate | dark chocolate | hazelnut | strawberry</div>
                    
                </div>
                <div className="col-sm-6" style={{fontSize: "20px"}}>
                  
                   <button type="button" onClick={addToCart} class="btn btn-warning text-uppercase p-3 text-white mr-2 font-weight-bold">Add to cart</button> 
                   
                    <button type="button" class="btn btn-warning p-3 text-white font-weight-bold">{heart}</button>
                </div>
            </div>
        </div>
        </div>
    )
}
CakeDetails = withRouter(CakeDetails)
export default connect(function(state,props){
	console.log(".... state initially in cake details", state)
    return {
        user : state?.user?.name,
        loginstatus : state?.isloggedin,
        cart : state?.cart?.data
    }
})(CakeDetails);