import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./components/ui/Header";
import SignUp from "./components/pages/Sign-up";
import NotFound from "./components/pages/NotFound";
import SignIn from "./components/pages/Sign-in";
import { useSelector } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  
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
          <Route path="/home" exact element={<p>Home</p>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
