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
        {!currentUser ? (
          <Home />
        ) : (
          <div className="notloggedin">
            <Modal closeOnOverlayClick isOpen>
              <ModalOverlay />
              <ModalContent
                sx={{
                  height: "50vh",

                  minWidth: width < 900 ? `${width * 0.75}px` : "900px",

                  marginTop: "20vh",
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
                      gap: "65px",
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
                      {width < 900 ? null : (
                        <Image
                          sx={{
                            flex: "1",
                            maxWidth: "300px",
                            maxHeight: "300px",
                            borderRadius: "15px",
                          }}
                          src="https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14"
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
                        fontSize="4xl"
                        fontWeight={700}
                        letterSpacing="-1.75px"
                        color="white"
                        sx={{
                          flex: "1",
                          width: "340px",
                          textAlign: "center",
                          marginBottom: "30px",
                        }}
                      >
                        Start listening with a free Spotifree account
                      </Text>
                      <Button
                        sx={{
                          borderRadius: "20px",
                          height: "45px",
                          width: "150px",
                          fontSize: "16px",
                          backgroundColor: "rgb(30, 215, 96)",
                          marginBottom: "20px",
                        }}
                        _hover={{
                          backgroundColor: "none",
                          transform: "scale(1.05)",
                        }}
                        onClick={() => {
                          history.push("/signup");
                        }}
                      >
                        SIGN UP FREE
                      </Button>
                      <Button
                        sx={{
                          borderRadius: "20px",
                          height: "45px",
                          fontSize: "16px",
                        }}
                        color="white"
                        variant="outline"
                        _hover={{
                          backgroundColor: "none",
                          transform: "scale(1.05)",
                        }}
                        onClick={() => {
                          history.push("/login");
                        }}
                      >
                        LOG IN
                      </Button>
                    </Box>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Home />
          </div>
        )}
      </Route>
    </Switch>
  );
  console.log(
    location.pathname,
    "pathname",
    location.pathname != "/login" || location.pathname != "/signup"
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
