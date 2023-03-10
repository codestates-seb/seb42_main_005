import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
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
          //? 임시로 로그인 여부와 계정유형 할당 // isLogin= true | false // account=["User", "Pharm", "Admin"]
          <Route path="/" element={<Header isLogin={false} account="" />}>
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
    </>
  );
}
export default App;
