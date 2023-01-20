import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = `Active | Home`;
  }, []);
};

export default Home;