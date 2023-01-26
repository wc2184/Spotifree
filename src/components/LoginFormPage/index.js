import {
  Box,
  Button,
  Divider,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import SpotifyLogo from "../../SpotifyLogo";
import { login, signup } from "../../store/session";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import HrOrComponent from "./HrOrComponent";
import MyInput from "./MyInput";
import "./SignupFormPage.css";
import SignInButton from "./SignInButton";
import { useWindowSize } from "@react-hook/window-size";
import DemoSignInButton from "./DemoSignInButton";
import DontHaveAccButton from "./DontHaveAccButton";

const LoginFormPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [width] = useWindowSize();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
    setSubmitted(true);
    console.log("in form. credential", username);
    if (username === "" || password === "" || errors.length > 0) {
      console.log("yoo");
      return;
    }
    return dispatch(login({ credential: username, password: password }))
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "dataaa");
        setServerErrors(data.errors);
      });
  };
  console.log(width, "this is width");
  useEffect(() => {
    let errors = [];

    if (username === "") {
      errors.push("username is blank");
    }
    if (password === "") {
      errors.push("password is blank");
    }

    setErrors(errors);
  }, [password, username]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10px",
        backgroundColor: "white",
      }}
    >
      <div className="topcontainersignin">
        {/* {submitted && errors.map((err, i) => <div key={i}>{err}</div>)} */}
        {/* <Link to="/">Go back b</Link> */}
        <SpotifyLogo size={155} style={{ paddingBottom: "0px" }} />
        <Divider
          sx={{ position: "absolute", top: "93px" }}
          mt="0px"
          mb="15px"
        />
        <Box
          as="p"
          style={{
            marginBottom: "20px",
            fontSize: "30px",
            fontWeight: "700",
            letterSpacing: "-1.2px",
          }}
          className="testt2"
        >
          To continue, {width < 480 ? <br /> : null} log in to Spotify.
        </Box>
        <FacebookButton />
        <GoogleButton />
        <HrOrComponent />
      </div>
      <Box
        sx={{ padding: "0 20px 20px 20px" }}
        w={["90vw", "70vw", "50vw", "40vw", "27vw"]}
        // media query chakra
      >
        <p
          style={{
            fontFamily: "Circular",
            fontWeight: "900",
            fontSize: "18px",
            marginTop: "16px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Log in with your email address
        </p>
        <FormControl
          onSubmit={handleSubmit}
          isInvalid={submitted && errors.length > 0}
        >
          <MyInput
            name="username"
            email={username}
            setState={setUsername}
            handleSubmit={handleSubmit}
            text="Username"
            errors={errors}
          />

          <MyInput
            name="password"
            email={password}
            setState={setPassword}
            handleSubmit={handleSubmit}
            text="Password"
            errors={errors}
          />

          {submitted &&
            serverErrors &&
            serverErrors.map((err, i) => (
              <div style={{ color: "red", marginBottom: "10px" }} key={i}>
                {err}
              </div>
            ))}

          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-15px",
              marginBottom: "17px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontFamily: "Circular",
                letterSpacing: 0.01,
                fontWeight: "400",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              By clicking on sign-up, you agree to start enjoying good music! To
              learn more about the creator of this site,{" "}
              <ChakraLink
                as={Link}
                sx={{ textDecoration: "underline" }}
                color="rgb(29, 185, 84)"
                to="/"
              >
                visit my github.
              </ChakraLink>
            </span>
          </div> */}
          <SignInButton onClick={handleSubmit} />
        </FormControl>
        <DemoSignInButton />
        {/* <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Have an account?{" "}
          <ChakraLink
            as={Link}
            sx={{ textDecoration: "underline" }}
            color="rgb(29, 185, 84)"
            to="/login"
          >
            Log in
          </ChakraLink>
          .
        </div> */}
      </Box>
      <Divider
        sx={{ border: "2px solid black", marginBottom: "10px" }}
        w={["86vw", "66vw", "46vw", "36vw", "23vw"]}
      ></Divider>
      <DontHaveAccButton />
    </div>
  );
};

export default LoginFormPage;
