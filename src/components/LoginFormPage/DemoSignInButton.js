import { Button, Tooltip } from "@chakra-ui/react";
import { useWindowSize } from "@react-hook/window-size";
import { useDispatch } from "react-redux";
import { login, signup } from "../../store/session";

const DemoSignInButton = ({ styles }) => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();

  return (
    <>
      <div style={{ ...styles, textAlign: "right", marginTop: "10px" }}>
        <Tooltip
          label="Don't have time? Click here to instantly log in!"
          placement="right"
          isOpen
          hasArrow
          sx={{
            width: "500px",
            height: "75px",
            fontSize: "20px",
            display: "flex",
            textAlign: "center",
            paddingTop: "6px",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgb(0, 0, 0, .5)",
          }}
          // size={20}
          gutter={20}
        >
          <Button
            onClick={() => {
              console.log("demo ");
              let rand = Math.random().toString(36).substring(2, 12);
              dispatch(
                login({
                  credential: "RecruiterDemo",
                  password: "password",
                })
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log(data, "dataaa");
                });
            }}
            sx={{
              borderRadius: "500px",
              height: "56px",
              width: width <= 479 ? "100%" : "194px",
              fontFamily: "Circular",
              fontWeight: "900",
              fontSize: "17px",
              backgroundColor: "#1ed760",
            }}
            _hover={{
              transform: "scale(1.05)",
              backgroundColor: "#1ed760",
              filter: "brightness(0.95)",
            }}
            _active={{
              filter: "brightness(0.75)",
            }}
          >
            Demo User Sign In
          </Button>
        </Tooltip>
      </div>
    </>
  );
};
export default DemoSignInButton;
