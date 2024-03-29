import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import {
  setAlreadyListened,
  setCurrentSong,
  setIndex,
  setQueue,
} from "../../store/player";
import {
  editLike,
  getCurrentPlaylist,
  removeFromPlaylist,
  setPlaylist,
} from "../../store/playlist";
import "./Playlist.css";
import MyTooltip from "./MyTooltip";
import EditPlaylistModal from "./EditPlaylistModal";

const Liked = ({
  playerTarget,
  setPlayerTarget,
  loading,
  setLoading,
  visualLoading,
  setVisualLoading,
  // playlistLoading,
  // setPlaylistLoading,
}) => {
  // const playlists = useSelector((state) => state.playlist.list);
  const currentList = useSelector((state) => state.playlist.currentList);
  const songs = useSelector((state) => state.playlist.songs);
  const currentVideo = useSelector((state) => state.player.song);
  const alreadyListened = useSelector((state) => state.player.alreadyListened);
  const ref = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: TitleIsOpen,
    onOpen: TitleOnOpen,
    onClose: TitleOnClose,
  } = useDisclosure();
  // useEffect(() => {
  //   setPlaylistLoading(true);
  //   dispatch(getCurrentPlaylist(id));
  // }, [id, playlists]);
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const likes = useSelector((state) => state.playlist.likes);
  const [noembedDatas, setNoembedDatas] = useState([]);
  useEffect(() => {
    const fetchNoembedData = async () => {
      setPlaylistLoading(true);
      let noembedArr = [];
      for (const ele of likes) {
        //

        let res = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ele}`
        );
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

      // setSubmittedNoembed(true);
      // dispatch(setSearchLoading(false));
    };

    fetchNoembedData();
  }, [likes]);

  return (
    <Box mb="93px" mt="64px" color="white">
      <Box
        display="flex"
        backgroundColor="transparent"
        gap={5}
        alignItems="flex-end"
        pb={6}
        className="playlistHeading"
      >
        {!playlistLoading && (
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
              userSelect: "none",
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
                "https://res.cloudinary.com/dkg7lxnj2/image/upload/v1676106493/image_5_zvbqcf.png"
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
        {!playlistLoading && (
          <Box
            alignSelf="stretch"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            zIndex={2}
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
                fontSize="6xl"
                fontWeight={700}
              >
                Liked Songs{" "}
              </Text>
            </Box>
            <Box
              flex={1}
              display="flex"
              justifyContent="flex-end"
              flexDir="column"
            >
              {/*  Description */}
              <Box mb={2} sx={{ display: "inline-block", color: "#b3b3b3" }}>
                Songs that you've "hearted". ❤️
              </Box>

              <Text mb={5}>{noembedDatas.length} songs</Text>
            </Box>
          </Box>
        )}
      </Box>
      {!playlistLoading && (
        <>
          <Flex position="relative" zIndex={2}>
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
      {!playlistLoading && noembedDatas.length == 0 ? (
        <div
          style={{ textAlign: "center", marginTop: "30px", fontSize: "26px" }}
        >
          {" "}
          You have no liked songs. Like songs by clicking the 'heart sign' on
          the bottom left of the page!
        </div>
      ) : null}
      {!playlistLoading &&
        noembedDatas.slice(0).map((arrr, i) => {
          let [ele, time] = arrr;
          let dateCreated = new Date(time).toDateString().split(" ");
          dateCreated[2] += ",";
          dateCreated = dateCreated.slice(1);
          dateCreated = dateCreated.join(" ");
          return (
            <Box
              className="playlistSongBox"
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
                width="10px"
                zIndex="2"
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
                zIndex="2"
              ></Image>

              <Box zIndex={2}>
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
                    ele.title
                      .replace(
                        ele.author_name
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
                      .replace("VEVO", "")
                      .replace("- Topic", "")}
                </Box>
              </Box>

              <Box display="flex" zIndex={2} ml="auto" color="#b3b3b3" mr="3px">
                <Box
                  as={Button}
                  colorScheme="red"
                  alignSelf="center"
                  className="hiddenPlaylistSongDelete"
                  sx={{ visibility: "hidden" }}
                  ref={ref}
                  zIndex={2}
                  mr={5}
                  onClick={(e) => {
                    e.stopPropagation();
                    //
                    dispatch(
                      editLike(
                        ele.url.replace("https://www.youtube.com/watch?v=", ""),
                        true
                      )
                    );

                    toast({
                      title: "Song unliked!",
                      description: `Removed from your Liked Songs!`,
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });

                    // setTimeout(() => {
                    //   setNoembedDatas((prev) => {
                    //     dispatch(setQueue(prev));

                    //     return prev;
                    //   });
                    // }, 1000);
                  }}
                >
                  Unlike
                </Box>
                <Text alignSelf="center">{dateCreated}</Text>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};
export default Liked;
