const TOKEN_KEY = "jwt";
const setToken = (token) => {
  console.log("set key");
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => localStorage.getItem(TOKEN_KEY);
const removeToken = () => {
  console.log("removing key");
  localStorage.removeItem(TOKEN_KEY);
};

export { setToken, getToken, removeToken };
