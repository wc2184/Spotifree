// import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useWindowSize } from "@react-hook/window-size";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Lorem from "./components/Home/Lorem";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotifyLogo from "./SpotifyLogo";
import { logout } from "./store/session";

function App() {
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [width] = useWindowSize();

  useEffect(() => {
    document.title = "Spotifree 🎵";
  }, []);
  let routes = (
    <Switch>
      <Route path="/login">
        {!currentUser ? <LoginFormPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/signup">
        {!currentUser ? <SignupFormPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/">
        <Home />
        {width <= 610 && (
          <div className="notloggedin">
            <div id="smallDevice"></div>
            <Modal closeOnOverlayClick isOpen>
              <ModalOverlay />
              <ModalContent
                sx={{
                  height: "95vh",
                  display: "relative",
                  top: -10,
                  // minWidth: width < 900 ? `${width * 0.75}px` : "900px",
                  width: "85vw",

                  borderRadius: "18px",
                }}
              >
                <ModalBody
                  sx={{
                    height: "1000px",
                    backgroundImage:
                      "linear-gradient(rgb(65, 29, 29), rgb(52, 35, 35), rgb(40, 40, 40))",
                    borderRadius: "15px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      // backgroundColor: "green",
                      // backgroundImage: "linear-gradient(green, gray, black)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {width < 610 && (
                        <Image
                          sx={{
                            flex: "1",
                            maxWidth: "200px",
                            maxHeight: "200px",
                            borderRadius: "15px",
                          }}
                          src="https://res.cloudinary.com/dkg7lxnj2/image/upload/v1675209363/i-m-sorry-vector-illustration-advertising-background-banner-business-concept-design-element-here-i-m-sorry-icon-illustration-label-135531451_z4ft3z.png"
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDir: "column",
                      }}
                    >
                      <Text
                        fontSize={width < 460 ? "1.5rem" : "2rem"}
                        fontWeight={700}
                        letterSpacing="-1.75px"
                        color="white"
                        sx={{
                          flex: "1",
                          width: "70vw",
                          textAlign: "center",
                          marginBottom: "30px",
                          marginTop: "-10vh",
                        }}
                      >
                        {" "}
                        This website doesn't work on phones. <br />
                        <br /> Safari's and Chrome for iOS webkit version breaks
                        most functionality in the APIs used for this web app due
                        to security concerns. We apologize that this site is not
                        available in mobile. <br />- William Chan <br /> <br />
                        <Box
                          as="a"
                          style={{
                            textDecoration: "underline",
                            color: "lightblue",
                          }}
                          href="https://github.com/wc2184"
                          _hover={{ color: "teal !important" }}
                        >
                          Return to my github
                        </Box>
                      </Text>
                    </Box>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        )}
      </Route>
    </Switch>
  );

  return (
    <div className="outermostwrapper" style={{ height: "100%" }}>
      {location.pathname != "/login" && location.pathname != "/signup" ? (
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgb(18, 18, 18)",
            zIndex: "-100",
          }}
        ></div>
      ) : null}
      {routes}
    </div>
  );
}

export default App;
