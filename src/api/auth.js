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
