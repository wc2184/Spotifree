import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  const currentUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const styles = {
    position: "relative",
    top: 0,
  };
  let dd = document.querySelector(".dropdown");
  useEffect(() => {
    function click(e) {
      console.log(e.target);
      if (!Array.from(e.target.classList).includes("dropdown")) {
        console.log("click");
        setShowMenu(false);
      }
    }
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("click", click);
    };
  }, []);
  return (
    <div>
      <div
        className="dropdown"
        onClick={() => {
          setShowMenu((p) => !p);
        }}
        style={{ cursor: "pointer" }}
      >
        <i
          style={{
            fontSize: "40px",
            color: showMenu ? "green" : "darkseagreen",
          }}
          className="fa-sharp fa-solid fa-user dropdown"
        ></i>
      </div>
      {showMenu && (
        <div
          className="dropdown dropdowncontainer"
          style={{ position: "relative" }}
        >
          {" "}
          {/*Dropdown container*/}
          <div
            className="dropdown"
            style={{
              position: "absolute",
              left: -60,
              top: 10,
              width: "30vw",
              overflowWrap: "break-word",
            }}
          >
            <div
              className="dropdown"
              style={{
                border: "1px solid black",
                padding: 10,
                marginTop: "5px",
                userSelect: "none",
              }}
            >
              {Object.entries(currentUser).map((ele, i) => {
                return (
                  <div
                    className="dropdown"
                    key={i}
                    style={{ marginBottom: 10 }}
                  >
                    {ele[0]} : {ele[1]}
                  </div>
                );
              })}
            </div>
          </div>{" "}
          {/*actual Dropdown content*/}
        </div>
      )}
      {/* <div>Hi</div> */}
    </div>
  );
};
export default ProfileButton;
