import React, { useState, useEffect} from "react";
import axios from "axios";

import "../css/sellerprofile.css";

export default function SellerProfile(props) {

  const [orgSeller,setorgSellers] = useState([]);
  // const [loads,setLoad] = useState(false);
  // const [data,setData] = useState();
  
  useEffect(() =>{
      function getorgSellers(){
        const orgSellerid = "613a2af6b31f783accd94445";
          axios.get("http://localhost:8070/orgSeller/get/613a2af6b31f783accd94445").then((res) =>
          {
              setorgSellers(res.data);
              console.log(res.data);
              
              
          }).catch((err) =>{
              alert(err);
          })
      }
     
      getorgSellers();

    }, );

    function update(id){
      console.log(id);
      props.history.push("/update/" + id);
  };

  return (

    <div className="sellerprofile">
    <div className="height-100 bg-light">
      <br />
      <br />

      <div class="container">
        <div class="main-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <br></br>
                    <img
                       src = {require('../images/flight-logo.png').default} 
                      alt="Admin"
                      class="rounded-circle p-1 bg-black"
                      width="175"
                    />
                    <br></br>
                  </div>

				  <div className = "card border border-dark rounded ">
					  <br/>
					  <div className = "card-body">
                  <ul class="list-group list-group-flush">
                    <div class="shop">
                      <h4 class="mb-0" style = {{textAlign : "center"}}>{orgSeller.companyname}</h4>
                    </div>
                    <br></br>

                    <div class="shop">
                      <h6 class="mb-0" style = {{textAlign : "center"}} >{orgSeller.mobile}</h6>
                    </div>
                    <br></br>

                    <div class="shop">
                      <h6 class="mb-0" style = {{textAlign : "center"}}>{orgSeller.email}</h6>
                    </div>
                    <br></br>

             
                
                    <div class="mt-3">
                      <button class="btn btn-danger btn-block button-shape">
                        REQUEST DELETE
                      </button>
                    </div>
                  </ul>
				  <br/></div></div>
                </div>
              </div>
            </div>

            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder={orgSeller.ownername} readOnly
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder={orgSeller.companyname} readOnly
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="row">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder={orgSeller.mobile} readOnly
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder={orgSeller.email} readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <div class="form-group">
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="7"
                              placeholder={orgSeller.description} readOnly
                            ></textarea>
                          </div>
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control"
                            placeholder={orgSeller.year} readOnly
                          />
                          <br />
                          <div className="row">
                            <div class="form-group">
                              <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder={orgSeller.address} readOnly
                              ></textarea>
                            </div>
                          </div>
                        </div>
						<div className = "container">
						<div class="float-right">
            <button type="button" class="btn btn-primary">CHANGE PASSWORD</button>
						<button type="button" onClick = {()=>update(orgSeller._id)} class="btn btn-primary">EDIT</button>
							<span> </span>
							</div>
              <p id = {orgSeller._id} class="card-text">
                                
                            </p>
						</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </div>
    </div>
  );
}