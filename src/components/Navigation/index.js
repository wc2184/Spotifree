import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import SpotifyLogo from "../../SpotifyLogo";
import { logout } from "../../store/session";
import "./Navigation.css";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session);
  currentUser.user &&
    console.log(currentUser.user.username, "curr user in navigation");
  const muhStyles = {
    display: "flex",
    children: {
      listStyle: "none",
      display: "flex",
      gap: "15px",
    },
  };
  return (
    <div style={muhStyles}>
      <ul style={muhStyles.children}>
        {/* <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li> */}
        {!currentUser.user ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </button>

            <ProfileButton />
          </>
        )}
      </ul>
    </div>
  );
};
export default Navigation;
