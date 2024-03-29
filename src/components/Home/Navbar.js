import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { useScrollYPosition } from "react-use-scroll-position";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useMemo } from "react";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import AboutMe from "./AboutMe";
import "./Navbar.css";

const Navbar = ({
  sidebarwidth,
  submitted,
  setSubmitted,
  colors,
  hashCode,
}) => {
  const y = useScrollYPosition();
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentList = useSelector((state) => state.playlist.currentList);
  //

  //
  // around 185, transparaent

  // 85 start opacity

  // if y > 85
  //
  //* MUST BE 85
  // let opacityNav = y >= 85 ? 60 + (y - 85) * 0.35 : 50;
  let opacityNav = y >= 85 ? 30 + (y - 85) * 0.35 : 0;
  //* for every 10 difference, increase opacity by 5
  opacityNav = y >= 288 ? 100 : opacityNav;

  const location = useLocation();
  // color hex to rgb parser
  function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")
        // + ",1)"
      );
    }
    throw new Error("Bad Hex");
  }

  return (
    <Box className="navbar">
      <div
        style={{
          minWidth: `calc(100vw - ${sidebarwidth}px)`, //THISI S THE CRUX, the issue was that 100% is not the entire screen
          // minWidth: `100%`,
          marginLeft: sidebarwidth + "px",
          // backgroundColor: `rgb(9, 9, 9, ${opacityNav / 100}`,
          backgroundColor: currentList
            ? `${hexToRgbA(
                colors[Math.abs(hashCode(currentList.uniqID) % colors.length)]
              )}, ${opacityNav / 100})`
            : `rgb(9, 9, 9, ${opacityNav / 100}`,
          // opacity: `${opacityNav}%`,
          backgroundImage: y >= 85 ? "linear-gradient(rgb(0 0 0/35%) 0 0)" : "", //lightens it a little so the playlist name doesnt have to reduce in color
          height: "64px",
          zIndex: "-1",
          display: "flex",
          // backgroundColor:
          //   colors[Math.abs(hashCode(currentList.uniqID) % colors.length)],
        }}
      >
        <Flex gap={4} alignItems="center" ml={7}>
          <Box
            sx={{
              borderRadius: "34px",
              width: "34px",
              height: "34px",
              backgroundColor: "black",
              paddingTop: "5px",
              paddingLeft: "3px",
            }}
            _hover={{ cursor: "pointer" }}
            _active={{ transform: "scale(1.05)" }}
            onClick={() => {
              history.go(-1);
            }}
          >
            <AiOutlineLeft color="white" fontSize={25} />
          </Box>
          <Box
            sx={{
              borderRadius: "34px",
              width: "34px",
              height: "34px",
              backgroundColor: "black",
              paddingTop: "5px",
              paddingLeft: "6px",
            }}
            _hover={{ cursor: "pointer" }}
            _active={{ transform: "scale(1.05)" }}
            onClick={() => {
              history.go(1);
            }}
          >
            <AiOutlineRight color="white" fontSize={25} />
          </Box>
        </Flex>
        {location.pathname === "/search" ? (
          <Search submitted={submitted} setSubmitted={setSubmitted} />
        ) : null}
        {/* <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div> */}
        {location.pathname.includes("/playlist") && y > 288 ? (
          <Text
            ml={4}
            mt="3px"
            fontWeight={700}
            fontSize="1.45rem"
            letterSpacing={-1}
            alignSelf="center"
            className="fadeIn"
            color="white"
          >
            {currentList && currentList.name}
          </Text>
        ) : null}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            // backgroundColor: "green",
            zIndex: "10",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          ml="auto"
        >
          {/* User placeholder */}
          <Box
            sx={{
              width: "245px",
              height: "35px",
              // backgroundColor: "red",
              marginRight: "75px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* profile menu */}
            <Menu autoSelect={false}>
              <MenuButton
                leftIcon={<FaUserAlt color="white" />}
                as={Button}
                backgroundColor="rgb(40,40,40)"
                borderRadius={30}
                height="34px"
                color="white"
                onClick={onOpen}
                _active={{
                  backgroundColor: "none",
                  transform: "scale(0.96)",
                }}
                _hover={{
                  backgroundColor: "none",
                  // transform: "scale(1.03)",
                }}
              >
                {currentUser ? currentUser.username : "Who made this?"}
              </MenuButton>
            </Menu>
          </Box>
        </Box>
      </div>
      <AboutMe isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
export default Navbar;
