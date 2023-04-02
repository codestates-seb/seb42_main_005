import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Header/Layout";
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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/sign_out" element={<SignOut />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find_pw" element={<FindPW />} />
            <Route path="/user-my_info" element={<MyInfo />} />
            <Route path="/pharm-my_pharmacy" element={<MyPharmacy />} />
            <Route path="/admin-reports" element={<Reports />} />
            <Route path="/admin-users" element={<Users />} />
            <Route path="/admin-certify" element={<Certify />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
export default App;
