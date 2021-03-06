import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import p2 from "../images/p3.jpg";
import v1 from "../images/visa2.png";
import v2 from "../images/master2.png";
import v3 from "../images/paypal2.png";

// import {Text} from 'react-native';

export default function ItemView(props) {
  const [items, setItems] = useState([]);
  let [itemss,setItemss] = useState([]);
  const [ratings, setRatings] = useState([]);

  let [allitems, setAllitems] = useState([]);
  // let [filtereditems,setFiltereditems] = useState([]);

  // let [ICategory, setICategory]= useState("")
  let [k,setK]=useState([]);
  var ipsumText = true;

  let reviews = [];
  // let items = [];
  let itemName = "";
  let itemBrand = "";
  let itemQuantity = "";
  let itemModel = "";
  let itemPrice = "";
  let itemUnit = "";
  let itemDescription = "";
  let itemSpecification = "";
  let itemWHT = "";
  let itemWarrenty = "";
  let itemColors = "";
  let itemImage = "";
  let itemCategory = "";
  let itemAvailability = "";
  let itemDiscount = "";
  let itemFinalprice = "";
  let itemDispercentage = "";
  let itemsel_id="";

  let Review = "";
  let [abc, setabc] = useState([]);
  let reviewWithItem = {
    itemName,
    itemBrand,
    itemQuantity,
    itemModel,
    itemPrice,
    itemUnit,
    itemDescription,
    itemSpecification,
    itemWHT,
    itemWarrenty,
    itemColors,
    itemImage,
    itemCategory,
    itemAvailability,
    itemDiscount,
    itemFinalprice,
    itemDispercentage,
    itemsel_id,
    Review,
  };

  let reviewWithItems = [];

  useEffect(() => {
    function getReview() {
      const objectId = props.match.params.id;
      axios
        .get("https://tech-scope-online.herokuapp.com/review/get")
        .then((res) => {
          // setReview(res.data);
          const filter = res.data.filter(
            (itemrev) => itemrev.itemid === objectId
          );
          reviews = filter;
          console.log(reviews);
          axios
            .get("https://tech-scope-online.herokuapp.com/items/get/" + objectId)
            .then((res) => {
              // ICategory= res.data.Category;
              // console.log(ICategory);
              setItems(res.data);
              console.log(res.data);
              //   console.log(items);
              createReview(reviews, items);
              calculateStarRating(reviews);
              console.log(items)


              setK(res.data.Images)
              console.log(k)
              console.log(k[0])
              const str = 'The quick, brown fox jumps over, the lazy dog.'
              const words = str.split(',')
             console.log(words)
            //  console.log(items.Images)
//revirw

            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => {
          alert(err);
        });
    }

    function createReview(reviews, items) {
      let j = 0;
      for (let i = 0; i < reviews.length; i++) {
        j = 0;
        for (j = 0; j < items.length; j++) {
          if (reviews[i].itemid === items[j]._id) {
            reviewWithItem = {
              itemName: items[j].Item_name,
              itemBrand: items[j].Brand,
              itemQuantity: items[j].Quantity,
              itemModel: items[j].Model,
              itemPrice: items[j].Price,
              itemUnit: items[j].Stock_keeping_unit,
              itemDescription: items[j].Description,
              itemSpecification: items[j].Specification,
              itemWHT: items[j].WHT,
              itemWarrenty: items[j].Warrenty,
              itemColors: items[j].Other_colors,
              itemImage: items[j].Images[0],
              itemCategory: items[j].Category,
              itemAvailability: items[j].ItemAvailabilityStatus,
              itemDiscount: items[j].DiscountStatus,
              itemFinalprice: items[j].FinalPrice,
              itemDispercentage: items[j].DiscountPrecentage,
              Review: reviews[i].noofstars,
              
            };
            
            reviewWithItems.push(reviewWithItem);
          }
        }
      }
   

      console.log(reviewWithItems);
      setabc(reviewWithItems);
    }

    getReview();
    // filtercatogory();
  }, []);

  console.log(itemCategory)

  function calculateStarRating(re) {
    let totalNoRatings = 0;
    let totalstarforRatingCount = 0;
    let starCount = 0;
    let average = 0;

    console.log(re);

    for (let j = 0; j < reviews.length; j++) {
      // if(items._id == ratings[j].itemid){
      totalNoRatings++;
      // console.log("s")
      starCount += parseInt(reviews[j].noofstars);
      // }
    }

    totalstarforRatingCount = totalNoRatings * 5;
    average = parseInt((starCount / totalstarforRatingCount) * 5);
    console.log(average);
    displayStarRating(average);
  }

  function displayStarRating(totalAverage) {
    let txt = "";
    if (isNaN(totalAverage)) {
      txt = "No Ratings yet!";
      document.getElementById("stars").innerHTML = txt;
      // document.getElementById('stars').style.color = "#FF0000";
    } else {
      for (let j = 0; j < totalAverage; j++) {
        txt += '<span class="fa fa-star checked"></span>';
      }
      for (let j = 0; j < 5 - totalAverage; j++) {
        txt += '<span class="fa fa-star"></span>';
      }

      document.getElementById("stars").innerHTML =
        txt + "  " + totalAverage + ".0 / 5.0";
    }
  }

  function addToCart(id) {
    /// complete this
    axios
      .get("https://tech-scope-online.herokuapp.com/items/get/" + id)
      .then((res) => {
        console.log(res.data);
        if (res.data.ItemAvailabilityStatus === false) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Item is not available Right now!",
          });
        } else {
          let CustomerID = localStorage.getItem("CustomerID");

          // https://tech-scope-online.herokuapp.com/ShoppingCart/getOneCart/:id
          axios
            .get("https://tech-scope-online.herokuapp.com/ShoppingCart/getOneCart/" + CustomerID)
            .then((res) => {
              let cartID = res.data._id;
              console.log(res.data);
              let packages = res.data.PackageIDs;
              let newwItems = res.data.ItemIDs;

              let falgs = 0;
              for (let i = 0; i < newwItems.length; i++) {
                if (newwItems[i] === id) {
                  falgs = 1;
                }
              }
              newwItems.push(id);
              console.log(newwItems);

              const updatedCart = {
                customerID: CustomerID,
                PackageIDs: packages,
                ItemIDs: newwItems,
              };

              if (falgs === 0) {
                axios
                  .put(
                    "https://tech-scope-online.herokuapp.com/ShoppingCart/updateSItem/" + cartID,
                    updatedCart
                  )
                  .then((res) => {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Item added to cart Successfully!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Please try again!",
                    });
                  });
              } else if (falgs === 1) {
                Swal.fire("Item Already in Your Shopping Cart.");
              }
            })
            .catch((err) => {
              alert(err);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  function buyNow(id) {
    axios
      .get("https://tech-scope-online.herokuapp.com/items/get/" + id)
      .then((res) => {
        console.log(res.data);
        if (res.data.ItemAvailabilityStatus === false) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Item is not available Right now!",
          });
        } else {
          let CustomerID = localStorage.getItem("CustomerID");

          // https://tech-scope-online.herokuapp.com/ShoppingCart/getOneCart/:id
          axios
            .get("https://tech-scope-online.herokuapp.com/ShoppingCart/getOneCart/" + CustomerID)
            .then((res) => {
              let cartID = res.data._id;
              console.log(res.data);
              let packages = res.data.PackageIDs;
              let newwItems = res.data.ItemIDs;

              let falgs = 0;
              for (let i = 0; i < newwItems.length; i++) {
                if (newwItems[i] === id) {
                  falgs = 1;
                }
              }
              newwItems.push(id);
              console.log(newwItems);

              const updatedCart = {
                customerID: CustomerID,
                PackageIDs: packages,
                ItemIDs: newwItems,
              };

              if (falgs === 0) {
                axios
                  .put(
                    "https://tech-scope-online.herokuapp.com/ShoppingCart/updateSItem/" + cartID,
                    updatedCart
                  )
                  .then((res) => {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Item added to cart Successfully!",
                      showConfirmButton: false,
                      timer: 1500,
                    });

                    props.history.push("/Customer/MyShoppingCart");
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Please try again!",
                    });
                  });
              } else if (falgs === 1) {
                Swal.fire("Item Already in Your Shopping Cart.");

                props.history.push("/Customer/MyShoppingCart");
              }
            })
            .catch((err) => {
              alert(err);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }






//   const answer_array = answer.split(',');

//   const updatedAnswersCount = update(this.state.answersCount, {
//     [answer]: {$apply: (currentValue) => currentValue + 1},
//    });

//    let updatedAnswersCount = null;

// answer_array.forEach((key) => {
//  updatedAnswersCount = update(this.state.answersCount, {
//   [answer]: {$apply: (currentValue) => currentValue + 1},
//  });
// }

// useEffect(() => {



//   function CheckReview(id) {
//     // let CustomerID = localStorage.getItem("CustomerID");
//     const objectId = props.match.params.id;
//       axios
//         .get("https://tech-scope-online.herokuapp.com/review/get")
//         .then((res) => {
//           // setReview(res.data);
//           const filter = res.data.filter(
//             (itemrev) => itemrev.itemid === objectId
//           );
//           reviews = filter;
//           console.log(reviews);
       
//           let CustomerID = localStorage.getItem("CustomerID");

//           // https://tech-scope-online.herokuapp.com/ShoppingCart/getOneCart/:id
//           axios
//             .get("https://tech-scope-online.herokuapp.com/item/getAll")
//             .then((res) => {
//               setItemss(res.data);
//               console.log(res.data);
//               // reviews.itemid = item._id;
//               // let cartID = res.data._id;
//               // console.log(res.data);
//               // let packages = res.data.PackageIDs;
//               // let newwItems = res.data.ItemIDs;

//               let falgs = 0;
//               // for (let i = 0; i < newwItems.length; i++) {
//                 if (reviews.itemid = itemss._id) {
//                   falgs = 1;
//                 }
//               // }
//               // newwItems.push(id);
//               // console.log(newwItems);

//               // const updatedCart = {
//               //   customerID: CustomerID,
//               //   PackageIDs: packages,
//               //   ItemIDs: newwItems,
//               // };

//               if (falgs === 0) {

//                 // writeReview(id)

//                 //  function writeReview(id) {
//                 //   props.history.push("/Customer/WriteReview/" + id);
//                 //  }
              

                  
//               } else if (falgs === 1) {
//                 Swal.fire("You have already review this item!");

                
//               }
//             })
//             .catch((err) => {
//               alert(err);
//             });
        
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   }


// // });

const str = 'The quick brown fox jumps over the lazy dog.';


  function viewReview(id) {
    props.history.push("/Customer/ItemReviews/" + id);

    
  }

  function writeReview(id) {
    props.history.push("/Customer/WriteReview/" + id);

  }

  // function showseller(id) {
  //   props.history.push("/Customer/ContactSeller/" + SellerID);

  // }

  // let [availabilityStatus,setAvailabilityStatus]=useState([]);
  // if(ipsumText.toString(items.Warrenty)==true){
  //   <Text>Available</Text>
  // }
  // else{
  //   <Text>Not Available</Text>
  // }

  
  return (
    <div style={{ padding: "20px 15px 10px 20px" }}>
      <div>
        <div className="row">
          <div className="col-3">
            <img
              style={{ width: "90%", paddingRight: "20px" }}
              src={"/Images/"+k[0]}
            />
     
            <div>
              <img
                style={{ width: "30%", padding: "10px" }}
                src={"/Images/" + k[1]}
              />
              {console.log(k)}
              <img
                style={{ width: "30%", padding: "10px" }}
                src={"/Images/" + k[0]}
              />
              <img
                style={{ width: "30%", padding: "10px" }}
                // src={p2}
                src={"/Images/" + k[2]}
              />
            </div>
          </div>

          <div className="col" style={{padding:'10px 50px 10px 10px'}}>
            <span style={{ fontSize: "22px" }}>
              <b>{items.Item_name} </b>
            </span>
            <br />
            <span style={{ fontSize: "16px", textAlign: 'justify' ,padding:'30px 10px 10px 10px' }}>{items.Description}</span>
            <br />
            <span style={{ fontSize: "14px" ,padding:'10px 30px 10px 10px'}}>{items.Specification}</span>
            <br />
            <br />
            {/* <span style={{fontSize:'18px'}}>Rs. {items.Price}.00/=</span><br/> */}
            &nbsp;
            {/* <span style={{fontSize:'16px'}}><i>discount : {items.DiscountPrecentage}%</i></span><br/><br/> */}
            <span style={{ fontSize: "19px" }}>
              Rs. {items.Price}.00/=
            </span>
            <br />
            <br />
            <div>
              <button
                type="button"
                class="btn btn-danger"
                style={{ width: "50%" }}
                onClick={() => buyNow(items._id)}
              >
                Buy Now
              </button>
            </div>
            <br />
            <div>
              <button
                type="button"
                class="btn btn-success"
                style={{ width: "50%" }}
                onClick={() => addToCart(items._id)}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="col-4">
            <span class="title2">For Inquiries and Complaints</span>
            <br />
            <br />
            <div>
              <a href="#editEmployeeModal" class="edit" data-toggle="modal">
                <Link to={`/Customer/contactseller/${items.SellerID}`} className="nav-link">
                  <button type="button" class="btn btn-outline-info" style={{ borderRadius: "25px" }} 
                  // onClick={() => showseller(items.SellerID)}
                  >
                    <i class="fas fa-comments"></i> Contact Seller
                  </button>
                </Link>
              </a>
            </div>
            <div>
              <a href="#editEmployeeModal" class="edit" data-toggle="modal">
                <Link to="/Customer/contactus" className="nav-link">
                  <button type="button" class="btn btn-outline-info" style={{ borderRadius: "25px" }}>
                    <i class="fas fa-comment-alt"></i> Contact Admin
                  </button>
                </Link>
              </a>
            </div>
            <br />
            <br />
            <br />
            <br />
            <span>Payment Methods :</span>&emsp;&emsp;
            <img alt="Visa" src={v1} style={{ width: "10%" }} />
            &emsp;
            <img alt="Master" src={v2} style={{ width: "10%" }} />
            &emsp;
            <img alt="Paypal" src={v3} style={{ width: "10%" }} />
          </div>
        </div>
        <br />
        <br />
        <div className="row" style={{ padding: "0px 10px 10px 10px" }}>
          <div className="col-8">
            <div
              className="row"
              style={{
                backgroundColor: "white",
                lineHeight: "32px",
                borderRadius: "15px",
                padding: "10px 0px 20px 10px",
                width: "90%",
                boxShadow: "0 0 5pt 0.5pt #dcdcdc",
              }}
            >
              <span
                style={{
                  alignItems: "center",
                  fontSize: "20px",
                  padding: "10px 10px 20px 10px",
                }}
              >
                <b>Item Description</b>
              </span>

              <div className="col-2">
                <span>Brand</span>
                <br />
                <span>Model</span>
                <br />
                <span>Status</span>
                <br />
                {/* <span>Specification</span> */}
                {/* <br /> */}
                <span>Warrenty</span>
              </div>
              <div className="col-1">
                <span> : </span>
                <br />
                <span> :</span>
                <br />
                <span> : </span>
                <br />
                {/* <span> : </span> */}
                {/* <br /> */}
                <span> : </span>
              </div>
              &ensp;
              <div className="col">
                <span>{items.Brand} </span>
                <br />
                <span>{items.Model} </span>
                <br />
                <span>
                {(() => {
                  if (items.ItemAvailabilityStatus == true){
                    return (
                        <span>Available</span>
                    )}
                  return <span>Not Available</span>
                  })()}
                  </span>
                <br />
                {/* <span>{items.Specification} </span> */}
                {/* <br /> */}
                <span>
                {(() => {
                  if (items.Warrenty == true){
                    return (
                        <span>Available</span>
                    )}
                  return <span>Not Available</span>
                  })()}
                </span>
                
              </div>
              <div className="col-2">
                <span> Quantity</span>
                <br />
                <span>Other Colors </span>
                <br />
                <span> Discount</span>
                <br />
                <span> Category</span>
                <br />
                <span> WHT</span>
                <br />
              </div>
              <div className="col-1">
                <span> : </span>
                <br />
                <span> : </span>
                <br />
                <span> : </span>
                <br />
                <span> : </span>
                <br />
                <span> : </span>
                <br />
              </div>
              <div className="col-4">
                <span>{items.Quantity}</span>
                <br />
                <span>{items.Other_colors}</span>
                <br />
                <span>
                {(() => {
                  if (items.DiscountStatus == true){
                    return (
                        <span>Available</span>
                    )}
                  return <span>Not Available</span>
                  })()}
                  </span>
                <br />
                <span>{items.Category}</span>
                <br />
                <span>{items.WHT}</span>
                <br />
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <div className="col">
                <span style={{ alignItems: "center", fontSize: "20px" }}>
                  <b>Ratings And Reviews</b>
                </span>{" "}
                <br />
                <br />
                <div className="row">
                  <div className="row">
                    {/* <span style={{fontSize:'22px', fontStyle:'strong', textAlign:'center'}}>&emsp;&emsp;{items.Review}/5</span><br/> */}
                    <span>
                      <div id="stars" class="card-text" style={{fontSize:'20px'}}>
                        <br />
                        <span id="review">4.0 / 5.0</span>
                        <br />
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <br />
                        <span class="fa fa-star"></span>
                      </div>
                    </span>
                  </div>
                  <div className="row">
                  <div className="col">
                    <div>
                      <br />
                      <a
                        href="#editEmployeeModal"
                        class="edit"
                        data-toggle="modal"
                      >
                        <button
                          type="button"
                          style={{ fontSize: "16px", borderRadius: "15px" }}
                          class="btn btn-primary"
                          onClick={() => viewReview(items._id)}
                        >
                          View Reviews
                        </button>
                      </a>
                    </div>
                    </div>
                    <div className="col">
                    <div>
                      <br />
                      <a
                        href="#editEmployeeModal"
                        class="edit"
                        data-toggle="modal"
                      >
                        <button
                          type="button"
                          style={{ fontSize: "16px", borderRadius: "15px" }}
                          class="btn btn-info"
                          onClick={() => writeReview(items._id)}
                        >
                          Write a Review
                        </button>
                      </a>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <br/><br/>
            <div class="row" style={{padding:'10px 10% 10px 30px'}}>
                <span style={{fontSize:'18px'}}>Similar Items</span><br/><br/>
                <div class="col-sm-2" style={{ paddingBottom:'30px'}}>
                    <div class="card" style={{width: '80%', height: '90%', backgroundColor:'white', borderRadius:'10px', borderColor:'#00408C', paddingBottom:'20px',boxShadow:'4px 4px 4px 4px #DCDCDC'}}>
                        <div class="card-body">
                            <img src={p2} style={{width:'80%',paddingBottom:'10px'}}/><br/>
                            <span style={{fontSize:'14px'}}>{reviewss.itemName}</span><br/>
                            <span style={{fontSize:'13px'}}>{reviewss.itemImage}</span><br/>
                            <span style={{fontSize:'13px'}}>{reviewss.DiscountStatus}</span><br/>
                            <span style={{fontSize:'13px'}}>{reviewss.itemPrice}</span>
                            <div style={{color: "#f9d71c"}}>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div> */}
      </div>
    </div>
  );
}
