import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminHeader(props) {

const [adminFirstName, setAdminFirstName] = useState("");
const [adminLastName, setAdminLastName] = useState("");
  useEffect(() =>{

		let objectID = "";
		function getAdmin(){

			objectID = localStorage.getItem("AdminID");

			axios.get("https://tech-scope-online.herokuapp.com/Admin/getAdmin/"+ objectID).then((res) =>
			{
				
				setAdminFirstName(res.data.firstName);
        setAdminLastName(res.data.lastName);
				
			}).catch((err) =>{
				alert(err);
			})
		}
	   
		getAdmin();


	}, []);

  function Logout(){
    localStorage.removeItem("AdminID");
    props.history.push("/AdminLogin");
  }


  return (
    <div style = {{marginTop : "65px"}}>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img className="card-img-top" src = {'../Images/Logo.png'} style = {{width: "55px"}}alt="Card image cap"/>

  <a class="navbar-brand" href="#" >Tech Scope</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/Admin/Home">Home<span class="sr-only">(current)</span></Link>
      </li>
      {/* <li class="nav-item">
        <Link class="nav-link" to="/Seller/Home">My Items</Link>
      </li> */}

      <li class="nav-item">
        <Link class="nav-link" to ="/Admin/Sellers">Sellers</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to ="/Admin/Customers">Customers</Link>
      </li>
  <li class="nav-item">
        <Link class="nav-link" to ="/Admin/Admins">Admins</Link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
     {/*Custoemr Profile picture */}
     {/* <img className="card-img-top" src = {'/Images/shopping-cart.png'} style = {{width: "30px", borderRadius : "0px",marginLeft : "10px",marginRight : "20px"}}alt="Card image cap"/> */}
     <b style = {{marginRight : "10px"}}>{adminFirstName}<span> </span>{adminLastName}</b>
      <img className="card-img-top" src = {'/Images/a.png'} style = {{width: "50px", borderRadius : "30px",marginLeft : "10px",marginRight : "10px"}}alt="Card image cap"/>
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
