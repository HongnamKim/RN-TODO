const USER_EMAIL = "my@email.com";
const USER_PASSWORD = "1234";

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === USER_EMAIL && password === USER_PASSWORD) {
        resolve(email);
      } else if (email !== USER_EMAIL) {
        reject("존재하지 않는 계정입니다.");
      } else if (password !== USER_PASSWORD) {
        reject("비밀번호를 확인해주세요.");
      }
    }, 1000);
  });
};

export const signUp = (email, password, checkPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === checkPassword) {
        resolve("회원가입 되었습니다.");
      } else {
        reject("입력한 두 비밀번호가 다릅니다.");
      }
    }, 1000);
  });
};
