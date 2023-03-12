import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = `Active | Home`;
  }, []);

  return (
    <div className="feed">
      
    </div>
  );
};

export default Home;