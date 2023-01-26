import { Box, Button } from "@chakra-ui/react";

const GoogleButton = () => {
  return (
    <>
      <Button
        w={["60vw", "45vw", "30vw", "23vw"]}
        h="48px"
        mb="15px"
        sx={{
          backgroundColor: "white",
          border: "2px solid black",
          borderRadius: "500px",
          color: "#535353",
          fontFamily: "Circular",
          fontWeight: "700",
          fontSize: 18,
          letterSpacing: "-1px",
          transition: "all 0.01s ease-out",
        }}
        _hover={{
          transform: "scale(1.05)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.6 12.2272C21.6 11.5181 21.5364 10.8363 21.4182 10.1818H12V14.0499H17.3818C17.15 15.2999 16.4455 16.359 15.3864 17.0681V19.5772H18.6182C20.5091 17.8363 21.6 15.2727 21.6 12.2272Z"
            fill="#4285F4"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 21.9999C14.7 21.9999 16.9636 21.1044 18.6181 19.5772L15.3863 17.0681C14.4909 17.6681 13.3454 18.0226 12 18.0226C9.39542 18.0226 7.19087 16.2635 6.40451 13.8999H3.0636V16.4908C4.70905 19.759 8.09087 21.9999 12 21.9999Z"
            fill="#34A853"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.40455 13.9001C6.20455 13.3001 6.09091 12.6592 6.09091 12.0001C6.09091 11.341 6.20455 10.7001 6.40455 10.1001V7.50916H3.06364C2.38636 8.85916 2 10.3864 2 12.0001C2 13.6137 2.38636 15.141 3.06364 16.491L6.40455 13.9001Z"
            fill="#FBBC05"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 5.97727C13.4681 5.97727 14.7863 6.48182 15.8227 7.47273L18.6909 4.60455C16.9591 2.99091 14.6954 2 12 2C8.09087 2 4.70905 4.24091 3.0636 7.50909L6.40451 10.1C7.19087 7.73636 9.39542 5.97727 12 5.97727Z"
            fill="#EA4335"
          ></path>
        </svg>
        {/* fb emoji */}
        <Box as="span" ml="10px">
          Log in with Google
        </Box>
      </Button>
    </>
  );
};
export default GoogleButton;
