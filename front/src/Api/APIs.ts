//! API
export const API = "http://ec2-54-180-29-60.ap-northeast-2.compute.amazonaws.com:8080";

export const APIS = {
  POST_USER_SIGNUP_JWT: `${API}/api/users/normal`,
  POST_PHARM_SIGNUP_JWT: `${API}/api/users/store`,
  POST_USER_SIGNUP_AUTH: "",
  POST_PHARM_SIGNUP_AUTH: "",
  POST_LOGIN_JWT: `${API}/login`,
  POST_LOGIN_AUTH: `${API}/api/auth`,
  POST_REISSUE_REFRESH_TOKEN: "",
  POST_LOGOUT: `${API}/api/auth/logout`,
  PATCH_FINDPW: "",
  DELETE_SIGNOUT: `${API}/api/users`,
  GET_PHARMLIST: `${API}/api/store`,
  GET_PHARMDETAILS: `${API}/api/store`,
  GET_REVIEWS: `${API}/api/store`,
  POST_REVIEWS: `${API}/api/store`,
  PATCH_REVIEWS: `${API}/api/store`,
  DELETE_REVIEWS: `${API}/api/store`,
  POST_REPORT_REVIEW: `${API}/api/store`,
  POST_REPLY: `${API}/api/review`,
  PATCH_REPLY: `${API}/api/review`,
  DELETE_REPLY: `${API}/api/review`,
  GET_USER_INFO: `${API}/api/users`,
  PATCH_USER_IMG: `${API}/api/users/image`,
  PATCH_USER_INFO: `${API}/api/users`,
  GET_MYREVIEWS: `${API}/api/review/user`,
  GET_MY_LIKES: `${API}/api/store/user`,
  POST_LIKE: `${API}/api/store`,
  GET_ADMIN_CERTS: `${API}/api/users/store`,
  POST_ADMIN_CERTIFY: `${API}/api/admin/access/success`,
  POST_ADMIN_DENY: `${API}/api/admin/access/failure`,
  GET_ADMIN_REPORTED: `${API}/api/admin/reports`,
  DELETE_ADMIN_REVIEW_DELETE: `${API}/api/admin/reports`,
  POST_ADMIN_REVIEW_RESTORE: `${API}/api/admin/reports`,
  GET_ADMIN_USERS: `${API}/api/users`,
  POST_ADMIN_FIRE: `${API}/api/admin/fired`,
  POST_ADMIN_BLOCK: `${API}/api/admin/block`,
  POST_ADMIN_RESTORE: `${API}/api/admin/restore`,
  GET_Search: `${API}/api/store/search?keyword=`,
};
