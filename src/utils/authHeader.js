// src/utils/authHeader.js

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log(" ddddddddd",token);
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};



// 1. What Bearer Means
// Bearer is a type of authentication scheme.
// It tells the server:
// “I am sending you a token, and whoever holds (‘bears’) this token is authorized.”