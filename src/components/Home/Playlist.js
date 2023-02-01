import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentSong } from "../../store/player";
import { getCurrentPlaylist, setPlaylist } from "../../store/playlist";

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
        if (!data.hasOwnProperty("error")) noembedArr.push(data);
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
  }, [songs]);
  console.log(noembedDatas, "DATAS");
  return (
    <Box mb="93px" mt="64px" color="white">
      <Text fontSize="5xl" fontWeight={700}>
        {!playlistLoading &&
          currentList &&
          id == currentList.uniqID &&
          currentList.name}
      </Text>
      {/* {songs && songs.map((el) => <div>{el.link}</div>)} */}
      {!playlistLoading &&
        currentList &&
        id == currentList.uniqID &&
        noembedDatas.slice(0).map((ele) => {
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
                // dispatch(setCurrentSong(ele.id.videoId));
                if (
                  currentVideo ===
                  ele.url.replace("https://www.youtube.com/watch?v=", "")
                ) {
                  playerTarget.seekTo(0);
                  return;
                }
                // if (currentVideo === ele.id.videoId) {
                //   playerTarget.seekTo(0);
                //   return;
                // }
                const playVideoCheck = setInterval(() => {
                  // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william
                  console.log("hello");
                  setLoading((loading) => {
                    if (!loading) {
                      // setLoading(true);
                      setPlayerTarget((playerTarget) => {
                        setTimeout(() => {
                          console.log("should be player", playerTarget);
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
                  dangerouslySetInnerHTML={{
                    __html:
                      noembedDatas.length > 0 &&
                      ele.title.replace(
                        ele.author_name
                          .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                          .replace("VEVO", "") + "- ",
                        ""
                      ),
                  }}
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
                        .replace("VEVO", ""),
                  }}
                ></Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};
export default Playlist;
