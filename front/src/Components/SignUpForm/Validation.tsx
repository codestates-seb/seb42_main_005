function validateEmail(email: string) {
  const reg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (email.length >= 5) {
    if (reg.test(email) === false) {
      return true;
    }
  }
  return false;
}

function validatePassword(password: string) {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (password.length >= 4) {
    if (reg.test(password) === false) {
      return true;
    }
  }
  return false;
}

//닉네임에 공백에 있다면 에러가 true가 됨
function validateName(nickname: string) {
  const reg = /\s/g;
  if (reg.test(nickname)) {
    return true;
  }
  return false;
}

function validatePasswordCheck(password: string, passwordConfirm: string) {
  if (password.length >= 1 && passwordConfirm.length >= 1) {
    if (password !== passwordConfirm) {
      return true;
    }
  }
  return false;
}

const validators = {
  validateEmail,
  validatePassword,
  validateName,
  validatePasswordCheck,
};
export { validators };
