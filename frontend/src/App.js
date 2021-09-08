import './App.css';

// import Counter from './Components/Counter';
// import CounterFunction from './Components/CounterFunction';
import Header from './Components/Header';
import AddStudent from './Components/AddStudent';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AllStudents from './Components/AllStudents';
import UpdateStudent from './Components/UpdateStudent';
import Login from './Components/Login';
import Side_bar from './Components/Side_bar';
import Add_items from './Components/Add_items';
import Update_Items from './Components/Update_Items';
import Seller_items from './Components/Seller_items';
import customer_wishlist from './Components/customer_wishlist';
import SideBarAdmin from './Components/SideBarAdmin';
import AView_all_the_items from './Components/AView_all_the_Items';
import Counts from './Components/count';
import MainHeader from './Components/MainHeader';
import Side_bar_Customer from './Components/Side_Bar_Customer';
import Footer_customer from './Components/Footer_customer';
import Home_Customer from './Components/Home_Customer';
import SellerProfile from './Components/SellerProfile';



function App() {
  // ReactSession.setStoreType("localStorage");
  return (
  <Router>
      <div>
      {/* <Route path = "/customer"  component = {Header}/> */}
    {/* <Side_bar/>  */}
    <Route path = "/SellerProfile" component = {SellerProfile}/>
       
        <SideBarAdmin/>
        {/* <Route path = "/Home" exact component= {AllStudents}/> */}
        {/* <MainHeader/> */}
     
      <Route path = "/header"  component = {Side_bar_Customer}/>
      <Route path = "/header"  component = {MainHeader}/>
      {/* <Route path = "/header" component = {Home_Customer}/> */}
     <Route path = "/header" exact component = {customer_wishlist}/>
      <Route path = "/header" component = {Footer_customer}/>

        {/* <Route path = "/" exact component = {Counts}/> */}




        <Route path = "/allTheItems" exact component = {AView_all_the_items}/>
        <Route path = "/addItem" exact component = {Add_items}/>
        <Route path = "/updateItem/:id" exact component = {Update_Items}/>
        <Route path = "/allItems" exact component = {Seller_items}/>
        {/* <Add_items/> */}

    
      


      {/* <Header/>

        <Route path = "/add" exact component = {AddStudent}/>
      <Route path = "/" exact component = {Login}/>
     
      <Route path = "/update/:id" exact component = {UpdateStudent}/> */}


      {/* add default to last <Route path = "/" exact component = {AddStudent}/>*/}
{/* <AddStudent/> */}
    </div>
  </Router>
  
  
  );
}

export default App;
