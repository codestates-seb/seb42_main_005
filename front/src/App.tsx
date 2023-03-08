import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import MyInfo from "./Pages/User/MyInfo";
import MyPharmacy from "./Pages/Pharm/MyPharmacy";
import Reports from "./Pages/Admin/Reports";
import Users from "./Pages/Admin/Users";
import FindPW from "./Pages/FindPW";
import Certify from "./Pages/Admin/Certify";
import SignOut from "./Pages/SignOut";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign_up" element={<SignUp />}></Route>
          <Route path="/sign_out" element={<SignOut />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/find_pw" element={<FindPW />}></Route>
          <Route path="/user-my_info" element={<MyInfo />}></Route>
          <Route path="/pharm-my_pharmacy" element={<MyPharmacy />}></Route>
          <Route path="/admin-reports" element={<Reports />}></Route>
          <Route path="/admin-users" element={<Users />}></Route>
          <Route path="/admin-certify" element={<Certify />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
