import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setAlreadyListened,
  setCurrentSong,
  setIndex,
  setQueue,
} from "../../store/player";

const RecentlyPlayed = ({
  playerTarget,
  setPlayerTarget,
  loading,
  setLoading,
  visualLoading,
  setVisualLoading,
}) => {
  const playlists = useSelector((state) => state.playlist.list);
  const currentVideo = useSelector((state) => state.player.song);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  // edge case of not enough songs, then no worries it will populate with less songs than 12
  // get the first song of each playlist
  // get first and last song of every playlist if length is > 1
  // see if you can just add all songs
  let oneFromEachPlaylist = [];
  for (let k of playlists.slice(0).reverse()) {
    oneFromEachPlaylist = [
      ...oneFromEachPlaylist,
      ...k.songs.map((obj) => obj.link),
    ];
  }
  let summ = 1;
  let twelve = [];
  for (let b of Array(12)) {
    twelve.push(oneFromEachPlaylist[summ % oneFromEachPlaylist.length]);
    oneFromEachPlaylist.splice([summ % oneFromEachPlaylist.length], 1);
    summ += 21;
  }
  console.log(twelve, "ALL SONGS");
  //   = playlists.map((list) => {
  //     if (list.songs.length > 0) return { ...list, link: list.songs[0].link };
  //     else return null;
  //   });
  const [noembedDatas, setNoembedDatas] = useState([]);
  useEffect(() => {
    const fetchNoembedData = async () => {
      setPlaylistLoading(true);
      let noembedArr = [];
      for (const ele of twelve) {
        //
        if (ele == null) continue;
        let res = await fetch(`https://noembed.com/embed?url=${ele}`);
        let data = await res.json();
        if (!data.hasOwnProperty("error"))
          noembedArr.push([
            data,
            "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
          ]);
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
      <Box
        // height={noembedDatas.length === 0 ? "100vw" : ""}
        width="100%"
        mt="60px"
        mr="auto"
        mb="93px"
        zIndex={10}
        position="relative"
      >
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            // flexWrap: "wrap",
          }}
        > */}
        <Text
          // sx={{ flex: "1 0 15%" }}
          color="white"
          fontWeight="700"
          fontSize="28px"
          mb="15px"
          letterSpacing="-1px"
          zIndex={10}
        >
          Recently Played
        </Text>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          zIndex={10}
        >
          {noembedDatas.slice(0, 12).map((el, i) => {
            // return <div>{el.title}</div>;
            return (
              <Box
                style={{
                  flex: "1 0 20%",
                  // display: "flex",
                  // flex: "1 0 30%",
                  // height: "260px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDir: "column",
                    //   height: "270px",
                    //   width: "300px",
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
                  //   onClick={() => {
                  //     dispatch(
                  //       setCurrentSong(searchResults[i].id.videoId)
                  //     );
                  //     //BOOKMARK playerTarget.seekTo(val)
                  //     if (currentVideo === searchResults[0].id.videoId) {
                  //       playerTarget.seekTo(0);
                  //       playerTarget.playVideo();
                  //       return;
                  //     }

                  //     const playVideoCheck = setInterval(() => {
                  //       // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william

                  //       setLoading((loading) => {
                  //         if (!loading) {
                  //           setPlayerTarget((playerTarget) => {
                  //             setTimeout(() => {
                  //               playerTarget.playVideo();
                  //             }, 400);
                  //             return playerTarget;
                  //           });
                  //           clearInterval(playVideoCheck);
                  //         }
                  //         return loading;
                  //       });

                  //       // playerTarget.playVideo();
                  //     }, 300);
                  //   }}
                  onClick={() => {
                    dispatch(
                      setCurrentSong(
                        el[0].url.replace(
                          "https://www.youtube.com/watch?v=",
                          ""
                        )
                      )
                    );

                    dispatch(setQueue(noembedDatas));
                    dispatch(setIndex(i));
                    dispatch(setAlreadyListened([i])); // everything resets if you click on a playlist song, or search song
                    // dispatch(setCurrentSong(ele.id.videoId));
                    if (
                      currentVideo ===
                      el[0].url.replace("https://www.youtube.com/watch?v=", "")
                    ) {
                      playerTarget.seekTo(0);
                      playerTarget.playVideo();
                      return;
                    }
                    // if (currentVideo === ele.id.videoId) {
                    //   playerTarget.seekTo(0);
                    //   return;
                    // }
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
                    //   w="120px"
                    //   h="100px"

                    w="100%"
                    minW="150px"
                    mb={5}
                    mr={5}
                    // borderRadius={10}
                    boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                    src={el[0].thumbnail_url}
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
                        maxW: "170px",
                        minW: "170px",
                      }}
                    >
                      {noembedDatas.length > 0 &&
                        el[0].title
                          .replace(
                            el[0].author_name
                              .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                              .replace("VEVO", "") + "- ",
                            ""
                          )
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
                          .replace(/「Audio」/, "")}
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
                          el[0].author_name
                            .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                            .replace("VEVO", "")
                            .replace("- Topic", "")}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
export default RecentlyPlayed;
