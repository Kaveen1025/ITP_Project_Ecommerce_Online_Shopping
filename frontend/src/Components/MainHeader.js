import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainHeader(props) {

const [username, setUsername] = useState("");
const [userImage,setUserImage] = useState("");
  useEffect(() =>{

		let objectID = "";
		function getCustomer(){

			objectID = localStorage.getItem("CustomerID");
			axios.get("https://tech-scope-online.herokuapp.com/Customer/get/"+ objectID).then((res) =>
			{
				
        setUsername(res.data.username);
        setUserImage(res.data.userImage);
				

				
				
			}).catch((err) =>{
				alert(err);
			})
		}
	   
		getCustomer();


	}, []);

  function Logout(){
    localStorage.removeItem("CustomerID");
    props.history.push("/CustomerLogin");
  }


  return (
    <div style = {{marginTop : "65px"}}>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img className="card-img-top" src = {'../Images/Logo.png'} style = {{width: "55px"}}alt="Card image cap"/>

  <a class="navbar-brand" href="#">Tech Scope</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/Customer/Home">Home<span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/Customer/AllItmes">Discover Items</Link>
      </li>
{/* applw */}
      <li class="nav-item">
        <Link class="nav-link" to="/Customer/DiscountedItems">Discover Discounted Items</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/Customer/Packages">Promotional Packages</Link>
      </li>
 
      <li class="nav-item">
        <Link class="nav-link" to="/Customer/MyOrders">My Orders</Link>
      </li>
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
     {/*Custoemr Profile picture */}
     {/* <img className="card-img-top" src = {'/Images/shopping-cart.png'} style = {{width: "30px", borderRadius : "0px",marginLeft : "10px",marginRight : "20px"}}alt="Card image cap"/> */}
     <b>{username}</b>
      <img className="card-img-top" src = {'/Images/'+userImage} style = {{width: "50px", borderRadius : "30px",marginLeft : "10px",marginRight : "10px"}}alt="Card image cap"/>
      <button class="btn btn-outline-danger my-2 my-sm-0" type="submit"   onClick={() => Logout()} >Logout</button>
    
    </form>
  </div>
</nav>
{/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search in Tech Scope" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
    </div>
  );
}
