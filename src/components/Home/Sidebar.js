import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import SpotifyLogo from "../../SpotifyLogo";
import { MdHomeFilled } from "react-icons/md";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { BiLibrary } from "react-icons/bi";
import { BsPlusSquareFill } from "react-icons/bs";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useEffect } from "react";
import csrfFetch from "../../store/csrf";
import { createPlaylist, getPlaylistsForOne } from "../../store/playlist";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ sidebarwidth }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  //
  const currentUser = useSelector((state) => state.session.user);
  //
  const playlists = useSelector((state) => state.playlist.list);
  //
  //   playlists.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)),
  //   " in sidebar playlists"
  // );
  // const playlist

  // useEffect(() => {
  //   csrfFetch("/api/playlists", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       playlist: {
  //         user_id: 1,
  //         title: "New thing",
  //       },
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) =>
  // }, []);

  useEffect(() => {
    // if (currentUser) {
    //   // dispatch(getPlaylistsForOne(currentUser.id)); playlist rails
    // }
  }, [dispatch, currentUser]);

  useEffect(() => {
    console.log("Playlists are: ", playlists);
  }, [dispatch, playlists]);

  return (
    <Box className="sidebar">
      <div
        style={{
          backgroundColor: "black",
          width: sidebarwidth + "px",
          height: "100vh",
          zIndex: "0",
          position: "fixed", // position relative lest you use z index
        }}
      >
        <Flex h="100%" flexDir="column">
          <SpotifyLogo
            size={140}
            color="white"
            style={{ marginLeft: "0px", marginTop: "0px" }}
          />
          <Box style={{ color: "whitesmoke" }}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              pl={6}
              //   mb={3}
              pb={3}
              as={Link}
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <MdHomeFilled
                color={
                  location.pathname === "/" ? "white" : "rgb(179, 179, 179)"
                }
                size={35}
              />
              <Text
                ml="10.5px"
                mt={1}
                fontFamily="Circular"
                color={
                  location.pathname === "/" ? "white" : "rgb(179, 179, 179)"
                }
                fontWeight={500}
                _hover={{
                  color: "white",
                }}
                sx={{ transition: "0.2s" }}
              >
                Home
              </Text>
            </Box>
            {/*  */}
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              pl={6}
              ml={0.5}
              //   mb={3}
              pb={3}
              as={Link}
              to="/search"
              onClick={() => {
                window.scrollTo(0, 0);
                setTimeout(() => {
                  document.querySelector(".searchbartarget").focus();
                }, 200);
              }}
            >
              {location.pathname === "/search" ? (
                <>
                  <RiSearchLine color="white" size={30} />
                  <div
                    style={{
                      position: "absolute",
                      top: "151.35px",
                      left: "29.54px",
                    }}
                  >
                    <svg width="21px" height="20px">
                      <path
                        fill="white"
                        d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
                      ></path>
                    </svg>
                  </div>
                </>
              ) : (
                // <RiSearchFill color="white" size={30} />
                // <div
                //   style={{
                //     paddingTop: "2px",
                //     paddingBottom: "2.5px",
                //     marginRight: "1.5px",
                //   }}
                // >
                //   <svg
                //     role="img"
                //     height="24"
                //     width="28"
                //     class="Svg-ytk21e-0 jAKAlG search-active-icon"
                //     aria-hidden="true"
                //     viewBox="0 1 20 20"
                //   >
                //     <path
                //       fill="white"
                //       d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
                //     ></path>
                //     <path
                //       fill="white"
                //       d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
                //     ></path>
                //   </svg>
                // </div>
                <RiSearchLine color="rgb(179, 179, 179)" size={30} />
              )}
              <Text
                ml="14px"
                fontFamily="Circular"
                color={
                  location.pathname === "/search"
                    ? "white"
                    : "rgb(179, 179, 179)"
                }
                fontWeight={500}
                _hover={{
                  color: "white",
                }}
                sx={{ transition: "0.2s" }}
              >
                Search
              </Text>
            </Box>
            {/*  */}
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              pl={6}
              ml="2px"
              //   mb={3}
              pb={3}
              as={Link}
              to="/library"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <BiLibrary
                color={
                  location.pathname === "/library"
                    ? "white"
                    : "rgb(179, 179, 179)"
                }
                size={30}
              />
              <Text
                ml="13px"
                fontFamily="Circular"
                color={
                  location.pathname === "/library"
                    ? "white"
                    : "rgb(179, 179, 179)"
                }
                fontWeight={500}
                _hover={{
                  color: "white",
                }}
                sx={{ transition: "0.2s" }}
              >
                Your Library
              </Text>
            </Box>
          </Box>

          {/* <Box color="white">Create Playlist</Box> */}

          <Box
            className="addIconParent"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            pl={6}
            ml="2px"
            mt="50px"
            //   mb={3}
            pb={4}
            as={Link}
            // ideally this would in line on click create a new playlist, then
            // instantly route to that new page, update your dispatchs as well
            // to="/" //UNCOMMENT LATER
            onClick={() => {
              // dispatch(createPlaylistForOne(currentUser.id, "My Playlist")); playlist rails
              dispatch(createPlaylist()).then((data) => {
                console.log(data, "is the newly created playlist");
                history.push(`/playlist/${data}`);
                window.scrollTo(0, 0);
              });
            }}
          >
            <Icon
              className="addIcon"
              // _hover={{
              //   color: "white",
              // }}
              fontSize={29}
              as={BsPlusSquareFill}
              color={"rgb(179, 179, 179)"}
              sx={{ transition: "0.2s" }}
            />
            <Text
              className="addIconText"
              ml="13px"
              fontFamily="Circular"
              color={"rgb(179, 179, 179)"}
              fontWeight={500}
              // _hover={{
              //   color: "white",
              // }}
              sx={{ transition: "0.2s" }}
            >
              Create Playlist
            </Text>
          </Box>
          <Divider
            width="78%"
            // mt={10}
            ml={5}
            mr={3}
            backgroundColor="rgb(36, 36, 36)"
            opacity={0.2}
          />
          {/* actual playlists below */}
          <Box
            mt={2}
            className="playlistsScroll"
            sx={{
              overflow: "auto",
              // border: "1px solid white",
              height: "1000px",

              padding: "2px 20px",
              marginBottom: "93px",
              // backgroundClip: "content-box", // just to visualize
              // backgroundColor: "red",
            }}
          >
            {playlists.length > 0 &&
              playlists
                .slice(0)
                .reverse()
                .map((e) => {
                  return (
                    <Box
                      pl={1}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap", // does the ... thingy if too long
                        // letterSpacing: "-.5px",
                      }}
                      fontSize="15px"
                      color="rgb(159, 159, 159)"
                      pb="12px"
                      _hover={{
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        history.push(`/playlist/${e.uniqID}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {e.name}
                    </Box>
                  );
                })}
          </Box>
        </Flex>
      </div>
    </Box>
  );
};
export default Sidebar;
