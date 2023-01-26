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
import SignUpButton from "./SignUpButton";
import { useWindowSize } from "@react-hook/window-size";
import { WarningIcon } from "@chakra-ui/icons";
import DemoUserSignUpButton from "./DemoUserSignUpButton";

const SignupFormPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
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
    return dispatch(signup({ email, username, password }))
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "dataaa");
        setServerErrors(data.errors);
      });
  };
  console.log(width, "this is width");
  useEffect(() => {
    let errors = [];
    if (password !== currentPassword) {
      errors.push("passwords don't match");
    }
    if (username === "") {
      errors.push("username is blank");
    }
    if (password === "") {
      errors.push("password is blank");
    }
    if (currentPassword === "") {
      errors.push("currentPassword is blank");
    }
    if (email === "") {
      errors.push("email is blank");
    }
    setErrors(errors);
  }, [password, currentPassword, username, email]);

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
      <div className="topcontainer">
        {/* {submitted && errors.map((err, i) => <div key={i}>{err}</div>)} */}
        {/* <Link to="/">Go back b</Link> */}
        <SpotifyLogo size={155} />
        <Divider
          sx={{ position: "absolute", top: "93px" }}
          mt="0px"
          mb="15px"
        />

        <Box as="h2" style={{ marginBottom: "25px" }} className="testt">
          Sign up for free to
          {width < 480 ? <br /> : null} start listening.
        </Box>
        <FacebookButton />
        <GoogleButton />
        <HrOrComponent />
      </div>
      <Box sx={{ padding: "0 20px 20px 20px" }} maxW="410px">
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
          Sign up with your email address
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
            text="Create a username"
            errors={errors}
          />
          <MyInput
            name="email"
            email={email}
            setState={setEmail}
            handleSubmit={handleSubmit}
            text="What's your email?"
            errors={errors}
          />
          <MyInput
            name="password"
            email={password}
            setState={setPassword}
            handleSubmit={handleSubmit}
            text="Create a password"
            errors={errors}
          />
          <MyInput
            name="currentPassword"
            email={currentPassword}
            setState={setCurrentPassword}
            handleSubmit={handleSubmit}
            text="Confirm your password"
            errors={errors}
          />
          {submitted &&
            serverErrors &&
            serverErrors.map((err, i) => (
              <div style={{ color: "red", marginBottom: "10px" }} key={i}>
                <WarningIcon
                  style={{ marginBottom: "3px", marginRight: "1px" }}
                />{" "}
                {err}
              </div>
            ))}
          <br />

          <div
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
          </div>
          <SignUpButton onClick={handleSubmit} />
          <DemoUserSignUpButton style={{ marginTop: "15px" }} />
        </FormControl>

        <div
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
        </div>
      </Box>
    </div>
  );
};

export default SignupFormPage;
