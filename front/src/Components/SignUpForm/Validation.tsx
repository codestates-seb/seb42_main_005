//! 이메일 형식으로, 5글자이상
function emailValidation(email: string) {
  const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (email.length >= 5) {
    if (reg.test(email) == false) {
      return true;
    }
  }
  return false;
}

//! 비밀번호는 문자 숫자 특수문자 조합 8자 이상
function passwordValidation(password: string) {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (reg.test(password) == false) {
    return true;
  }
  return false;
}

//! 닉네임은 공백없이
function nameValidation(nickname: string) {
  const reg = /\s/g;
  if (reg.test(nickname)) {
    return true;
  }
  return false;
}

const Validate = {
  emailValidation,
  passwordValidation,
  nameValidation,
};
export { Validate };
