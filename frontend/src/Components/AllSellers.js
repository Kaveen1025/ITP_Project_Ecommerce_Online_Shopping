import axios from "axios";
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
//import {ClipLoader} from "react-spinners";

export default function AllRequests(props) {
  const [sellers, setsellers] = useState([]);
  // const [loads, setLoad] = useState(false);
  const [data, setData] = useState();
  let username = "";
  let password = "";
  let email = "";
  let emailContent = {
    email,
    username,
    password,
  };

  useEffect(() => {
    function getsellers() {
      axios
        .get("http://localhost:8070/seller/get")
        .then((res) => {
          setsellers(res.data);
          console.log(res.data);
          // hello
        })
        .catch((err) => {
          alert(err);
        });
    }

    getsellers();
  }, []);

  function deleteSeller(id) {
    axios
      .delete("http://localhost:8070/seller/delete/" + id)
      .then((res) => {
        document.getElementById("txt").innerHTML =
          "Seller Deleted Successfully!";
        const afterDeleteSeller = sellers.filter((seller) => seller._id !== id);
        setsellers(afterDeleteSeller);
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function confirmRequest(id) {
    //e.preventDefault();
    // let flag = 0;
    axios
      .get("http://localhost:8070/seller/get/" + id)
      .then((res) => {
        //setData(res.data);
        //console.log(res.data.ownername)
        password = passwordGenerator(25);
        console.log(password);
        // if same usename came
        //  while(flag == 0){
        username = usernameGenerator(res.data.companyname);
        // axios
        //   .get("http://localhost:8070/orgseller/getUsername/" + username)
        //   .then((res) => {
        //     console.log(res.data);

        //    // document.getElementById("txt").innerHTML =
        //         //"Seller Accepted Successfully!";
        //     // what if
        //   })
        //   .catch((err) => {
        //     alert(err);
        //   });
        let ownername = res.data.ownername;
        let mobile = res.data.mobile;
        let companyname = res.data.companyname;
        let address = res.data.address;
        let year = res.data.year;
        let email = res.data.email;
        let description = res.data.description;
        let logo = res.data.logo;

        const newSeller = {
          ownername,
          mobile,
          companyname,
          address,
          year,
          email,
          description,
          logo,
          username,
          password,
        };

        console.log(newSeller);

        emailContent = {
          email: res.data.email,
          username,
          password,
        };


        axios
        .post("http://localhost:8070/orgseller/add", newSeller)
        .then(() => {
            alert("Added");
          // emailjs
          //   .send(
          //     "service_amyey5b", //your service id
          //     "template_fy5ukg1", // template id
          //     emailContent,
          //     "user_yX9pt2mdVNlUhiI2lw7tv" // user access
          //   )
          //   .then(
          //     (result) => {
          //       console.log(result.text);
          //       alert("send successfully");
  
          //       // document.getElementById("verifyBtn").disabled = false;
          //     },
          //     (error) => {
          //       console.log(error.text);
          //     }
          //   );
          // document.getElementById("txt").innerHTML = "Student Added Successfully!";
        })
        .catch((err) => {
          alert(err);
        });
      })
      .catch((err) => {
        alert(err);
      });

   
  }

  function usernameGenerator(companyName) {
    var result = companyName;
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function passwordGenerator(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <div className="container">
      <h1>Seller Requests</h1>
      {/* <h1 id="txt"></h1> */}
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">COMPANY NAME</th>
            <th scope="col">OWNER'S NAME</th>
            <th scope="col">YEAR</th>
            <th scope="col">ACCEPT OR DECLINE NEW SELLER</th>
          </tr>
        </thead>
        {sellers.map((seller, index) => {
          return (
            // <div>

            <tbody>
              <tr>
                <th>{seller.companyname}</th>
                <td>{seller.ownername}</td>
                <td>{seller.year}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    style={{ marginRight: "10px" }}
                    onClick={() => confirmRequest(seller._id)}
                  >
                    ACCEPT
                  </button>
                  <button
                    class="btn btn-primary"
                    onClick={() => deleteSeller(seller._id)}
                    style={{ marginRight: "10px" }}
                  >
                    DECLINE
                  </button>
                </td>
              </tr>
            </tbody>
            // </div>
          );
        })}

        {/* </div> */}
      </table>
    </div>
  );
}
