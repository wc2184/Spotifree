import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const MyTooltip = ({ children, text, gutter = 18, placement = "top" }) => {
  return (
    <>
      <Tooltip
        sx={{ boxShadow: "1px 1px gray" }}
        gutter={gutter}
        label={text}
        placement={placement}
      >
        {children}
      </Tooltip>
    </>
  );
};
export default MyTooltip;
