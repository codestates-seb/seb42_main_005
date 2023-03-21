
//! API
const API = ""

// 약국 리스트 -> PharmList.json
export const API_PharmLists = {
  DUMMY_API: "http://localhost:3002/response",
  REAL_API: `${API}/store`,
};
// 약국 상세정보 -> Pharm.json
export const API_PharmItem = {
  DUMMY_API: "http://localhost:3020/response",
  REAL_API: `${API}/store`,
};
// 약국 리뷰 -> Review.json
export const API_PharmDetail = {
  DUMMY_API: "http://localhost:3010/response",
  REAL_API: `${API}/store`,
};
// 내약국 상세정보 -> Pharm.json
export const API_PharmacyInformation = {
  DUMMY_API: "http://localhost:3020/response",
  REAL_API: `${API}/store`,
};
// 약국 리뷰 -> Review.json
export const API_ReviewUnit = {
  DUMMY_API: "http://localhost:3010/response",
  REAL_API: `${API}/store`,
};
// 새 리뷰 작성 -> Review.json
export const API_WriteReviewForm = {
  DUMMY_API: "http://localhost:3010/response",
  REAL_API: `${API}/store`,
};
// 비밀번호 찾기 
export const API_FindPW = {
  DUMMY_API: "",
  REAL_API: `${API}/users/password`,
};
// 일반계정 마이페이지 (myinfo) -> user_myInfo.json
export const API_MyInfoInformation = {
  DUMMY_API: "http://localhost:3030/response",
  REAL_API: `${API}/users`,
};
// 일반계정 마이페이지 (myReviews) -> user_myReviews.json
export const API_MyInfoReviews = {
  DUMMY_API: "http://localhost:3040/response",
  REAL_API: `${API}/store`,
};
// 일반계정 마이페이지 (myLikes) -> user_myLikes.json
export const API_MyInfoLikes = {
  DUMMY_API: "http://localhost:3050/response",
  REAL_API: `${API}/users`,
};
// 약사계정 마이페이지 (Myinfo) -> pharm_myInfo.json
export const API_MyPharmInfo = {
  DUMMY_API: "http://localhost:3060/response",
  REAL_API: `${API}/store`,
};
// 약사계정 마이페이지 (MyPharmacy) -> Pharm.json
export const API_MyPharmacy = {
  DUMMY_API: "http://localhost:3060/response",
  REAL_API: `${API}/store`,
};
// 관리자계정 전체회원관리 (Users) -> admin_users.json
export const API_Users = {
  DUMMY_API: "http://localhost:3060/response",
  REAL_API: `${API}/users`,
};
