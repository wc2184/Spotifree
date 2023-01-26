import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DontHaveAccButton = () => {
  return (
    <>
      <Box
        sx={{
          fontFamily: "Circular",
          fontWeight: 900,
          fontSize: "19px",
          textAlign: "center",
          marginTop: "15px",
        }}
        w={["90vw", "70vw", "50vw", "40vw", "27vw"]}
      >
        Don't have an account?
      </Box>
      <Button
        as={Link}
        w={["90vw", "70vw", "50vw", "40vw", "27vw"]}
        sx={{
          fontFamily: "Circular",
          color: "gray",
          borderRadius: 500,
          backgroundColor: "white",
          border: "1px solid gray",
          height: "56px",
          marginTop: "17px",
        }}
        to="/signup"
      >
        SIGN UP FOR SPOTIFY
      </Button>
    </>
  );
};
export default DontHaveAccButton;
