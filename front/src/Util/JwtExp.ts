import { getLocalStorage } from "../Api/localStorage";
import { parseJwt } from "./parseJWT";

export const ACCESS_EXP_MESSAGE = "Access Token 만료!";
export const REFRESH_EXP_MESSAGE = "Refresh Token 만료!";
const accessToken = getLocalStorage("access_token");
const refreshToken = getLocalStorage("refresh_token");

export const CheckJWTExp = () => {
  const decodedAccess = parseJwt(accessToken);
  const decodedRefresh = parseJwt(refreshToken);

  // console.log(decodedAccess, decodedRefresh);
  //해부된 토큰 확인해서 decodedAccess.exp확인!
  //!
  if (decodedAccess?.exp * 1000 < Date.now()) {
    return ACCESS_EXP_MESSAGE;
  }
  if (decodedRefresh?.exp * 1000 < Date.now()) {
    return REFRESH_EXP_MESSAGE;
  }
  return true;
};

//로컬스토리지에서 토큰가져와서 만료시간지나면 거기서 지워..=> axios 요청날리기전에 인터셉해서
//interceptors.request 서버에 로컬에 있는 토큰을 보내고 => 307번대를 주고 =>
//interceptors.response => 토큰을 갈아껴야..