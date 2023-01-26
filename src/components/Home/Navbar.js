import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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

const Navbar = ({ sidebarwidth, submitted, setSubmitted }) => {
  const y = useScrollYPosition();
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(currentUser);

  // console.log(searchTerm, "this is search term");
  // around 185, transparaent

  // 85 start opacity

  // if y > 85
  // console.log(y, "this y");
  //* MUST BE 85
  // let opacityNav = y >= 85 ? 60 + (y - 85) * 0.35 : 50;
  let opacityNav = y >= 85 ? 30 + (y - 85) * 0.35 : 10;
  //* for every 10 difference, increase opacity by 5
  opacityNav = y >= 288 ? 100 : opacityNav;

  const location = useLocation();
  // console.log(location.pathname, "location");

  return (
    <Box className="navbar">
      <div
        style={{
          minWidth: `calc(100vw - ${sidebarwidth}px)`, //THISI S THE CRUX, the issue was that 100% is not the entire screen
          // minWidth: `100%`,
          marginLeft: sidebarwidth + "px",
          backgroundColor: `rgb(9, 9, 9, ${opacityNav / 100}`,
          // opacity: `${opacityNav}%`,
          height: "64px",
          zIndex: "-1",
          display: "flex",
        }}
      >
        <Flex gap={4} alignItems="center" ml={7}>
          <Box
            sx={{
              borderRadius: "34px",
              width: "34px",
              height: "34px",
              backgroundColor: "black",
              paddingTop: "2px",
              paddingLeft: "2px",
            }}
            _hover={{ cursor: "pointer" }}
            _active={{ transform: "scale(1.05)" }}
            onClick={() => {
              history.go(-1);
            }}
          >
            <AiOutlineLeft color="white" fontSize={30} />
          </Box>
          <Box
            sx={{
              borderRadius: "34px",
              width: "34px",
              height: "34px",
              backgroundColor: "black",
              paddingTop: "2px",
              paddingLeft: "3px",
            }}
            _hover={{ cursor: "pointer" }}
            _active={{ transform: "scale(1.05)" }}
            onClick={() => {
              history.go(1);
            }}
          >
            <AiOutlineRight
              color="white"
              fontSize={30}
              onClick={() => {
                console.log("hihii");
              }}
            />
          </Box>
        </Flex>
        {location.pathname === "/search" ? (
          <Search submitted={submitted} setSubmitted={setSubmitted} />
        ) : null}
        {/* <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div> */}

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
                onClick={() => {
                  if (!currentUser) {
                    history.push("/login");
                  }
                }}
                _active={{
                  backgroundColor: "none",
                  transform: "scale(0.96)",
                }}
                _hover={{
                  backgroundColor: "none",
                  // transform: "scale(1.03)",
                }}
              >
                {currentUser ? currentUser.username : "Sign In"}
              </MenuButton>
              <MenuList
                borderColor="rgb(40,40, 40)"
                backgroundColor="rgb(40,40, 40)"
              >
                <MenuItem
                  _hover={{
                    backgroundColor: "gray",
                  }}
                  fontSize={16}
                  color="white"
                >
                  Profile
                </MenuItem>
                <MenuItem
                  _hover={{
                    backgroundColor: "gray",
                  }}
                  fontSize={16}
                  color="white"
                  onClick={() => {
                    dispatch(logout()).then(() => {
                      history.push("/login");
                    });
                  }}
                >
                  Log Out
                </MenuItem>
                {/* <MenuItem></MenuItem> */}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </div>
    </Box>
  );
};
export default Navbar;
