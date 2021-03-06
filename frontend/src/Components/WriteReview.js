import React, { useState, useEffect } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
// mer
// import ReactStars from "react-rating-stars-component";
// import { render } from "react-dom";
import Swal from "sweetalert2";

import "../Css/writereview.css";

import go from "../images/p2.jpg";
import g1 from "../images/iphone-x-.jpg";
// import g1 from "..public/Images/iphone-x-.jpg";
// import g1 from "./../Images/iphone-x-.jpg";

export default function WriteReview(props) {
  let history = useHistory();

  const [description, setDescription] = useState("");
  // const [date,setDate] = useState("");
  // const [noofstars,setNoofstars] = useState("");

  const [items, setItems] = useState([]);
  let [k,setK]=useState([]);

  let customerid = ""; ///local Storage
  let itemid = ""; // url
  // let sellerid  = "";
  // let reviewstatus  = "";
  // let reportreason  = "";
  let count = 0;

  useEffect(() => {
    const objectId = props.match.params.id;
    function getItems() {
      axios
        .get("https://tech-scope-online.herokuapp.com/items/get/" + objectId)
        .then((res) => {
          setItems(res.data);
          console.log(res.data);

          setK(res.data.Images)
          // setItems(items);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getItems();
  }, []);

  function sendData(e) {
    e.preventDefault();
    getNoOfStars();
    const cusId = localStorage.getItem("CustomerID");
    const ItemId = props.match.params.id;
    const newReview = {
      description,
      date: Date(),
      noofstars: count,
      customerid: cusId,
      itemid: ItemId,
    };
    axios
      .post("https://tech-scope-online.herokuapp.com/review/add", newReview)
      .then(() => {
        setDescription(" ");
        Swal.fire("All Done!", "Review Submitted", "success");
        props.history.push("/Customer/Home");
      })
      .catch((err) => {
        alert(err);
      });
  }
  function getNoOfStars() {
    if (document.getElementById(1).checked) {
      count = 1;
    }if (document.getElementById(2).checked) {
      count = 2;
    }if (document.getElementById(3).checked) {
      count = 3;
    }if (document.getElementById(4).checked) {
      count = 4;
    }if (document.getElementById(5).checked) {
      count = 5;
    }
  }

  return (
    <div className="rev">
      <br />
      <div>
        <button
          type="button"
          style={{ fontSize: "14px", borderRadius: "15px" }}
          class="btn btn-info"
          onClick={() => history.goBack()}
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Go Back
        </button>
      </div>
      <div
        className="container"
        style={{
          padding: "20px 10px 10px 10px",
          width: "70%",
          borderRadius: "15px",
        }}
      >
        <div
          class="shadow-lg p-3 mb-5 bg-white rounded"
          style={{ width: "90%", alignItems: "center", borderRadius: "10px" }}
        >
          <h2 style={{ textAlign: "center", color: "black" }}>
            Write your Review
          </h2>
          <h5
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "18px",
              padding: "5px 0px 10px 0px",
            }}
          >
            Share your thoughts with us
          </h5>

          <hr />

          <div>
            <form onSubmit={sendData} className="contact2-form validate-form">
              <div
                className="row"
                style={{ fontSize: "22px", padding: "20px 0px 20px 50px" }}
              >
                <div className="col">
                  <span style={{ color: "black", fontStyle: "strong" }}>
                    <b>{items.Item_name}</b>
                  </span>
                </div>
                <div className="col">
                  <div className="rating">
                    <input type="radio" name="rating" value="5" id="5" />{" "}
                    <label for="5">???</label>
                    <input type="radio" name="rating" value="4" id="4" />{" "}
                    <label for="4">???</label>
                    <input type="radio" name="rating" value="3" id="3" />{" "}
                    <label for="3">???</label>
                    <input type="radio" name="rating" value="2" id="2" />{" "}
                    <label for="2">???</label>
                    <input type="radio" name="rating" value="1" id="1" />{" "}
                    <label for="1">???</label>
                  </div>
                </div>
              </div>
              <div className="row" style={{ padding: "0px 0px 20px 40px" }}>
                <div className="col-4">
                  <img
                    alt={go}
                    style={{ width: "70%" }}
                    src={"/Images/" + k[0]}
                  />
                  <div>
                    {/* <img style={{width:'30%',  padding:'10px'}} src=
                          {"/Images/"+items.Images}
                          />
                          <img style={{width:'30%',  padding:'10px'}} src=
                          {"/Images/"+items.Images}
                          />
                          <img style={{width:'30%',  padding:'10px'}} src=
                          {"/Images/"+items.Images}
                          /> */}
                  </div>
                  {/* <img src={"/Images/"+items.Images[0]}
              style={{width:'70%'}}/> */}
                </div>
                <div className="col">
                  <textarea
                    name="review"
                    style={{
                      width: "80%",
                      height: "80%",
                      borderRadius: "25px",
                      background: "#e6e6e6",
                      outline: "none",
                      border: "none",
                      padding: "20px",
                    }}
                    placeholder="Enter your review here"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row" style={{ padding: "20px 0px 20px 0px" }}>
                <center>
                  <button
                    type="submit"
                    style={{
                      width: "25%",
                      alignItems: "center",
                      borderRadius: "25px",
                      height: "45px",
                      fontSize: "18px",
                    }}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    //   <div className="container">

    //     <form onSubmit = {sendData} className="contact2-form validate-form">

    //           <div className="row">
    //             <div className="col">
    //               <span className="contact2-form-title"><b>Write Your Review</b></span>
    //             </div>
    //           </div>
    //           <div className="row">

    //           {/* {review.reviewitem.map((pack)=> { */}

    //             <div className="col">
    //               <span className="test">
    //                   {/* {pack.name} */}
    //                   </span>
    //             </div>

    //           {/* })
    //         } */}
    //             <div className="col">
    //               <div className="rating"> <input type="radio" name="rating" value="5" id="5"/>
    //                 <label for="5">???</label> <input type="radio" name="rating" value="4" id="4"/>
    //                 <label for="4">???</label> <input type="radio" name="rating" value="3" id="3"/>
    //                 <label for="3">???</label> <input type="radio" name="rating" value="2" id="2"/>
    //                 <label for="2">???</label> <input type="radio" name="rating" value="1" id="1"/>
    //                 <label for="1">???</label>
    //                 </div>
    //             </div>
    //           </div>
    //           <div class="row">

    //           {/* {review.reviewitem.map((pack)=> { */}

    //                           <div class="col-4">
    // 								<img
    //                                     // src={require('../images/'+pack.itemimage).default}
    //                                     className="card-img-top"/>
    //                 </div>

    // 						{/* })
    // 					} */}

    //             <div class="col">
    //             <div classNameName="wrap-input1 validate-input" data-validate = "Message is required">
    //                     <textarea className="input1" name="review" placeholder="Write your review here"onChange= {
    //                         (e)=>{
    //                           setDescription(e.target.value);
    //                         }
    //                       }></textarea>
    //                     <span className="shadow-input1"></span>
    //                 </div>
    //             </div>
    //           </div>
    //           <div className="row">
    //               <span className="contact2-form-title2">Your feedback help us to improve.</span>

    //           </div>
    //           <div className="row">
    //               <div className="container-contact2-form-btn">
    //                     <button className="contact2-form-btn">
    //                         <span> Submit </span>
    //                     </button>
    //                 </div>
    //           </div>
    //      </form>
    //  </div>
  );
}
// }
