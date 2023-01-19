import { isAuthReq } from "./Apis";

export const isAuth = async () => {
  const clintToken = localStorage.length && JSON.parse(localStorage.getItem("user-info")).token;
  if (clintToken === 0) return null;
  const [response, resStatus] = await isAuthReq(clintToken);
  if (resStatus === 403) {
    localStorage.clear();
    return 403;
  }
  if (resStatus === 401) {
    localStorage.clear();
    return null;
  }
  return response;
};