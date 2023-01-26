import { Tooltip } from "@chakra-ui/react";

const MyTooltip = ({ children, text }) => {
  return (
    <>
      <Tooltip sx={{ boxShadow: "1px 1px gray" }} gutter={18} label={text}>
        {children}
      </Tooltip>
    </>
  );
};
export default MyTooltip;
