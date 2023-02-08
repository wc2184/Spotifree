import {
  Box,
  Button,
  Flex,
  Image,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import "./Home.css";
import SpotifyLogo from "../../SpotifyLogo";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import Lorem from "./Lorem";
import MainContentWrapper from "./MainContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useCallback, useEffect, useState } from "react";
import Player from "./Player";
import {
  setAlreadyListened,
  setCurrentSong,
  setIndex,
  setQueue,
} from "../../store/player";
import { BsPlayFill } from "react-icons/bs";
import { setSearchLoading } from "../../store/search";
import { getPlaylists, setPlaylistSongsAndObj } from "../../store/playlist";
import Playlist from "./Playlist";

// plan, use useEffect to update a array with all searchResults from useselector

const Home = () => {
  const dispatch = useDispatch();
  let sidebarwidth = 240;
  const user = useSelector((state) => state.session.user);
  const searchTerm = useSelector((state) => state.search.search);
  const searchLoading = useSelector((state) => state.search.searchLoading);
  const currentVideo = useSelector((state) => state.player.song);
  const [submitted, setSubmitted] = useState(false);
  const [submittedNoembed, setSubmittedNoembed] = useState(false);
  const playlists = useSelector((state) => state.playlist.list);
  const currentUser = useSelector((state) => state.session.user);
  const currentList = useSelector((state) => state.playlist.currentList);
  const searchResults = useSelector(
    (state) => state.search.searchResults.items
  );
  const [playerTarget, setPlayerTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visualLoading, setVisualLoading] = useState(true);
  const [noembedDatas, setNoembedDatas] = useState([]);

  useEffect(() => {
    // OPTIMIZED playlist single code
    // essentially doing this because youtube's data api v3 is a 10000 quota so if i view like 10 playlists of 20 songs each it's going to be 50 views a day max lol,
    // noembed is free api hits, and not affiliated with youtube's data api v3 and won't count towards my cap
    const fetchNoembedData = async () => {
      let noembedArr = [];
      for (const ele of searchResults) {
        //

        let res = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ele.id.videoId}`
        );
        let data = await res.json();
        if (!data.hasOwnProperty("error")) noembedArr.push(data);
      }

      //
      setNoembedDatas(noembedArr);
      setSubmittedNoembed(true);
      dispatch(setSearchLoading(false));
    };
    if (searchResults.length > 0) {
      fetchNoembedData();
    }
  }, [searchResults]);
  //
  //
  // useEffect(() => {
  //   let links = [];
  //   for (let i of noembedDatas) {
  //     links.push(i.url);
  //   }
  //   // console.log(links);
  // }, [noembedDatas]);

  useEffect(() => {
    dispatch(getPlaylists());
  }, []);

  const loadingComponent = (
    <div>
      <div id="wave">
        <p style={{ marginBottom: "3vh", fontSize: "1.5rem" }}>
          We're finding your songs!
        </p>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
  // Gradient Section
  const [playlistLoading, setPlaylistLoading] = useState(true);
  function hashCode(str) {
    // hash function for spotifree color gradient consistency
    return str
      .split("")
      .reduce(
        (prevHash, currVal) =>
          ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
        0
      );
  }
  const colors = [
    "#eb4034",
    "#cc923b",
    "#8bcc3b",
    "#3bcc99",
    "#3baacc",
    "#000077",
    "#4c3bcc",
    "#cc3b84",
    "#d60f19",
    "#80d0e8",
  ];
  // End
  const location = useLocation();
  // console.log(location, location == undefined, "id in index", currentList);

  useEffect(() => {
    // console.log("is this even runnings/???");
    // console.log(location, location == undefined, "id in index", currentList);
    if (!location.pathname.includes("playlist")) {
      dispatch(setPlaylistSongsAndObj([], null));
    }
  }, [dispatch, location.pathname]);
  return (
    <div className="globalwrapper" style={{ maxWidth: "100vw" }}>
      <Navbar
        sidebarwidth={sidebarwidth}
        submitted={submittedNoembed}
        setSubmitted={setSubmittedNoembed}
        hashCode={hashCode}
        colors={colors}
      />
      <Sidebar sidebarwidth={sidebarwidth} />
      <Player
        playerTarget={playerTarget}
        setPlayerTarget={setPlayerTarget}
        loading={loading}
        setLoading={setLoading}
        visualLoading={visualLoading}
        setVisualLoading={setVisualLoading}
      />
      {/* <Box className="homecontainer">
          <Box
            style={{ backgroundColor: "rgb(18, 18, 18)" }}
            className="maincontent"
          ></Box>
        </Box> */}

      <Route exact path="/">
        <MainContentWrapper
          sidebarwidth={sidebarwidth}
          hashCode={hashCode}
          colors={colors}
        >
          <Box
            mt="100px"
            width={`calc(100vw - ${sidebarwidth}px)`}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // justifyContent: "flex-start",
              // height: "1000px",
              flexDir: "column",
            }}
            ml="30px"
          >
            <Box>
              <Text
                sx={{ flex: "1 0 15%" }}
                color="white"
                fontWeight="700"
                fontSize="28px"
                mb={4}
                letterSpacing="-1px"
              >
                Welcome back
              </Text>
              <Box
                mt={5}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignContent: "flex-start",
                  maxWidth: "100%",
                  height: "100%",
                  flexWrap: "wrap",
                  gap: "20px 20px",
                }}
              >
                {playlists &&
                  [...playlists]
                    .reverse()
                    .slice(0, 6)
                    .map((el, i) => {
                      // return <div>{el.title}</div>;
                      return (
                        <Box
                          style={
                            {
                              // display: "flex",
                              // flex: "1 0 30%",
                              // height: "260px",
                            }
                          }
                        >
                          <Box
                            sx={{
                              flex: "1 0 40%",
                              display: "flex",
                              width: "400px",
                              padding: "20px",
                              // border: "1px solid white",
                              borderRadius: "8px",
                              // padding: "20px",
                              backgroundColor: "rgb(32, 32, 32)",
                              // transition: "all .9 ease",
                              WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                              transition: "ease 0.3s",
                            }}
                            _hover={{
                              backgroundColor: "rgb(53, 53, 53)",
                              cursor: "pointer",
                              transform: "scale(1.02)",
                              transition: "ease 0.3s",
                            }}
                            _active={{
                              transform: "scale(0.99)",
                            }}
                            onClick={() => {
                              dispatch(
                                setCurrentSong(searchResults[i].id.videoId)
                              );
                              //BOOKMARK playerTarget.seekTo(val)
                              if (
                                currentVideo === searchResults[0].id.videoId
                              ) {
                                playerTarget.seekTo(0);
                                playerTarget.playVideo();
                                return;
                              }

                              const playVideoCheck = setInterval(() => {
                                // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                                setLoading((loading) => {
                                  if (!loading) {
                                    setPlayerTarget((playerTarget) => {
                                      setTimeout(() => {
                                        playerTarget.playVideo();
                                      }, 400);
                                      return playerTarget;
                                    });
                                    clearInterval(playVideoCheck);
                                  }
                                  return loading;
                                });

                                // playerTarget.playVideo();
                              }, 300);
                            }}
                          >
                            <Image
                              w="120px"
                              h="100px"
                              // mb={5}
                              mr={5}
                              // borderRadius={10}
                              boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                              src={
                                noembedDatas.length > 0 &&
                                noembedDatas[
                                  Math.floor(
                                    Math.random() * noembedDatas.length
                                  )
                                ].thumbnail_url
                              }
                              // src={
                              //   searchResults.length > 0 &&
                              //   searchResults[0].snippet.thumbnails.default.url
                              // }
                            ></Image>
                            {/* {searchResults.length > 0 && searchResults[0].snippet.title} */}
                            <Box>
                              {/* good parsed title and channel */}
                              <Box
                                fontSize="30px"
                                fontWeight={700}
                                letterSpacing="-1.5px"
                                mb={1}
                                sx={{
                                  textOverflow: "ellipsis", //overflow but just simply
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  maxHeight: "50px",
                                  color: "white",
                                }}
                              >
                                {el.title}
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  mt="1px"
                                  ml="1px"
                                  fontSize={15}
                                  color="rgb(179, 179, 179)"
                                >
                                  {noembedDatas.length > 0 &&
                                    noembedDatas[
                                      Math.floor(
                                        Math.random() * noembedDatas.length
                                      )
                                    ].author_name
                                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                      .replace("VEVO", "")}
                                  {/* {searchResults.length > 0 &&
                    searchResults[0].snippet.channelTitle
                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                      .replace("VEVO", "")} */}
                                </Box>
                                {/* <Box
                            sx={{
                              fontWeight: "700",
                              fontSize: "13px",
                              backgroundColor: "rgb(19, 19, 19)",
                              width: "80px",
                              borderRadius: "20px",
                              padding: "3px 3px",
                              textAlign: "center",
                              marginLeft: "8px",
                              marginTop: "2px",
                            }}
                            color="white"
                          >
                            PLAYLIST
                          </Box> */}
                                {/* <Box
                          sx={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "48px",
                            backgroundColor: "rgb(30, 215, 96)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "auto",
                            marginRight: "5px",
                            boxShadow: "0px 8px 24px rgb(0, 0, 0, .7)",
                          }}
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                          _active={{
                            transform: "scale(.95)",
                          }}
                        >
                          <BsPlayFill
                            style={{ marginLeft: "2px" }}
                            color="black"
                            size={30}
                          />
                        </Box> */}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
              </Box>
            </Box>
            <Box
              height={noembedDatas.length === 0 ? "100vw" : ""}
              w="80vw"
              mt="70px"
              sx={{}}
              mr="auto"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // flexWrap: "wrap",
                }}
              >
                <Text
                  // sx={{ flex: "1 0 15%" }}
                  color="white"
                  fontWeight="700"
                  fontSize="28px"
                  mb="20px"
                  letterSpacing="-1px"
                >
                  Recently Played
                </Text>
                <Box
                  w="80vw"
                  sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
                >
                  {noembedDatas.slice(0, 12).map((el, i) => {
                    // return <div>{el.title}</div>;
                    return (
                      <Box
                        style={
                          {
                            // display: "flex",
                            // flex: "1 0 30%",
                            // height: "260px",
                          }
                        }
                      >
                        <Box
                          sx={{
                            flex: "1 0 40%",
                            display: "flex",
                            flexDir: "column",
                            width: "300px",
                            padding: "20px",
                            // border: "1px solid white",
                            borderRadius: "8px",
                            // padding: "20px",
                            backgroundColor: "rgb(32, 32, 32)",
                            // transition: "all .9 ease",
                            WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                            transition: "ease 0.3s",
                          }}
                          _hover={{
                            backgroundColor: "rgb(53, 53, 53)",
                            cursor: "pointer",
                            transform: "scale(1.02)",
                            transition: "ease 0.3s",
                          }}
                          _active={{
                            transform: "scale(0.99)",
                          }}
                          onClick={() => {
                            dispatch(
                              setCurrentSong(searchResults[i].id.videoId)
                            );
                            //BOOKMARK playerTarget.seekTo(val)
                            if (currentVideo === searchResults[0].id.videoId) {
                              playerTarget.seekTo(0);
                              playerTarget.playVideo();
                              return;
                            }

                            const playVideoCheck = setInterval(() => {
                              // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                              setLoading((loading) => {
                                if (!loading) {
                                  setPlayerTarget((playerTarget) => {
                                    setTimeout(() => {
                                      playerTarget.playVideo();
                                    }, 400);
                                    return playerTarget;
                                  });
                                  clearInterval(playVideoCheck);
                                }
                                return loading;
                              });

                              // playerTarget.playVideo();
                            }, 300);
                          }}
                        >
                          <Image
                            w="120px"
                            h="100px"
                            // mb={5}
                            mr={5}
                            // borderRadius={10}
                            boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                            src={el.thumbnail_url}
                            // src={
                            //   searchResults.length > 0 &&
                            //   searchResults[0].snippet.thumbnails.default.url
                            // }
                          ></Image>
                          {/* {searchResults.length > 0 && searchResults[0].snippet.title} */}
                          <Box>
                            {/* good parsed title and channel */}
                            <Box
                              fontSize="30px"
                              fontWeight={700}
                              letterSpacing="-1.5px"
                              mb={1}
                              sx={{
                                textOverflow: "ellipsis", //overflow but just simply
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxHeight: "50px",
                                color: "white",
                              }}
                            >
                              {noembedDatas.length > 0 &&
                                el.title.replace(
                                  el.author_name
                                    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                    .replace("VEVO", "") + "- ",
                                  ""
                                )}
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                mt="1px"
                                ml="1px"
                                fontSize={15}
                                color="rgb(179, 179, 179)"
                              >
                                {noembedDatas.length > 0 &&
                                  noembedDatas[
                                    Math.floor(
                                      Math.random() * noembedDatas.length
                                    )
                                  ].author_name
                                    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                    .replace("VEVO", "")}
                                {/* {searchResults.length > 0 &&
                    searchResults[0].snippet.channelTitle
                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                      .replace("VEVO", "")} */}
                              </Box>
                              {/* <Box
                            sx={{
                              fontWeight: "700",
                              fontSize: "13px",
                              backgroundColor: "rgb(19, 19, 19)",
                              width: "80px",
                              borderRadius: "20px",
                              padding: "3px 3px",
                              textAlign: "center",
                              marginLeft: "8px",
                              marginTop: "2px",
                            }}
                            color="white"
                          >
                            PLAYLIST
                          </Box> */}
                              {/* <Box
                          sx={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "48px",
                            backgroundColor: "rgb(30, 215, 96)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "auto",
                            marginRight: "5px",
                            boxShadow: "0px 8px 24px rgb(0, 0, 0, .7)",
                          }}
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                          _active={{
                            transform: "scale(.95)",
                          }}
                        >
                          <BsPlayFill
                            style={{ marginLeft: "2px" }}
                            color="black"
                            size={30}
                          />
                        </Box> */}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* {user && user.username + "is the current user! "} <br /> */}
          {/* <Lorem /> */}
          {/* <div>
            <Button
              colorScheme="green"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </Button>
          </div> */}
        </MainContentWrapper>
      </Route>
      <Route exact path="/search">
        <MainContentWrapper
          sidebarwidth={sidebarwidth}
          hashCode={hashCode}
          colors={colors}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              paddingTop: "64px",
              color: "white",
            }}
          >
            {/* idea, put first 4 on the right side, then slice(5) . */}
            <Box mb={5}>{/* Searching for "{searchTerm}" */}</Box>
            {searchLoading ? loadingComponent : null}
            {!submittedNoembed && !searchLoading ? (
              <>
                <div className="emptyQuery">
                  Please enter a search query above! Yes, you can listen to ANY
                  song for free.
                </div>
                <div className="emptyQuery">
                  Try searching: "Adele" or "The Beatles"
                </div>
              </>
            ) : null}
            {!submittedNoembed || searchLoading ? null : (
              <Box
                className="topResultAndSongsFlexContainer"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "40px",
                    marginLeft: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDir: "column",
                      marginBottom: "80px",
                      flex: "1 0 30%",
                    }}
                    height="250px"
                    width="430px"
                  >
                    <Text
                      sx={{ flex: "1 0 15%" }}
                      color="white"
                      fontWeight="700"
                      fontSize="27px"
                      mb={4}
                    >
                      Top result
                    </Text>
                    <Box
                      sx={{
                        flex: "1 0 85%",
                        // border: "1px solid white",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "rgb(32, 32, 32)",
                        // transition: "all .9 ease",
                        WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                        transition: "ease 0.3s",
                      }}
                      _hover={{
                        backgroundColor: "rgb(53, 53, 53)",
                        cursor: "pointer",
                        transform: "scale(1.02)",
                        transition: "ease 0.3s",
                      }}
                      _active={{
                        transform: "scale(0.99)",
                      }}
                      onClick={() => {
                        dispatch(setCurrentSong(searchResults[0].id.videoId));
                        //BOOKMARK playerTarget.seekTo(val)
                        if (currentVideo === searchResults[0].id.videoId) {
                          playerTarget.seekTo(0);
                          playerTarget.playVideo();
                          return;
                        }
                        let properNoembedDatas = noembedDatas.map((el) => {
                          return [el];
                        });
                        dispatch(setQueue(properNoembedDatas));
                        dispatch(setIndex(0));
                        dispatch(setAlreadyListened([0]));

                        const playVideoCheck = setInterval(() => {
                          // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                          setLoading((loading) => {
                            if (!loading) {
                              setPlayerTarget((playerTarget) => {
                                setTimeout(() => {
                                  playerTarget.playVideo();
                                }, 400);
                                return playerTarget;
                              });
                              clearInterval(playVideoCheck);
                            }
                            return loading;
                          });

                          // playerTarget.playVideo();
                        }, 300);
                      }}
                    >
                      <Image
                        w="120px"
                        h="100px"
                        mb={5}
                        borderRadius={10}
                        boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                        src={
                          noembedDatas.length > 0 &&
                          noembedDatas[0].thumbnail_url
                        }
                        // src={
                        //   searchResults.length > 0 &&
                        //   searchResults[0].snippet.thumbnails.default.url
                        // }
                      ></Image>
                      {/* {searchResults.length > 0 && searchResults[0].snippet.title} */}
                      <Box>
                        {/* good parsed title and channel */}
                        <Box
                          fontSize="30px"
                          fontWeight={700}
                          letterSpacing="-1.5px"
                          mb={1}
                          sx={{
                            textOverflow: "ellipsis", //overflow but just simply
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxHeight: "50px",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              noembedDatas.length > 0 &&
                              noembedDatas[0].title
                                .replace(
                                  noembedDatas[0].author_name
                                    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                    .replace("VEVO", "") + "- ",
                                  ""
                                )
                                .replace(/\(audio\)/i, "")
                                .replace("(Official Video)", "")
                                .replace(/\(audio\)/i, "")
                                .replace(/\(Official audio\)/i, "")
                                .replace(/\(official music video\)/i, "")
                                .replace(/\(lyrics\)/i, "")
                                .replace(/\(visualizer\)/i, "")
                                .replace(/\(official lyric video\)/i, "")
                                .replace(/\[official music video\]/i, "")
                                .replace(/\(official lyric video\)/i, "")
                                .replace(/\(lyric video\)/i, "")
                                .replace(/\[official video\]/i, "")
                                .replace(/\(music video\)/i, "")
                                .replace(/\[official audio\]/i, "")
                                .replace(/\[official visualizer\]/i, "")
                                .replace(/「Official Audio」/i, "")
                                .replace(/「Audio」/, ""),
                            //  + "noembed",
                          }}
                          // old stuff
                          //
                          // dangerouslySetInnerHTML={{
                          //   __html:
                          //     searchResults.length > 0 &&
                          //     searchResults[0].snippet.title.replace(
                          //       searchResults[0].snippet.channelTitle
                          //         .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                          //         .replace("VEVO", "") + "- ",
                          //       ""
                          //     ),
                          // }}
                        ></Box>

                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            mt="1px"
                            ml="1px"
                            fontSize={15}
                            color="rgb(179, 179, 179)"
                          >
                            {noembedDatas.length > 0 &&
                              noembedDatas[0].author_name
                                .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                .replace("VEVO", "")
                                .replace("- Topic", "")
                                .replace("– topic", "")}
                            {/* {searchResults.length > 0 &&
                              searchResults[0].snippet.channelTitle
                                .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                .replace("VEVO", "")} */}
                          </Box>
                          <Box
                            sx={{
                              fontWeight: "700",
                              fontSize: "13px",
                              backgroundColor: "rgb(19, 19, 19)",
                              width: "64px",
                              borderRadius: "20px",
                              padding: "3px 3px",
                              textAlign: "center",
                              marginLeft: "8px",
                              marginTop: "2px",
                            }}
                          >
                            SONG
                          </Box>
                          <Box
                            sx={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "48px",
                              backgroundColor: "rgb(30, 215, 96)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "auto",
                              marginRight: "5px",
                              boxShadow: "0px 8px 24px rgb(0, 0, 0, .7)",
                            }}
                            _hover={{
                              transform: "scale(1.05)",
                            }}
                            _active={{
                              transform: "scale(.95)",
                            }}
                          >
                            <BsPlayFill
                              style={{ marginLeft: "2px" }}
                              color="black"
                              size={30}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ flex: "1 0 60%" }}>
                    <Text
                      sx={{ flex: "1 0 15%" }}
                      color="white"
                      fontWeight="700"
                      fontSize="27px"
                      mb={4}
                    >
                      Songs
                    </Text>
                    <Box>
                      {noembedDatas.slice(1, 5).map((ele, i) => {
                        {
                          //
                        }
                        return (
                          <Box
                            _hover={{
                              // pointer: "cursor",
                              cursor: "pointer",
                              backgroundColor: "rgb(42, 42, 42)",
                              transform: "translate(2px)",
                              transition: "ease 0.2s",
                            }}
                            _active={{
                              transform: "scale(0.99)",
                            }}
                            sx={{
                              height: "60px",
                              borderRadius: "4px",
                              padding: "5px 10px",
                              // border: "1px solid white",
                              zIndex: 5,
                              display: "flex",
                              transition: "ease 0.2s",
                            }}
                            onClick={() => {
                              dispatch(
                                setCurrentSong(
                                  ele.url.replace(
                                    "https://www.youtube.com/watch?v=",
                                    ""
                                  )
                                )
                              );
                              if (
                                currentVideo ===
                                ele.url.replace(
                                  "https://www.youtube.com/watch?v=",
                                  ""
                                )
                              ) {
                                playerTarget.seekTo(0);
                                playerTarget.playVideo();
                                return;
                              }
                              let properNoembedDatas = noembedDatas.map(
                                (el) => {
                                  return [el];
                                }
                              );
                              dispatch(setQueue(properNoembedDatas));
                              dispatch(setIndex(i + 1));
                              dispatch(setAlreadyListened([i + 1]));
                              const playVideoCheck = setInterval(() => {
                                // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                                setLoading((loading) => {
                                  if (!loading) {
                                    setPlayerTarget((playerTarget) => {
                                      setTimeout(() => {
                                        playerTarget.playVideo();
                                      }, 400);
                                      return playerTarget;
                                    });
                                    clearInterval(playVideoCheck);
                                  }
                                  return loading;
                                });

                                // playerTarget.playVideo();
                              }, 300);
                            }}
                          >
                            <Image
                              mt="5px"
                              w="50px"
                              h="40px"
                              mb={5}
                              mr="14px"
                              boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                              src={noembedDatas.length > 0 && ele.thumbnail_url}
                              // src={
                              //   searchResults.length > 0 &&
                              //   ele.snippet.thumbnails.default.url
                              // }
                            ></Image>
                            <Box>
                              <Box
                                sx={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  paddingTop: "1px",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    noembedDatas.length > 0 &&
                                    ele.title
                                      .replace(
                                        ele.author_name
                                          .replace(
                                            /([a-z0-9])([A-Z])/g,
                                            "$1 $2"
                                          )
                                          .replace("VEVO", "") + "- ",
                                        ""
                                      )
                                      .replace(/\(audio\)/i, "")
                                      .replace("(Official Video)", "")
                                      .replace(/\(audio\)/i, "")
                                      .replace(/\(Official audio\)/i, "")
                                      .replace(/\(official music video\)/i, "")
                                      .replace(/\(lyrics\)/i, "")
                                      .replace(/\(visualizer\)/i, "")
                                      .replace(/\(official lyric video\)/i, "")
                                      .replace(/\[official music video\]/i, "")
                                      .replace(/\(official lyric video\)/i, "")
                                      .replace(/\(lyric video\)/i, "")
                                      .replace(/\[official video\]/i, "")
                                      .replace(/\(music video\)/i, "")
                                      .replace(/\[official audio\]/i, "")
                                      .replace(/\[official visualizer\]/i, "")
                                      .replace(/「Official Audio」/i, "")
                                      .replace(/「Audio」/, ""),
                                  // + "noembed",
                                }}
                                // dangerouslySetInnerHTML={{
                                //   __html:
                                //     searchResults.length > 0 &&
                                //     ele.snippet.title.replace(
                                //       ele.snippet.channelTitle
                                //         .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                //         .replace("VEVO", "") + "- ",
                                //       ""
                                //     ),
                                // }}
                              ></Box>
                              <Box
                                sx={{
                                  color: "rgb(179, 179, 179)",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    noembedDatas.length > 0 &&
                                    ele.author_name
                                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                      .replace("VEVO", "")
                                      .replace("- Topic", ""),
                                }}
                              ></Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>

                <Box mt={3} ml={3} mb="200px">
                  {noembedDatas.slice(5).map((ele, i) => {
                    return (
                      <Box
                        _hover={{
                          // pointer: "cursor",
                          cursor: "pointer",
                          backgroundColor: "rgb(42, 42, 42)",
                          transform: "translate(2px)",

                          transition: "ease 0.2s",
                        }}
                        _active={{
                          transform: "scale(0.99) translate(-2px)",
                        }}
                        sx={{
                          height: "60px",
                          borderRadius: "4px",
                          padding: "5px 10px",
                          // border: "1px solid white",
                          zIndex: 5,
                          display: "flex",
                          transition: "ease 0.2s",
                        }}
                        onClick={() => {
                          dispatch(
                            setCurrentSong(
                              ele.url.replace(
                                "https://www.youtube.com/watch?v=",
                                ""
                              )
                            )
                          );
                          // dispatch(setCurrentSong(ele.id.videoId));
                          if (
                            currentVideo ===
                            ele.url.replace(
                              "https://www.youtube.com/watch?v=",
                              ""
                            )
                          ) {
                            playerTarget.seekTo(0);
                            playerTarget.playVideo();
                            return;
                          }
                          let properNoembedDatas = noembedDatas.map((el) => {
                            return [el];
                          });
                          dispatch(setQueue(properNoembedDatas));
                          dispatch(setIndex(i + 5));
                          dispatch(setAlreadyListened([i + 5]));
                          const playVideoCheck = setInterval(() => {
                            // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                            setLoading((loading) => {
                              if (!loading) {
                                // setLoading(true);
                                setPlayerTarget((playerTarget) => {
                                  setTimeout(() => {
                                    playerTarget.playVideo();
                                    setLoading(false); // bookmarko
                                  }, 400);
                                  setTimeout(() => {
                                    setVisualLoading(false);
                                  }, 1500);
                                  return playerTarget;
                                });
                                clearInterval(playVideoCheck);
                              }
                              return loading;
                            });

                            // playerTarget.playVideo();
                          }, 70);
                        }}
                      >
                        <Image
                          mt="5px"
                          w="50px"
                          h="40px"
                          mb={5}
                          mr="14px"
                          boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                          src={noembedDatas.length > 0 && ele.thumbnail_url}
                          // src={
                          //   searchResults.length > 0 &&
                          //   ele.snippet.thumbnails.default.url
                          // }
                        ></Image>
                        <Box>
                          <Box
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              paddingTop: "1px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html:
                                noembedDatas.length > 0 &&
                                ele.title
                                  .replace(
                                    ele.author_name
                                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                      .replace("VEVO", "") + "- ",
                                    ""
                                  )
                                  .replace(/\(audio\)/i, "")
                                  .replace(/\[official music video\]/i, "")
                                  .replace("(Official Video)", "")
                                  .replace(/\(audio\)/i, "")
                                  .replace(/\(Official audio\)/i, "")
                                  .replace(/\(official music video\)/i, "")
                                  .replace(/\(lyrics\)/i, "")
                                  .replace(/\(visualizer\)/i, "")
                                  .replace(/\(official lyric video\)/i, "")
                                  .replace(/\[official music video\]/i, "")
                                  .replace(/\(official lyric video\)/i, "")
                                  .replace(/\(lyric video\)/i, "")
                                  .replace(/\[official video\]/i, "")
                                  .replace(/\(music video\)/i, "")
                                  .replace(/\[official audio\]/i, "")
                                  .replace(/\[official visualizer\]/i, "")
                                  .replace(/「Official Audio」/i, "")
                                  .replace(/「Audio」/, ""),
                              // + "noembed",
                            }}
                            // dangerouslySetInnerHTML={{
                            //   __html:
                            //     searchResults.length > 0 &&
                            //     ele.snippet.title.replace(
                            //       ele.snippet.channelTitle
                            //         .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                            //         .replace("VEVO", "") + "- ",
                            //       ""
                            //     ),
                            // }}
                          ></Box>
                          <Box
                            sx={{
                              color: "rgb(179, 179, 179)",
                            }}
                            dangerouslySetInnerHTML={{
                              __html:
                                noembedDatas.length > 0 &&
                                ele.author_name
                                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                  .replace("VEVO", "")
                                  .replace("- Topic", ""),
                            }}
                            // dangerouslySetInnerHTML={{
                            //   __html:
                            //     searchResults.length > 0 &&
                            //     ele.snippet.channelTitle
                            //       .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                            //       .replace("VEVO", ""),
                            // }}
                          ></Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </div>
          {/* {user && user.username + "is the current user! "} <br />
          kyungmin the goat this is search ipsum dolor sit amet, consectetur
          adipisicing elit. Eveniet, in reprehenderit! Voluptas ipsa cumque
          consectetur optio ut, atque consequuntur magnam numquam maxime
          molestias totam nesciunt fugiat eum facilis dolores deleniti.
          <div>
            <Button
              colorScheme="green"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </Button>
            <Button
              onClick={() => {
                dispatch(setCurrentSong("i1nindf1meE"));
              }}
              colorScheme="gray"
            >
              change to kanye
            </Button>
            <Button
              onClick={() => {
                dispatch(setCurrentSong("bsgBUM2Mnsw"));
              }}
              colorScheme="red"
            >
              change to changmo
            </Button>
          </div> */}
        </MainContentWrapper>
      </Route>
      <Route exact path="/library">
        <MainContentWrapper
          sidebarwidth={sidebarwidth}
          hashCode={hashCode}
          colors={colors}
        >
          <Box
            sx={{
              display: "flex",
              flexDir: "column",
              justifyContent: "flex-start",
              paddingLeft: "10px",
            }}
          >
            <Text
              sx={{ flex: "1 0 15%" }}
              color="white"
              fontWeight="700"
              fontSize="30px"
              letterSpacing="-1px"
              mt="80px"
              ml="10px"
              mb="30px"
            >
              Your Playlists
            </Text>
            <Box
              mt={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                maxWidth: "100%",
                height: "1000px",
                flexWrap: "wrap",
                gap: "60px 30px",
              }}
            >
              {playlists &&
                playlists.map((el, i) => {
                  // return <div>{el.title}</div>;
                  return (
                    <Box
                      style={{
                        display: "flex",
                        // flex: "1 0 30%",
                        minHeight: "260px",
                      }}
                    >
                      <Box
                        sx={{
                          flex: "1 0 85%",
                          width: "300px",
                          // border: "1px solid white",
                          borderRadius: "8px",
                          padding: "20px",
                          backgroundColor: "rgb(32, 32, 32)",
                          // transition: "all .9 ease",
                          WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                          transition: "ease 0.3s",
                        }}
                        _hover={{
                          backgroundColor: "rgb(53, 53, 53)",
                          cursor: "pointer",
                          transform: "scale(1.02)",
                          transition: "ease 0.3s",
                        }}
                        _active={{
                          transform: "scale(0.99)",
                        }}
                        onClick={() => {
                          dispatch(setCurrentSong(searchResults[i].id.videoId));
                          //BOOKMARK playerTarget.seekTo(val)
                          if (currentVideo === searchResults[0].id.videoId) {
                            playerTarget.seekTo(0);
                            playerTarget.playVideo();
                            return;
                          }

                          const playVideoCheck = setInterval(() => {
                            // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                            setLoading((loading) => {
                              if (!loading) {
                                setPlayerTarget((playerTarget) => {
                                  setTimeout(() => {
                                    playerTarget.playVideo();
                                  }, 400);
                                  return playerTarget;
                                });
                                clearInterval(playVideoCheck);
                              }
                              return loading;
                            });

                            // playerTarget.playVideo();
                          }, 300);
                        }}
                      >
                        <Image
                          w="120px"
                          h="100px"
                          mb={5}
                          borderRadius={10}
                          boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                          src={
                            noembedDatas.length > 0 &&
                            noembedDatas[
                              Math.floor(Math.random() * noembedDatas.length)
                            ].thumbnail_url
                          }
                          // src={
                          //   searchResults.length > 0 &&
                          //   searchResults[0].snippet.thumbnails.default.url
                          // }
                        ></Image>
                        {/* {searchResults.length > 0 && searchResults[0].snippet.title} */}
                        <Box>
                          {/* good parsed title and channel */}
                          <Box
                            fontSize="30px"
                            fontWeight={700}
                            letterSpacing="-1.5px"
                            mb={1}
                            sx={{
                              textOverflow: "ellipsis", //overflow but just simply
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              maxHeight: "50px",
                              color: "white",
                            }}
                          >
                            {el.title}
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              mt="1px"
                              ml="1px"
                              fontSize={15}
                              color="rgb(179, 179, 179)"
                            >
                              {noembedDatas.length > 0 &&
                                noembedDatas[
                                  Math.floor(
                                    Math.random() * noembedDatas.length
                                  )
                                ].author_name
                                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                  .replace("VEVO", "")}
                              {/* {searchResults.length > 0 &&
                    searchResults[0].snippet.channelTitle
                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                      .replace("VEVO", "")} */}
                            </Box>
                            <Box
                              sx={{
                                fontWeight: "700",
                                fontSize: "13px",
                                backgroundColor: "rgb(19, 19, 19)",
                                width: "80px",
                                borderRadius: "20px",
                                padding: "3px 3px",
                                textAlign: "center",
                                marginLeft: "8px",
                                marginTop: "2px",
                              }}
                              color="white"
                            >
                              PLAYLIST
                            </Box>
                            {/* <Box
                          sx={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "48px",
                            backgroundColor: "rgb(30, 215, 96)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "auto",
                            marginRight: "5px",
                            boxShadow: "0px 8px 24px rgb(0, 0, 0, .7)",
                          }}
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                          _active={{
                            transform: "scale(.95)",
                          }}
                        >
                          <BsPlayFill
                            style={{ marginLeft: "2px" }}
                            color="black"
                            size={30}
                          />
                        </Box> */}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
            ;
          </Box>
          {/* {user && user.username + "is the current user! "} <br />
          frfdsonny the goat we in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          library
          <div>
            {/* <Button
              colorScheme="green"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </Button> 
          </div> */}
        </MainContentWrapper>
      </Route>
      <Route path="/playlist/:id">
        <MainContentWrapper
          sidebarwidth={sidebarwidth}
          playlistLoading={playlistLoading}
          setPlaylistLoading={setPlaylistLoading}
          hashCode={hashCode}
          colors={colors}
        >
          <Playlist
            playerTarget={playerTarget}
            setPlayerTarget={setPlayerTarget}
            loading={loading}
            setLoading={setLoading}
            visualLoading={visualLoading}
            setVisualLoading={setVisualLoading}
            playlistLoading={playlistLoading}
            setPlaylistLoading={setPlaylistLoading}
          />
        </MainContentWrapper>
      </Route>
    </div>
  );
};
export default Home;
