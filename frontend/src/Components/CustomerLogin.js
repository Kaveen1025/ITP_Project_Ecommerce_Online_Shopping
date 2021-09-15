import axios from "axios";
import React, {useState} from "react";
import { Link } from "react-router-dom";





export default function CustomerLogin(props){

    //remember me

    const[rememberMe, setRememberMe] = useState(false);

    const handleChange = (event) => {

        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
    
       
        setRememberMe(value);

        
      };
    

    const [passwordShown, setPasswordShown] = useState(false);

	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	  };

    let [username,setUsername] = useState("");
    let [password,setPassword] = useState("");
    let [errorMsg,setErrorMsg] = useState("");
   

    function loginUser(e){

        e.preventDefault();

        const loginCredentials = {
            username,
            password,
          }

        
        localStorage.setItem('rememberMe', rememberMe);
        localStorage.setItem('username', rememberMe ? username : '');
         
         
          axios.post("http://localhost:8070/Customer/loginCustomer", loginCredentials).then((res)=>{

           // setCustomer(res.data.customerLogin);
          localStorage.setItem('CustomerID', res.data.customerLogin._id);

             // sessionStorage.setItem('userID',"sss");

           // alert("Customer loggin Successfully!");
            //console.log("logging success");
            console.log(res.data);
            setErrorMsg("");
            props.history.push("/Customer/Home");


          }).catch((err) =>{

            //alert(err);
          console.log(err.response.data);
         // alert(err.response.data.error);
          setErrorMsg(err.response.data.error);
        

        })
    }

// SVGDefsElement
        function SignUp(){
            props.history.push("/CustomerRegistration")
        }


    return(
<div>
        <div className = "CustomerLogin">
        <div className="container">
        <div className="myCard">
            <div className="row">
                <div className="col-md-6">
                    <div className="myLeftCtn"> 
                        <form className="myForm" onSubmit = {loginUser}>
                            <header>Sign In</header>
                            
							<div className="form-group">
                                <h2>{errorMsg}</h2>
							<label htmlFor="username"><b>Username</b></label><br/>
                                <i className="fas fa-user"></i>
                                <input className="myInput" type="text" placeholder="Username" name="username" onChange={handleChange}
                                
                                onChange= {
                                    (e)=>{
                                      setUsername(e.target.value);
                                     
                                    } }
                                
                                    required/> 
                            </div>

    

                            <div className="form-group">
							<label htmlFor="password"><b>Password</b></label><br/>
                                <i className="fas fa-lock"></i>
                                <i className="bi bi-eye-fill" id="eyer" onClick={togglePassword}></i>
                                <input className="myInput" type={passwordShown ? "text" : "password"} id="Logipassword" placeholder="Password"  
                               
                                onChange= {
                                    (e)=>{
                                      setPassword(e.target.value);
                                     
                                    } }
                                
                                
                                    required /> 
                                    
                            </div>

                            <br/>

                            <input type="submit" className="butt" value="Sign In"/>
							
							<br/><br/>
							
							<div className="form-row">
								<div className="col">
                                <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={handleChange}/>
								<label className="remember"> Remember me </label>
								</div>
						
								<div className="col">
									<p className ="fp"> <Link to="/CustomerForgotPassword">Forgot Password?</Link></p>
								</div>
							</div>
							
							
                            
                        </form>
                    </div>
                </div> 
                <div className="col-md-6">
                {/* <img src={img6} alt="" id="LoginI"/> */}
                    <div className="myRightCtn">
                  
                            <div className="box"><header><b>Welcome to login</b></header>
                            
                            <h4 className ="acc" >Don't have an account?</h4><br/>
							
                                <input type="button"   onClick={() => SignUp()} className="butt_out" value="Sign Up"/>
                            </div>
                                
                    </div>
                </div>
            </div>
        </div>
</div>
</div></div>

    )


}