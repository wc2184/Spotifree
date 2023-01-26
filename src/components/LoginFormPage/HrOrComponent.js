import { Box } from "@chakra-ui/react";

const HrOrComponent = () => {
  return (
    <>
      <Box
        as="div"
        style={{ display: "flex", width: "65%", alignItems: "center" }}
      >
        <hr
          style={{ border: "1px solid black", flex: "40%", opacity: "0.1" }}
        ></hr>
        <div
          style={{
            margin: "0px 15px 0px 15px",
            color: "gray",
            fontSize: "18px",
            fontFamily: "Circular",
          }}
        >
          or
        </div>
        {/* <Divider
          opacity="2"
          sx={{ backgroundColor: "black", flex: "40%" }}
          w="100px"
        ></Divider> */}
        <hr
          style={{ border: "1px solid black", flex: "40%", opacity: "0.1" }}
        ></hr>
      </Box>
    </>
  );
};
export default HrOrComponent;
