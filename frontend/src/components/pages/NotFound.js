const NotFound = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    color: 'white',
    fontSize: '2.3rem'
  };

  return <h1 style={style}>Error 404. Page not found</h1>;
}
 
export default NotFound;