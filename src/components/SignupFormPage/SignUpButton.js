import { Button } from "@chakra-ui/react";

const SignUpButton = ({ onClick, style }) => {
  return (
    <>
      <div style={{ ...style, textAlign: "center" }}>
        <Button
          onClick={onClick}
          sx={{
            borderRadius: "500px",
            height: "56px",
            width: "144px",
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
          Sign Up
        </Button>
      </div>
    </>
  );
};
export default SignUpButton;
