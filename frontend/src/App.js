import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./components/ui/Header";
import SignUp from "./components/pages/Sign-up";
import NotFound from "./components/pages/NotFound";
import SignIn from "./components/pages/Sign-in";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "./utils/isAuth";
import { login } from "./features/user-slice";

const App = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const authHandler = async() => {
      const response = await isAuth();
      if (response === null) return;
      if (response === 403)return navigate("/sign-in");
      dispatch(login(response));
    }
    try {
      authHandler();
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <main className="flex w-100% bg-dark h-90vh min-h-90vh">
        <Routes>
          <Route path="/">
            { useEffect(() => user ? navigate('/home') : navigate('/sign-in'), [user, navigate]) }
          </Route>
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          { user && <Route path="/home" exact element={<p>Home</p>} /> }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
