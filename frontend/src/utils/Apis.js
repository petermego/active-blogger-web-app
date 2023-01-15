export const SignUpReq = async (fname, lname, username, email, password) => {
  const body = { fname, lname, username, email, password };
  return await fetch("http://localhost:5000/sign-up", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
};
