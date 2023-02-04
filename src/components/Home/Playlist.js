import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setAlreadyListened,
  setCurrentSong,
  setIndex,
  setQueue,
} from "../../store/player";
import { getCurrentPlaylist, setPlaylist } from "../../store/playlist";
import "./Playlist.css";

const Playlist = ({
  playerTarget,
  setPlayerTarget,
  loading,
  setLoading,
  visualLoading,
  setVisualLoading,
}) => {
  const playlists = useSelector((state) => state.playlist.list);
  const currentList = useSelector((state) => state.playlist.currentList);
  const songs = useSelector((state) => state.playlist.songs);
  const currentVideo = useSelector((state) => state.player.song);
  const alreadyListened = useSelector((state) => state.player.alreadyListened);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [playlistLoading, setPlaylistLoading] = useState(true);
  useEffect(() => {
    setPlaylistLoading(true);
    dispatch(getCurrentPlaylist(id));
  }, [id, playlists]);

  const [noembedDatas, setNoembedDatas] = useState([]);
  useEffect(() => {
    const fetchNoembedData = async () => {
      setPlaylistLoading(true);
      let noembedArr = [];
      for (const ele of songs) {
        //

        let res = await fetch(`https://noembed.com/embed?url=${ele.link}`);
        let data = await res.json();
        if (!data.hasOwnProperty("error")) noembedArr.push([data, ele.time]);
      }

      //
      setNoembedDatas(noembedArr);
      setPlaylistLoading(false);

      // setSubmittedNoembed(true);
      // dispatch(setSearchLoading(false));
    };
    if (currentList && id == currentList.uniqID) {
      fetchNoembedData();
    }
    console.log(noembedDatas, "noembed");
  }, [songs]);

  return (
    <Box mb="93px" mt="64px" color="white">
      <Box display="flex" gap={5} alignItems="flex-end" pb={6}>
        {!playlistLoading && currentList && (
          <Box
            sx={{
              // border: "1px solid white",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "rgb(62, 62, 62)",
              // transition: "all .9 ease",
              WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
              transition: "ease 0.3s",
              position: "relative",
              marginRight: "10px",
            }}
            _hover={{
              backgroundColor: "rgb(83, 83, 83)",
              cursor: "pointer",
              transform: "scale(1.02)",
              transition: "ease 0.3s",
            }}
            _active={{
              transform: "scale(0.99)",
            }}
            onClick={() => {
              dispatch(
                setCurrentSong(
                  noembedDatas[0][0].url.replace(
                    "https://www.youtube.com/watch?v=",
                    ""
                  )
                )
              );

              dispatch(setQueue(noembedDatas));
              dispatch(setIndex(0));
              dispatch(setAlreadyListened([0])); // everything resets if you click on a playlist song, or search song
              // dispatch(setCurrentSong(ele.id.videoId));

              if (
                currentVideo ===
                noembedDatas[0][0].url.replace(
                  "https://www.youtube.com/watch?v=",
                  ""
                )
              ) {
                playerTarget.seekTo(0);
                playerTarget.playVideo();
                return;
              }
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
              w="300px"
              h="230px"
              boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
              src={
                noembedDatas.length > 0
                  ? noembedDatas[0][0].thumbnail_url
                  : "https://static.vecteezy.com/system/resources/previews/007/188/970/original/abstract-blur-background-with-pastel-color-free-vector.jpg"
              }
            ></Image>
            <Box
              className="playButtonPlaylist"
              sx={{
                width: "48px",
                height: "48px",
                borderRadius: "48px",
                backgroundColor: "rgb(30, 215, 96)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "10px",
                boxShadow: "0px 8px 24px rgb(0, 0, 0, .7)",
                position: "absolute",
                right: "3",
                bottom: "5",
              }}
              _hover={{
                transform: "scale(1.01)",
                backgroundColor: "rgb(50, 235, 116)",
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
        )}
        {!playlistLoading && currentList && id == currentList.uniqID && (
          <Box
            alignSelf="stretch"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
          >
            <Box
              flex={1}
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Text mt={3} fontSize={14}>
                PLAYLIST
              </Text>
              <Text
                ml="-5px"
                letterSpacing="-2px"
                fontSize="7xl"
                fontWeight={700}
              >
                {currentList.name}
              </Text>
            </Box>
            <Box
              flex={1}
              display="flex"
              justifyContent="flex-end"
              flexDir="column"
            >
              <Text mb={2} color="#b3b3b3">
                Description here
              </Text>
              <Text mb={5}>{noembedDatas.length} songs</Text>
            </Box>
          </Box>
        )}
      </Box>
      {!playlistLoading && currentList && id == currentList.uniqID && (
        <>
          <Flex>
            <Box
              p="9px"
              color="#b3b3b3"
              display="flex"
              alignItems="center"
              ml={1}
              mr={1}
              width="10px"
            >
              #
            </Box>
            <Box
              p="9px"
              color="#b3b3b3"
              display="flex"
              alignItems="center"
              ml={1}
              mr={5}
              fontSize="13px"
            >
              TITLE
            </Box>
            <Box fontSize="13px" ml="auto" color="#b3b3b3" mt={2} mr="19px">
              DATE ADDED
            </Box>
          </Flex>
          <Divider sx={{ width: "auto" }} ml={2} mb="2" mr="3px" />
        </>
      )}
      {!playlistLoading &&
      currentList &&
      id == currentList.uniqID &&
      noembedDatas.length == 0 ? (
        <div
          style={{ textAlign: "center", marginTop: "30px", fontSize: "26px" }}
        >
          {" "}
          You have no songs. Add songs by clicking the arrow on the bottom left
          of the page!
        </div>
      ) : null}
      {!playlistLoading &&
        currentList &&
        id == currentList.uniqID &&
        noembedDatas.slice(0).map((arrr, i) => {
          let [ele, time] = arrr;
          let dateCreated = new Date(time).toDateString().split(" ");
          dateCreated[2] += ",";
          dateCreated = dateCreated.slice(1);
          dateCreated = dateCreated.join(" ");
          return (
            <Box
              _hover={{
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
                    ele.url.replace("https://www.youtube.com/watch?v=", "")
                  )
                );

                dispatch(setQueue(noembedDatas));
                dispatch(setIndex(i));
                dispatch(setAlreadyListened([i])); // everything resets if you click on a playlist song, or search song
                // dispatch(setCurrentSong(ele.id.videoId));
                if (
                  currentVideo ===
                  ele.url.replace("https://www.youtube.com/watch?v=", "")
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
              //end
            >
              <Box
                color="#b3b3b3"
                display="flex"
                alignItems="center"
                ml={1}
                mr={5}
              >
                {i + 1}
              </Box>
              <Image
                mt="5px"
                w="50px"
                h="40px"
                mb={5}
                mr="14px"
                boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                src={noembedDatas.length > 0 && ele.thumbnail_url}
              ></Image>

              <Box>
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingTop: "1px",
                  }}
                  // dangerouslySetInnerHTML={{
                  //   __html:
                  //     noembedDatas.length > 0 &&
                  //     ele.title.replace(
                  //       ele.author_name
                  //         .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  //         .replace("VEVO", "") + "- ",
                  //       ""
                  //     ),
                  // }}
                >
                  {noembedDatas.length > 0 &&
                    ele.title.replace(
                      ele.author_name
                        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                        .replace("VEVO", "") + "- ",
                      ""
                    )}
                </Box>
                <Box
                  sx={{
                    color: "rgb(179, 179, 179)",
                  }}
                  // dangerouslySetInnerHTML={{
                  //   __html:
                  //     noembedDatas.length > 0 &&
                  //     ele.author_name
                  //       .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                  //       .replace("VEVO", ""),
                  // }}
                >
                  {noembedDatas.length > 0 &&
                    ele.author_name
                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                      .replace("VEVO", "")}
                </Box>
              </Box>
              <Box ml="auto" color="#b3b3b3" mt={3} mr="3px">
                {dateCreated}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};
export default Playlist;
