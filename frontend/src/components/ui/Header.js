const Header = (props) => {

  const spanStyle = {
    letterSpacing: 1.5,
  };

  return (
    <header className="flex pt-3 pl-10 pr-10 z-40 #16a34a bg-blue text-5xl text-neutral font-serif w-100% h-10vh justify-center content-center">
      <span style={spanStyle}>Active</span>
    </header>
  );
}
 
export default Header;