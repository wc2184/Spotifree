import { Box, Button, Checkbox, Text } from "@chakra-ui/react";
import { useWindowSize } from "@react-hook/window-size";

const SignInButton = ({ onClick }) => {
  const [width] = useWindowSize();
  return (
    <>
      <Text fontWeight={600} fontSize="15.5" mt="-5px" mb="10px">
        Forgot your password?
      </Text>
      <Box
        mt={5}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: width <= 479 ? "column" : "row",
        }}
      >
        <div>
          <div>
            <Checkbox
              colorScheme={"green"}
              isInvalid={false}
              mr="auto"
              defaultChecked
            >
              <Text fontSize={14} fontFamily="Circular">
                Remember me
              </Text>
            </Checkbox>
          </div>
        </div>
        <Button
          onClick={onClick}
          mt={width <= 479 ? "5px" : "0"}
          sx={{
            borderRadius: "500px",
            height: "56px",
            width: width <= 479 ? "100%" : "144px",
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
          Log In
        </Button>
      </Box>
    </>
  );
};
export default SignInButton;
