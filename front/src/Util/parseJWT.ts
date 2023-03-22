//JWT 디코딩해서 로그인할때 서버에서 준 data(userIdx,userType) 확인
export const parseJwt = (token: string | null) => {
  if (token) return JSON.parse(window.atob(token.split(".")[1]));
};
