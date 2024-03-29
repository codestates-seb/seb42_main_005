//! API
export const API = import.meta.env.VITE_APP_API_URL;

export const APIS = {
  POST_USER_SIGNUP_JWT: `${API}/api/users/normal`,
  POST_PHARM_SIGNUP_JWT: `${API}/api/users/store`,
  POST_USER_SIGNUP_AUTH: "",
  POST_PHARM_SIGNUP_AUTH: "",
  POST_LOGIN_JWT: `${API}/login`,
  POST_LOGIN_AUTH: `${API}/api/auth`,
  POST_REISSUE_REFRESH_TOKEN: "",
  POST_LOGOUT: `${API}/api/auth/logout`,
  PATCH_FINDPW: "/api/users/password",
  DELETE_SIGNOUT: `${API}/api/users`, //! 여기 확인 필요
  GET_PHARMLIST: `${API}/api/store`,
  GET_PHARMDETAILS: `/api/store`,
  GET_REVIEWS: `/api/store`,
  POST_REVIEWS: `/api/store`,
  PATCH_REVIEWS: `/api/store`,
  DELETE_REVIEWS: `/api/store`,
  POST_REPORT_REVIEW: `/api/store`,
  POST_REPLY: `/api/review`,
  PATCH_REPLY: `/api/review`,
  DELETE_REPLY: `/api/review`,
  GET_USER_INFO: `/api/users`,
  POST_USER_IMG: `/api/users/image`,
  POST_PHARM_IMG: `/api/store/image`,
  PATCH_USER_INFO: `/api/users`,
  GET_MYREVIEWS: `/api/review/users`,
  GET_MY_LIKES: `/api/store/users`,
  POST_LIKE: `/api/store`,
  GET_ADMIN_CERTS: `/api/users/store`,
  POST_ADMIN_CERTIFY: `/api/admin/access/success`,
  POST_ADMIN_DENY: `/api/admin/access/failure`,
  GET_ADMIN_REPORTED: `/api/admin/reports`,
  DELETE_ADMIN_REVIEW_DELETE: `/api/admin/reports`,
  POST_ADMIN_REVIEW_RESTORE: `/api/admin/reports`,
  GET_ADMIN_USERS: `/api/users`,
  POST_ADMIN_FIRE: `/api/admin/fired`,
  POST_ADMIN_BLOCK: `/api/admin/block`,
  POST_ADMIN_RESTORE: `/api/admin/restore`,
  GET_Search: `${API}/api/store/search?keyword=`,
};
