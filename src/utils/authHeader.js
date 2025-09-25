// utils/authHeader.js
const authHeader = () => {
  const token = localStorage.getItem("token");
  // console.log(localStorage.getItem("token"));
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default authHeader;