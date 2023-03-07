import { BrowserRouter, Routes, Route } from "react-router-dom";
// import styled from "styled-components";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import GeneralInfo from "./Pages/User/GeneralInfo";
import MyDrugs from "./Pages/User/MyDrugs";
import MyEnquiries from "./Pages/User/MyEnquiries";
import MyInfo from "./Pages/User/MyInfo";
import Enquiries from "./Pages/Pharm/Enquiries";
import MyPharmacy from "./Pages/Pharm/MyPharmacy";
import Reports from "./Pages/Admin/Reports";
import Users from "./Pages/Admin/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign_up" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/user-general_info" element={<GeneralInfo />}></Route>
          <Route path="/user-my_drugs" element={<MyDrugs />}></Route>
          <Route path="/user-my_enquiries" element={<MyEnquiries />}></Route>
          <Route path="/user-my_info" element={<MyInfo />}></Route>
          <Route path="/pharm-enquiries" element={<Enquiries />}></Route>
          <Route path="/pharm-my_pharmacy" element={<MyPharmacy />}></Route>
          <Route path="/admin-reports" element={<Reports />}></Route>
          <Route path="/admin-users" element={<Users />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
