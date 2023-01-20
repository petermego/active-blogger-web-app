import { Link } from "react-router-dom";

const Header = (props) => {

  const spanStyle = {
    padding: '.2rem',
    letterSpacing: 1.5,
    backgroundColor: "rgb(245,197,24)",
  };

  return (
    <header className="flex pl-10 pr-10 z-40 bg-blackHeader text-5xl text-black font-serif w-100% h-10vh justify-center items-center">
      <span style={spanStyle}>
        <Link to={"/home"}>ACTIVE</Link>
      </span>
    </header>
  );
}
 
export default Header;