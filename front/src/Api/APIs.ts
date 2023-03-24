//! API
export const API = "http://ec2-54-180-29-60.ap-northeast-2.compute.amazonaws.com:8080/api";

// 로그인
export const API_UserLogIn = {
  REAL_API: `http://ec2-54-180-29-60.ap-northeast-2.compute.amazonaws.com:8080/login`,
  AUTH_REAL_API: `${API}/auth`,//!
};
// 약사계정 회원가입 : pharmSignUpForms.tsx
export const API_PharmSignUpForms = {
  REAL_API: `${API}/users/store`,//!
};
// 일반계정 회원가입 : userSignUpForms.tsx
export const API_UserSignUpForms = {
  REAL_API: `${API}/users/normal`,//!
};
// 회원탈퇴 : SignOut.tsx
export const API_SignOut = {
  REAL_API: `${API}/users`,
};
// 약국 리스트 -> PharmList.json //
export const API_PharmLists = {
  REAL_API: `${API}/store`,
};
// 약국 상세모달 -> Pharm.json //
export const API_PharmItem = {
  REAL_API: `${API}/store`,
};
// 약국 상세정보 -> Pharm.json //
export const API_PharmInfo = {
  REAL_API: `${API}/store`,
};
// 약국 리뷰 -> Review.json //
export const API_PharmDetail = {
  REAL_API: `${API}/store`,
};
// 내약국 상세정보 -> Pharm.json //
export const API_PharmacyInformation = {
  REAL_API: `${API}/store`,
};
// 약국 리뷰 -> Review.json //
export const API_ReviewUnit = {
  DELETE_REAL_API: `${API}/store`,
  PATCH_REAL_API: `${API}/store`,
  POST_REAL_API: `${API}/store`,
  POST_COMMENT_REAL_API: `${API}`,
};
// 새 리뷰 작성 -> Review.json //
export const API_WriteReviewForm = {
  POST_REAL_API: `${API}/store`,
};
// 리뷰의 댓글 수정
export const API_ReviewOfReview = {
  REAL_API: `${API}/review`,
};
// 비밀번호 찾기 //
export const API_FindPW = {
  REAL_API: `${API}/users/password`,
};
// 일반계정 마이페이지 (myinfo) -> user_myInfo.json //
export const API_MyInfoInformation = {
  REAL_API: `${API}/users`,
};
// 일반계정 마이페이지 (myReviews) -> user_myReviews.json//
export const API_MyInfoReviews = {
  REAL_API: `${API}/store`,
};
// 일반계정 마이페이지 (MyReview) //! 내가 작성한 리뷰 리스트들 중 한줄
export const API_MyReview = {
  REAL_API: `${API}/store`,
};
// 일반계정 마이페이지 (myLikes) -> user_myLikes.json //
export const API_MyInfoLikes = {
  REAL_API: `${API}/users`,
};
// 일반계정 마이페이지 (LikedPharmacyUnit) //! 내가 찜한 약국 리스트들 중 한줄
export const API_LikedPharmacyUnit = {
  GET_REAL_API: `${API}/store/user`,
  DELETE_REAL_API: `${API}/store`,
};
// 약사계정 마이페이지 (Myinfo) -> pharm_myInfo.json //
export const API_MyPharmInfo = {
  REAL_API: `${API}/store`,
};
// 약사계정 마이페이지 (MyPharmacy) -> Pharm.json//
export const API_MyPharmacy = {
  REAL_API: `${API}/store`,
};
// 관리자계정 전체회원관리 (Users) -> admin_users.json
export const API_Users = {
  GET_REAL_API: `${API}/users`,
  POST_REAL_API: `${API}/admin`,
};
// 관리자계정 약사인증관리 (Certify) -> admin_certify.json
export const API_Certify = {
  GET_REAL_API: `${API}/admin`,
  POST_SUCCESS_REAL_API: `${API}/admin/access/success`,
  POST_DENIED_REAL_API: `${API}/admin/access/failure`,
};
// 관리자계정 신고리뷰관리 (Reports) -> admin_reports.json
export const API_Reports = {
  GET_REAL_API: `${API}/admin/reports`,
  DELETE_REAL_API: `${API}/admin/reports`,
  POST_REAL_API: `${API}/admin/reports`,
};
