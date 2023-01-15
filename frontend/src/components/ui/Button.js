import { Link } from 'react-router-dom';
import './Button.css'

const Button = (props) => {
  
  switch (props.type) {
    case "btn": return <button>{props.children}</button>;
    case "input": return <input type="submit" value={props.children} />;
    case "link": return <Link to={props.path}>{props.children}</Link>
    default: return;
  }
}

export default Button;