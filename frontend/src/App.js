/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./components/ui/Header";
import SignUp from "./components/pages/Sign-up";
import NotFound from "./components/pages/NotFound";
import SignIn from "./components/pages/Sign-in";
import { useSelector } from "react-redux";
import Home from "./components/pages/Home";

const initialState = {
  error: false,
  message: "ERROR",
  current: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_CURRENT":
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const [state, dispatch] = useReducer(reducer, initialState);

  const setError = (error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setMessage = (message) => {
    dispatch({ type: "SET_MESSAGE", payload: message });
  };

  const setCurrent = (current) => {
    dispatch({ type: "SET_CURRENT", payload: current });
  };

  return (
    <Fragment>
      <Header
        msgState={state}
        setError={setError}
        setMessage={setMessage}
        setCurrent={setCurrent}
      />
      <main className="flex w-100% bg-black h-90vh min-h-90vh">
        <Routes>
          <Route path="/" exact>
            {useEffect(
              () => (user ? navigate("/home") : navigate("/sign-in")),
              []
            )}
          </Route>
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route
            path="/home"
            exact
            element={<Home />}
            msgState={state}
            setError={setError}
            setMessage={setMessage}
            setCurrent={setCurrent}
          >
            {useEffect(
              () => (user ? navigate("/home") : navigate("/sign-in")),
              []
            )}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
