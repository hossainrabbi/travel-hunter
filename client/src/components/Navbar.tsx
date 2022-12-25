import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isAuth, logout } = useAuth();

  return (
    <div className="bg-white shadow-sm">
      <div className="wrapper navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </div>
          <Link className="text-2xl font-semibold" to="/">
            <span className="text-primary">T</span>velia
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuth ? (
            <button className="btn bg-gray-200 btn-ghost" onClick={logout}>
              Signout
            </button>
          ) : (
            <>
              <NavLink className="btn bg-gray-200 btn-ghost mr-3" to="/signin">
                Sign In
              </NavLink>
              <NavLink className="btn" to="/signup">
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
