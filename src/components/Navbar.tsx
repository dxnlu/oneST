import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand mb-0 h1">OneST</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/oneST/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/oneST/uen-validator/">
              UEN Validator
            </NavLink>
            <NavLink className="nav-link" to="/oneST/weather-forecast/">
              Weather Forecast
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
