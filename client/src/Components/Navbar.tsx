import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <>
      <span>
      <Link to="/">Home</Link>
      <span>  </span>

      <Link to="/urls">Urls</Link>
      </span>
    </>
  )
};

export default Navbar;

