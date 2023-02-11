import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const WelcomeBack = ({ library }) => {
  const playlists = useSelector((state) => state.playlist.list);
  const history = useHistory();
  const [playlistLoading, setPlaylistLoading] = useState(true);
  // get the first song of each playlist

  let oneFromEachPlaylist = playlists.map((list) => {
    if (list.songs.length > 0) return { ...list, link: list.songs[0].link };
    else return null;
  });
  const [noembedDatas, setNoembedDatas] = useState([]);
  useEffect(() => {
    const fetchNoembedData = async () => {
      setPlaylistLoading(true);
      let noembedArr = [];
      for (const ele of oneFromEachPlaylist) {
        //
        if (ele == null) continue;
        let res = await fetch(`https://noembed.com/embed?url=${ele.link}`);
        let data = await res.json();
        if (!data.hasOwnProperty("error"))
          noembedArr.push({ ...ele, videoDetails: data });
      }

      //
      setNoembedDatas(noembedArr);
      setPlaylistLoading(false);
    };
    fetchNoembedData();
  }, [playlists]);
  console.log(noembedDatas);
  if (playlistLoading) return;
  return (
    <>
      <Box width="100%" zIndex={1} mb="93px">
        <Text
          sx={{ flex: "1 0 15%" }}
          color="white"
          fontWeight="700"
          fontSize="28px"
          mb={4}
          letterSpacing="-1px"
        >
          {library ? "Your Library" : "Welcome back"}
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
          {!library &&
            noembedDatas &&
            [...noembedDatas].slice(0, 6).map((el, i) => {
              // return <div>{el.title}</div>;
              return (
                <Box
                  style={{
                    flex: "1 0 27%",
                    // display: "flex",
                    // flex: "1 0 30%",
                    // height: "260px",
                  }}
                  onClick={() => {
                    history.push(`/playlist/${el.uniqID}`);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      // minWidth: `calc((100vh - ${sidebarwidth}px) / 3 )`,
                      padding: "20px",
                      // border: "1px solid white",
                      borderRadius: "8px",
                      // padding: "20px",
                      backgroundColor: "rgb(59, 59, 59)",
                      // transition: "all .9 ease",
                      WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                      transition: "ease 0.3s",
                    }}
                    _hover={{
                      backgroundColor: "rgb(99, 99, 99)",
                      cursor: "pointer",
                      transform: "scale(1.02)",
                      transition: "ease 0.3s",
                    }}
                    _active={{
                      transform: "scale(0.99)",
                    }}
                    // onClick={() => {
                    //   dispatch(
                    //     setCurrentSong(searchResults[i].id.videoId)
                    //   );
                    //   //BOOKMARK playerTarget.seekTo(val)
                    //   if (
                    //     currentVideo === searchResults[0].id.videoId
                    //   ) {
                    //     playerTarget.seekTo(0);
                    //     playerTarget.playVideo();
                    //     return;
                    //   }

                    //   const playVideoCheck = setInterval(() => {
                    //     // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                    //     setLoading((loading) => {
                    //       if (!loading) {
                    //         setPlayerTarget((playerTarget) => {
                    //           setTimeout(() => {
                    //             playerTarget.playVideo();
                    //           }, 400);
                    //           return playerTarget;
                    //         });
                    //         clearInterval(playVideoCheck);
                    //       }
                    //       return loading;
                    //     });

                    //   }, 300);
                    // }}
                  >
                    <Image
                      w="120px"
                      h="100px"
                      mr={5}
                      boxShadow="0 8px 24px rgb(0, 0, 0, .5)"
                      src={
                        noembedDatas.length > 0 && el.videoDetails.thumbnail_url
                      }
                    ></Image>

                    <Box
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                      flex={1}
                    >
                      <Box
                        fontSize="21px"
                        fontWeight={700}
                        letterSpacing="-1.5px"
                        sx={{
                          // textOverflow: "ellipsis", //overflow but just simply
                          // overflow: "hidden",
                          // whiteSpace: "nowrap",
                          maxHeight: "65px",
                          color: "rgb(240, 240, 240)",
                          height: "100%",
                          width: "100%",
                          flex: 1,
                          // WebkitLineClamp: 2,
                          // WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {el.name}
                      </Box>

                      <Box
                        sx={{
                          fontWeight: "700",
                          fontSize: "13px",
                          backgroundColor: "#f2f2f2",
                          width: "82px",
                          borderRadius: "20px",
                          padding: "3px 3px",
                          textAlign: "center",
                          // marginLeft: "auto",
                          // marginTop: "2px",
                        }}
                      >
                        <Box mt="1px">PLAYLIST</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          {library && (
            <Box
              style={{
                flex: "1 0 27%",
                // display: "flex",
                // flex: "1 0 30%",
                // height: "260px",
                //   alignSelf: "start",
                minWidth: "300px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  // minWidth: `calc((100vh - ${sidebarwidth}px) / 3 )`,
                  padding: "20px",
                  // border: "1px solid white",
                  borderRadius: "8px",
                  // padding: "20px",
                  backgroundColor: "rgb(59, 59, 59)",
                  // transition: "all .9 ease",
                  WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                  transition: "ease 0.3s",
                }}
                _hover={{
                  backgroundColor: "rgb(99, 99, 99)",
                  cursor: "pointer",
                  transform: "scale(1.02)",
                  transition: "ease 0.3s",
                }}
                _active={{
                  transform: "scale(0.99)",
                }}
                // onClick={() => {
                //   dispatch(
                //     setCurrentSong(searchResults[i].id.videoId)
                //   );
                //   //BOOKMARK playerTarget.seekTo(val)
                //   if (
                //     currentVideo === searchResults[0].id.videoId
                //   ) {
                //     playerTarget.seekTo(0);
                //     playerTarget.playVideo();
                //     return;
                //   }

                //   const playVideoCheck = setInterval(() => {
                //     // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                //     setLoading((loading) => {
                //       if (!loading) {
                //         setPlayerTarget((playerTarget) => {
                //           setTimeout(() => {
                //             playerTarget.playVideo();
                //           }, 400);
                //           return playerTarget;
                //         });
                //         clearInterval(playVideoCheck);
                //       }
                //       return loading;
                //     });

                //   }, 300);
                // }}
              >
                <Image
                  w="120px"
                  h="100px"
                  mr={5}
                  boxShadow="0 8px 24px rgb(0, 0, 0, .5)"
                  src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg"
                ></Image>

                <Box
                  display="flex"
                  flexDir="column"
                  justifyContent="space-between"
                  flex={1}
                >
                  <Box
                    fontSize="21px"
                    fontWeight={700}
                    letterSpacing="-1.5px"
                    sx={{
                      // textOverflow: "ellipsis", //overflow but just simply
                      // overflow: "hidden",
                      // whiteSpace: "nowrap",
                      maxHeight: "65px",
                      color: "rgb(240, 240, 240)",
                      height: "100%",
                      width: "100%",
                      flex: 1,
                      // WebkitLineClamp: 2,
                      // WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Liked Songs
                  </Box>

                  <Box
                    sx={{
                      fontWeight: "700",
                      fontSize: "13px",
                      backgroundColor: "#f2f2f2",
                      width: "82px",
                      borderRadius: "20px",
                      padding: "3px 3px",
                      textAlign: "center",
                      // marginLeft: "auto",
                      // marginTop: "2px",
                    }}
                  >
                    <Box mt="1px">PLAYLIST</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {library &&
            noembedDatas &&
            [...noembedDatas]
              .reverse()

              .map((el, i) => {
                // return <div>{el.title}</div>;
                return (
                  <Box
                    style={{
                      flex: "1 0 27%",
                      // display: "flex",
                      // flex: "1 0 30%",
                      // height: "260px",
                      //   alignSelf: "start",
                      minWidth: "300px",
                    }}
                    onClick={() => {
                      history.push(`/playlist/${el.uniqID}`);
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        // minWidth: `calc((100vh - ${sidebarwidth}px) / 3 )`,
                        padding: "20px",
                        // border: "1px solid white",
                        borderRadius: "8px",
                        // padding: "20px",
                        backgroundColor: "rgb(59, 59, 59)",
                        // transition: "all .9 ease",
                        WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                        transition: "ease 0.3s",
                      }}
                      _hover={{
                        backgroundColor: "rgb(99, 99, 99)",
                        cursor: "pointer",
                        transform: "scale(1.02)",
                        transition: "ease 0.3s",
                      }}
                      _active={{
                        transform: "scale(0.99)",
                      }}
                      // onClick={() => {
                      //   dispatch(
                      //     setCurrentSong(searchResults[i].id.videoId)
                      //   );
                      //   //BOOKMARK playerTarget.seekTo(val)
                      //   if (
                      //     currentVideo === searchResults[0].id.videoId
                      //   ) {
                      //     playerTarget.seekTo(0);
                      //     playerTarget.playVideo();
                      //     return;
                      //   }

                      //   const playVideoCheck = setInterval(() => {
                      //     // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                      //     setLoading((loading) => {
                      //       if (!loading) {
                      //         setPlayerTarget((playerTarget) => {
                      //           setTimeout(() => {
                      //             playerTarget.playVideo();
                      //           }, 400);
                      //           return playerTarget;
                      //         });
                      //         clearInterval(playVideoCheck);
                      //       }
                      //       return loading;
                      //     });

                      //   }, 300);
                      // }}
                    >
                      <Image
                        w="120px"
                        h="100px"
                        mr={5}
                        boxShadow="0 8px 24px rgb(0, 0, 0, .5)"
                        src={
                          noembedDatas.length > 0 &&
                          el.videoDetails.thumbnail_url
                        }
                      ></Image>

                      <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="space-between"
                        flex={1}
                      >
                        <Box
                          fontSize="21px"
                          fontWeight={700}
                          letterSpacing="-1.5px"
                          sx={{
                            // textOverflow: "ellipsis", //overflow but just simply
                            // overflow: "hidden",
                            // whiteSpace: "nowrap",
                            maxHeight: "65px",
                            color: "rgb(240, 240, 240)",
                            height: "100%",
                            width: "100%",
                            flex: 1,
                            // WebkitLineClamp: 2,
                            // WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {el.name}
                        </Box>

                        <Box
                          sx={{
                            fontWeight: "700",
                            fontSize: "13px",
                            backgroundColor: "#f2f2f2",
                            width: "82px",
                            borderRadius: "20px",
                            padding: "3px 3px",
                            textAlign: "center",
                            // marginLeft: "auto",
                            // marginTop: "2px",
                          }}
                        >
                          <Box mt="1px">PLAYLIST</Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          {library && (
            <>
              <Box
                style={{
                  flex: "1 0 27%",
                  // display: "flex",
                  // flex: "1 0 30%",
                  // height: "260px",
                  //   alignSelf: "start",
                  minWidth: "300px",
                  visibility: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // minWidth: `calc((100vh - ${sidebarwidth}px) / 3 )`,
                    padding: "20px",
                    // border: "1px solid white",
                    borderRadius: "8px",
                    // padding: "20px",
                    backgroundColor: "rgb(59, 59, 59)",
                    // transition: "all .9 ease",
                    WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                    transition: "ease 0.3s",
                  }}
                  _hover={{
                    backgroundColor: "rgb(99, 99, 99)",
                    cursor: "pointer",
                    transform: "scale(1.02)",
                    transition: "ease 0.3s",
                  }}
                  _active={{
                    transform: "scale(0.99)",
                  }}
                  // onClick={() => {
                  //   dispatch(
                  //     setCurrentSong(searchResults[i].id.videoId)
                  //   );
                  //   //BOOKMARK playerTarget.seekTo(val)
                  //   if (
                  //     currentVideo === searchResults[0].id.videoId
                  //   ) {
                  //     playerTarget.seekTo(0);
                  //     playerTarget.playVideo();
                  //     return;
                  //   }

                  //   const playVideoCheck = setInterval(() => {
                  //     // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                  //     setLoading((loading) => {
                  //       if (!loading) {
                  //         setPlayerTarget((playerTarget) => {
                  //           setTimeout(() => {
                  //             playerTarget.playVideo();
                  //           }, 400);
                  //           return playerTarget;
                  //         });
                  //         clearInterval(playVideoCheck);
                  //       }
                  //       return loading;
                  //     });

                  //   }, 300);
                  // }}
                >
                  <Image
                    w="120px"
                    h="100px"
                    mr={5}
                    boxShadow="0 8px 24px rgb(0, 0, 0, .5)"
                  ></Image>

                  <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <Box
                      fontSize="21px"
                      fontWeight={700}
                      letterSpacing="-1.5px"
                      sx={{
                        // textOverflow: "ellipsis", //overflow but just simply
                        // overflow: "hidden",
                        // whiteSpace: "nowrap",
                        maxHeight: "65px",
                        color: "rgb(240, 240, 240)",
                        height: "100%",
                        width: "100%",
                        flex: 1,
                        // WebkitLineClamp: 2,
                        // WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    ></Box>

                    <Box
                      sx={{
                        fontWeight: "700",
                        fontSize: "13px",
                        backgroundColor: "#f2f2f2",
                        width: "82px",
                        borderRadius: "20px",
                        padding: "3px 3px",
                        textAlign: "center",
                        // marginLeft: "auto",
                        // marginTop: "2px",
                      }}
                    >
                      <Box mt="1px">PLAYLIST</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  flex: "1 0 27%",
                  // display: "flex",
                  // flex: "1 0 30%",
                  // height: "260px",
                  //   alignSelf: "start",
                  minWidth: "300px",
                  visibility: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // minWidth: `calc((100vh - ${sidebarwidth}px) / 3 )`,
                    padding: "20px",
                    // border: "1px solid white",
                    borderRadius: "8px",
                    // padding: "20px",
                    backgroundColor: "rgb(59, 59, 59)",
                    // transition: "all .9 ease",
                    WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                    transition: "ease 0.3s",
                  }}
                  _hover={{
                    backgroundColor: "rgb(99, 99, 99)",
                    cursor: "pointer",
                    transform: "scale(1.02)",
                    transition: "ease 0.3s",
                  }}
                  _active={{
                    transform: "scale(0.99)",
                  }}
                  // onClick={() => {
                  //   dispatch(
                  //     setCurrentSong(searchResults[i].id.videoId)
                  //   );
                  //   //BOOKMARK playerTarget.seekTo(val)
                  //   if (
                  //     currentVideo === searchResults[0].id.videoId
                  //   ) {
                  //     playerTarget.seekTo(0);
                  //     playerTarget.playVideo();
                  //     return;
                  //   }

                  //   const playVideoCheck = setInterval(() => {
                  //     // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                  //     setLoading((loading) => {
                  //       if (!loading) {
                  //         setPlayerTarget((playerTarget) => {
                  //           setTimeout(() => {
                  //             playerTarget.playVideo();
                  //           }, 400);
                  //           return playerTarget;
                  //         });
                  //         clearInterval(playVideoCheck);
                  //       }
                  //       return loading;
                  //     });

                  //   }, 300);
                  // }}
                >
                  <Image
                    w="120px"
                    h="100px"
                    mr={5}
                    boxShadow="0 8px 24px rgb(0, 0, 0, .5)"
                  ></Image>

                  <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    flex={1}
                  >
                    <Box
                      fontSize="21px"
                      fontWeight={700}
                      letterSpacing="-1.5px"
                      sx={{
                        // textOverflow: "ellipsis", //overflow but just simply
                        // overflow: "hidden",
                        // whiteSpace: "nowrap",
                        maxHeight: "65px",
                        color: "rgb(240, 240, 240)",
                        height: "100%",
                        width: "100%",
                        flex: 1,
                        // WebkitLineClamp: 2,
                        // WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    ></Box>

                    <Box
                      sx={{
                        fontWeight: "700",
                        fontSize: "13px",
                        backgroundColor: "#f2f2f2",
                        width: "82px",
                        borderRadius: "20px",
                        padding: "3px 3px",
                        textAlign: "center",
                        // marginLeft: "auto",
                        // marginTop: "2px",
                      }}
                    >
                      <Box mt="1px">PLAYLIST</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
export default WelcomeBack;
