import axios from "axios";

export const SignUpReq = async (fname, lname, username, email, password) => {
  const body = { fname, lname, username, email, password };
  return await fetch(process.env.REACT_APP_SIGN_UP, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((data) => data.json());
};

export const SignInReq = async (email, password) => {
  const body = { email, password };
  return await fetch(process.env.REACT_APP_SIGN_IN, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};

export const isAuthReq = async (clientToken) => {
  return await fetch(process.env.REACT_APP_AUTHORIZATION, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + clientToken,
    },
  }).then((res) => [res.json(), res.status]);
};

export const addBlog = async (formData, clientToken) => {
  return await axios.post(process.env.REACT_APP_ADD_BLOG, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${clientToken}`
    }
  }).then((res) => [res.data, res.status])
    .catch(error => console.log(error));
};

export const addExperience = async (formData, clientToken) => {
  return await axios.post(process.env.REACT_APP_ADD_EXPERIENCE, formData, {
    headers: {
      Authorization: `Bearer ${clientToken}`
    }
  }).then((res) => [res.data, res.status])
    .catch(error => console.log(error));
};

export const addUserImg = async (formData, clientToken, id) => {
  return await axios
    .post(`${process.env.REACT_APP_ADD_User_Img}${id}`, formData, {
      headers: {
        Authorization: `Bearer ${clientToken}`,
      }
    })
    .then((res) => [res.data, res.status])
    .catch((error) => console.log(error));
};
