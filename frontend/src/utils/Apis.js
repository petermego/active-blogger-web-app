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
