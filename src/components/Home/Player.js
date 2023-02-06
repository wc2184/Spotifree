import {
  Box,
  Button,
  Icon,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Youtube from "react-youtube";
import debounce from "lodash/debounce";
import "./Player.css";
import { BsPlayFill } from "react-icons/bs";
import { IoMdPause } from "react-icons/io";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlreadyListened,
  setCurrentSong,
  setIndex,
  setRepeat,
  setShuffle,
} from "../../store/player";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { ImShuffle } from "react-icons/im";
import { TbRepeat, TbRepeatOff, TbRepeatOnce } from "react-icons/tb";
import { AiOutlineSound } from "react-icons/ai";
import MyTooltip from "./MyTooltip";

const Player = ({
  playerTarget,
  setPlayerTarget,
  loading,
  setLoading,
  visualLoading,
  setVisualLoading,
}) => {
  //   const [currentVideo, setCurrentVideo] = useState("i1nindf1meE");
  //   const [currentVideo, setCurrentVideo] = useState("DK_0jXPuIr0");
  //   const [currentVideo, setCurrentVideo] = useState("DcDbKDAb7go");
  //   const [currentVideo, setCurrentVideo] = useState("bsgBUM2Mnsw");
  // changmo
  const [volume, setVolume] = useState(100);
  const [disabledForwardBack, setDisabledForwardBack] = useState(false);
  // const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();
  const {
    song: currentVideo,
    queue,
    index: currentIndex,
    alreadyListened,
    shuffle,
    repeat,
  } = useSelector((state) => state.player);

  useEffect(() => {
    console.log(currentVideo, "this is current video");
    console.log(queue, "this the queue");
    console.log(currentIndex, "this is index");
    console.log(alreadyListened, "this is already listened");
  }, [currentVideo]);
  //
  const pressSpaceListener = (e) => {
    // e.preventDefault();

    if (
      (e.key == " " && e.target == document.body) ||
      e.target.nodeName == "A"
    ) {
      e.preventDefault();
    }

    if (e.key == " " && e.target.nodeName !== "INPUT") {
      let playbutton = document.querySelector(".triangleplayerbutton");
      playbutton.click();

      //   playerTarget.playVideo();
      //   playerTarget.pauseVideo();
    }
    if (e.key == "/" && e.target.nodeName !== "INPUT") {
      let inputArea = document.querySelector(".searchbartarget");

      setTimeout(() => {
        inputArea.focus();
        inputArea.select();
      }, 100);
    }
    // if (e.key == "/" && e.target.nodeName !== "INPUT") {
    //   let inputArea = document.querySelector(".searchbartarget");
    //   let stored = inputArea.value;
    //   inputArea.focus();

    //   setTimeout(() => {
    //     inputArea.value = stored;
    //     inputArea.select();
    //   }, 0);
    // }
  };
  useEffect(() => {
    document.addEventListener("keydown", pressSpaceListener);

    return () => {
      document.removeEventListener("keydown", pressSpaceListener);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("currentSong") === null) {
      dispatch(setCurrentSong("FkxEE7wZ83c"));
    } else {
      dispatch(setCurrentSong(localStorage.getItem("currentSong")));
    }
    // default song is michael jackson
  }, [dispatch]);
  //   const [currentVideo, setCurrentVideo] = useState("AuVMFXOjsNU");
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(-1);
  const [videoDetails, setVideoDetails] = useState(null);

  const delaySeek = useCallback(
    debounce((val) => {
      // playerTarget.mute();
    }, 0)
  );
  const opts = {
    height: "390",
    width: "640",
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    // },
  };
  //
  let iframeWindow;

  var lastTimeUpdate = 0;
  function currTimeListener(event) {
    let touched = false;
    if (event.source === iframeWindow) {
      var e = JSON.parse(event.data);

      if (e.event === "infoDelivery" && e.info && e.info.currentTime) {
        var time = Math.floor(e.info.currentTime);

        if (time !== lastTimeUpdate) {
          lastTimeUpdate = time;
          //
          setCurrentTime(time);
        }
        //
        setCurrentStatus(playerTarget.getPlayerState());
        // setVolume(playerTarget.getVolume());
        // playerTarget.setVolume(volume);

        if (playerTarget.getPlayerState() === 0) {
          // when video ends set to 0
          setCurrentStatus(-1);
          setCurrentTime(0);
        }
      }
    }
  }
  //   if (playerTarget)
  useEffect(() => {
    iframeWindow =
      playerTarget &&
      playerTarget.getIframe() &&
      playerTarget.getIframe().contentWindow;
    window.addEventListener("message", currTimeListener);

    return () => {
      window.removeEventListener("message", currTimeListener);
    };
  }, [playerTarget]);

  useEffect(() => {
    if (currentVideo !== "") {
      setLoading(true);
      setVisualLoading(true);
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAJ2XLMnSvimbXpCBpUnoKr4RKZr4VwlGY&part=snippet&id=${currentVideo}`
      )
        .then((res) => res.json())
        .then((data) => {
          //
          setVideoDetails(data.items[0].snippet);
          setCurrentStatus(-1);
        });
    }
  }, [currentVideo]);
  //
  //
  //
  //

  return (
    <>
      <div style={{ display: "none" }}>{currentVideo}</div>
      <Youtube
        // videoId="i1nindf1meE"
        videoId={currentVideo}
        iframeClassName="reactplayer"
        id={currentVideo}
        style={{ width: "0px", height: "0px" }}
        opts={opts}
        onReady={(e) => {
          //
          //

          setTimeout(() => {
            setLoading(false);
            // setVisualLoading(false);
          }, 700);
          setTimeout(() => {
            setVisualLoading(false);
          }, 2000);

          setPlayerTarget(e.target);
          setCurrentTime(e.target.getCurrentTime());
          setMaxTime(e.target.getDuration());
          setVolume((vol) => {
            e.target.setVolume(vol);
            return vol;
            // set the volume
          });
          console.log(alreadyListened, "already listened latest");

          localStorage.setItem("currentSong", currentVideo);
          // e.target.setVolume(100);
        }}
        onEnd={() => {
          if (repeat == 2) {
            playerTarget.seekTo(0);
            playerTarget.playVideo();
            return;
          }
          let newIndex;
          let resetAlreadyListened = false;
          if (currentIndex == queue.length - 1) {
            newIndex = 0;
            playerTarget.seekTo(0);
            playerTarget.playVideo();
          } else {
            newIndex = currentIndex + 1;
            if (shuffle) {
              let newNum = Math.floor(Math.random() * queue.length);

              console.log(newNum, "shuffle num");
              while (alreadyListened.includes(newNum)) {
                if (queue.length == 1) {
                  // the case where theres only 1 song in the playlist

                  newIndex = 0;
                  break;
                }
                if (alreadyListened.length == queue.length) {
                  // means every song has been listened to
                  // just make one different from current and reset already Listened
                  while (newNum == currentIndex) {
                    newNum = Math.floor(Math.random() * queue.length);
                  }
                  resetAlreadyListened = true;
                  break;
                }
                newNum = Math.floor(Math.random() * queue.length);
                console.log(newNum, "REROLL shuffle num");
              }
              console.log(newNum, "UNIQUE shuffle numm");
              newIndex = newNum;
            }
          }

          dispatch(setIndex(newIndex));
          dispatch(
            resetAlreadyListened
              ? setAlreadyListened([...new Set([newIndex])])
              : setAlreadyListened([...new Set([...alreadyListened, newIndex])])
          );

          dispatch(
            setCurrentSong(
              queue[newIndex][0].url.replace(
                "https://www.youtube.com/watch?v=",
                ""
              )
            )
          );
          if (
            (repeat == 0 && alreadyListened.length == queue.length) ||
            (!shuffle && repeat == 0 && currentIndex == queue.length - 1)
          )
            return;
          // if repeat is off AND THE ENTIRE PLAYLIST IS DONE alreadyListened.length == queue.length || !shuffle && (currentIndex == queue.length - 1) then don't run the next lines FIX THIS
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
          }, 300);
        }}
      />
      <div className="player-wrapper">
        {/* player starts */}
        <Box className="detailsFlexPortion">
          {/* get youtube info, title, artist, and cover picture */}
          <Box className="detailsContainer">
            <Image
              boxSize="56px"
              src={videoDetails && videoDetails.thumbnails.default.url}
            ></Image>
            <Box style={{ margin: "0 14px 0 14px" }}>
              {/* middle portion */}
              <Text color="white" fontSize="14.5px">
                {videoDetails &&
                  videoDetails.title.replace(
                    videoDetails.channelTitle
                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                      .replace("VEVO", "") + "- ",
                    ""
                  )}
              </Text>
              <Text fontWeight={300} fontSize="12px" color="rgb(179, 179, 179)">
                {videoDetails &&
                  (videoDetails.channelTitle.includes("VEVO")
                    ? videoDetails.channelTitle
                        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                        .replace("VEVO", "")
                    : videoDetails.channelTitle)}
              </Text>
            </Box>

            {/* heart icon & add to playlist */}

            <MyTooltip text="Like this Song">
              <Box>
                <Icon
                  fontSize={22}
                  color="rgb(186,186,186)"
                  as={AiOutlineHeart}
                  _active={{
                    color: "white",
                    transform: "scale(1.1)",
                    animation: "shake 0.5s",
                    animationIterationCount: "infinite",
                  }}
                  _hover={{
                    color: "white",
                    cursor: "pointer",
                  }}
                ></Icon>
              </Box>
            </MyTooltip>

            <MyTooltip text="Add to Playlist">
              <Box mr={10}>
                <Icon
                  ml="7px"
                  fontSize={22}
                  color="rgb(186,186,186)"
                  as={AiOutlinePlus}
                  _active={{
                    color: "white",
                    transform: "scale(1.1)",
                    animation: "shake 0.5s",
                    animationIterationCount: "infinite",
                  }}
                  _hover={{
                    color: "white",
                    cursor: "pointer",
                  }}
                ></Icon>
              </Box>
            </MyTooltip>
          </Box>
        </Box>
        <Box className="playerFlexPortion">
          <Box className="tophalfplayer">
            {/* top half */}
            <Box
              as={ImShuffle}
              style={{ width: "21px", height: "23px" }}
              preserveAspectRatio="none"
              color={shuffle ? "lightgreen" : "rgb(216, 216, 216)"}
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
                filter: "brightness(1.3)",
              }}
              _active={{
                //   transform: "translateY(1px)",
                transform: "scale(0.99) translateY(1px)",
                userSelect: "none",
              }}
              onClick={() => {
                dispatch(setShuffle(!shuffle));
              }}
            />
            <Box
              as={FaStepBackward}
              style={{ width: "28px", height: "23px" }}
              preserveAspectRatio="none"
              color="rgb(186, 186, 186)"
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
                color: "rgb(226, 226, 226)",
              }}
              _active={{
                //   transform: "translateY(1px)",
                transform: "scale(0.99) translateY(1px)",
                userSelect: "none",
              }}
              onClick={() => {
                //FastBackward
                // currentVideo is the curr song
                // queue, currentIndex, alreadyListened
                if (disabledForwardBack) return;
                setDisabledForwardBack(true);
                setTimeout(() => {
                  setDisabledForwardBack(false);
                }, 650);
                let newIndex;
                let resetAlreadyListened = false;
                if (currentIndex == 0 && !shuffle) {
                  newIndex = 0;
                  playerTarget.seekTo(0);
                  playerTarget.playVideo();
                  return;
                } else {
                  newIndex = currentIndex - 1;
                  if (shuffle) {
                    if (alreadyListened.length > 1) {
                      console.log(
                        alreadyListened.at(-2),
                        "shuffle backward activated element"
                      );
                      newIndex = alreadyListened.at(-2);
                      resetAlreadyListened = true;
                    } else {
                      let newNum = Math.floor(Math.random() * queue.length);
                      while (newNum == currentIndex) {
                        newNum = Math.floor(Math.random() * queue.length);
                      }
                      resetAlreadyListened = true;
                      newIndex = newNum;
                      console.log(
                        currentIndex,
                        newNum,
                        newIndex,
                        alreadyListened,
                        "inside back thing"
                      );
                    }
                  }
                }

                dispatch(setIndex(newIndex));
                dispatch(
                  resetAlreadyListened
                    ? setAlreadyListened(
                        alreadyListened.length > 1
                          ? [...new Set([...alreadyListened.slice(0, -1)])]
                          : [...new Set([newIndex])]
                      )
                    : setAlreadyListened([
                        ...new Set([...alreadyListened, newIndex]),
                      ])
                );
                dispatch(
                  setCurrentSong(
                    queue[newIndex][0].url.replace(
                      "https://www.youtube.com/watch?v=",
                      ""
                    )
                  )
                );
                const pauseFix = setInterval(() => {
                  console.log("((checkking");
                  let playbutton = document.querySelector("#playbutton");
                  let pausebutton = document.querySelector("#pausebutton");

                  console.log(playbutton, "nope");
                  if (playbutton) {
                    console.log("found it", playbutton);
                    setTimeout(() => {
                      playbutton = document.querySelector("#playbutton");
                      playbutton.click();
                    }, 600);

                    clearInterval(pauseFix);
                    console.log("((RANN BOIII --------");
                  }

                  if (pausebutton) {
                    clearInterval(pauseFix);
                    console.log("((CANCEL CUZ NO NEED --------");
                    return;
                  }
                  return playerTarget;
                }, 200);
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
                }, 100);
              }}
            />
            {(playerTarget && currentStatus === 2) || currentStatus === -1 ? (
              <>
                <Button
                  onClick={() => {
                    playerTarget.playVideo();
                  }}
                  sx={{
                    borderRadius: "32px",
                    width: "32px",
                    // padding: "0",
                  }}
                  _active={{
                    //   transform: "translateY(1px)",
                    transform: "scale(1.05) translateY(3px)",
                  }}
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                  className="triangleplayerbutton"
                  id={visualLoading || loading ? "loading" : "playbutton"}
                >
                  <Box pl="2px">
                    {visualLoading || loading ? (
                      <Spinner
                        sx={{
                          position: "absolute",
                          bottom: "8px",
                          left: "8px",
                        }}
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="green.500"
                        size="md"
                      />
                    ) : (
                      <BsPlayFill size={28} sx={{ margin: "auto" }} />
                    )}
                  </Box>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  playerTarget.pauseVideo();
                }}
                sx={{ borderRadius: "32px", width: "32px", padding: "0" }}
                _active={{
                  //   transform: "translateY(1px)",
                  transform: "scale(1.05)  translateY(3px)",
                }}
                className="triangleplayerbutton"
                id="pausebutton"
              >
                <Box>
                  <IoMdPause size={20} />
                </Box>
              </Button>
            )}
            <Box
              as={FaStepForward}
              style={{ width: "28px", height: "23px" }}
              preserveAspectRatio="none"
              color="rgb(186, 186, 186)"
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
                color: "rgb(226, 226, 226)",
              }}
              _active={{
                //   transform: "translateY(1px)",
                transform: "scale(0.99) translateY(1px)",
                userSelect: "none",
              }}
              onClick={() => {
                // FastFoward
                // currentVideo is the curr song
                // queue, currentIndex, alreadyListened
                // disableChange;
                console.log(playerTarget.getPlayerState(), "stat B444");
                if (disabledForwardBack) return;
                setDisabledForwardBack(true);
                setTimeout(() => {
                  setDisabledForwardBack(false);
                }, 650);
                let newIndex;
                let resetAlreadyListened = false;
                if (currentIndex == queue.length - 1) {
                  newIndex = 0;
                  playerTarget.seekTo(0);
                  playerTarget.playVideo();
                } else {
                  newIndex = currentIndex + 1;
                  if (shuffle) {
                    let newNum = Math.floor(Math.random() * queue.length);

                    console.log(newNum, "shuffle num");
                    while (alreadyListened.includes(newNum)) {
                      if (queue.length == 1) {
                        // the case where theres only 1 song in the playlist

                        newIndex = 0;
                        break;
                      }
                      if (alreadyListened.length == queue.length) {
                        // means every song has been listened to
                        // just make one different from current and reset already Listened
                        while (newNum == currentIndex) {
                          newNum = Math.floor(Math.random() * queue.length);
                        }
                        resetAlreadyListened = true;
                        break;
                      }
                      newNum = Math.floor(Math.random() * queue.length);
                      console.log(newNum, "REROLL shuffle num");
                    }
                    console.log(newNum, "UNIQUE shuffle numm");
                    newIndex = newNum;
                  }
                }

                dispatch(setIndex(newIndex));
                dispatch(
                  resetAlreadyListened
                    ? setAlreadyListened([...new Set([newIndex])])
                    : setAlreadyListened([
                        ...new Set([...alreadyListened, newIndex]),
                      ])
                );
                console.log(queue, newIndex, "pew");
                dispatch(
                  setCurrentSong(
                    queue[newIndex][0].url.replace(
                      "https://www.youtube.com/watch?v=",
                      ""
                    )
                  )
                );
                const pauseFix = setInterval(() => {
                  let playbutton = document.querySelector("#playbutton");
                  let pausebutton = document.querySelector("#pausebutton");
                  if (playbutton) {
                    setTimeout(() => {
                      playbutton = document.querySelector("#playbutton");
                      playbutton.click();
                    }, 600);

                    clearInterval(pauseFix);
                    return;
                  }

                  if (pausebutton) {
                    clearInterval(pauseFix);
                    return;
                  }
                }, 200);

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
                }, 100);
              }}
            />
            <Box
              as={repeat == 0 || repeat == 1 ? TbRepeat : TbRepeatOnce}
              style={{ width: "23px", height: "23px" }}
              preserveAspectRatio="none"
              color={
                [1, 2].includes(repeat) ? "lightgreen" : "rgb(216, 216, 216)"
              }
              _hover={{
                transform: "scale(1.05)",
                cursor: "pointer",
                filter: "brightness(1.3)",
              }}
              _active={{
                //   transform: "translateY(1px)",
                transform: "scale(0.99) translateY(1px)",
                userSelect: "none",
              }}
              onClick={() => {
                dispatch(setRepeat());
                console.log(repeat, "repeat state here");
              }}
            />
          </Box>
          <Box className="bottomhalfplayer">
            {playerTarget ? (
              <>
                <div className="coreplayer" style={{ color: "white" }}>
                  <div
                    className="noselect"
                    style={{
                      marginRight: "10px",
                      fontSize: "12px",
                      paddingTop: "1px",
                      color: "rgb(179, 179, 179)",
                    }}
                  >
                    {new Date(currentTime * 1000)
                      .toISOString()
                      .substring(14, 19)}
                  </div>
                  <Slider
                    aria-label="slider-ex-1"
                    //   value={(currentTime / maxTime) * 100}
                    value={currentTime}
                    min={0}
                    max={maxTime}
                    focusThumbOnChange={false}
                    onChange={
                      (val) => {
                        //   playerTarget.mute();
                        //   delaySeek(e);
                        playerTarget.seekTo(val);
                        playerTarget.unMute();
                      }
                      //   (val) => {
                      //   playerTarget.mute();
                      //   playerTarget.seekTo((val / 100) * maxTime);
                      //   playerTarget.unMute();
                      // }
                    }
                    step={0.5}
                  >
                    <SliderTrack
                      _hover={{
                        boxSize: 1,
                      }}
                    >
                      <SliderFilledTrack
                        sx={{ backgroundColor: "rgb(29, 185, 84)" }}
                      />
                    </SliderTrack>
                    <SliderThumb
                      boxSize={1}
                      _active={{
                        boxSize: 3,
                      }}
                      _hover={{
                        boxSize: 3,
                      }}
                    />
                  </Slider>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontSize: "12px",
                      paddingTop: "1px",
                      color: "rgb(179, 179, 179)",
                    }}
                    className="noselect"
                  >
                    {new Date(maxTime * 1000).toISOString().substring(14, 19)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="coreplayer" style={{ color: "white" }}>
                  <div
                    className="noselect"
                    style={{
                      marginRight: "15px",
                      fontSize: "10px",
                      paddingTop: "1px",
                    }}
                  >
                    {/* {new Date(0 * 1000).toISOString().substring(14, 19)} */}
                    -:-
                  </div>
                  <Slider
                    aria-label="slider-ex-1"
                    //   value={(currentTime / maxTime) * 100}
                    value={currentTime}
                    min={0}
                    max={maxTime}
                    focusThumbOnChange={false}
                    onChange={
                      (val) => {
                        //   playerTarget.mute();
                        //   delaySeek(e);
                        playerTarget.seekTo(val);
                        playerTarget.unMute();
                      }
                      //   (val) => {
                      //   playerTarget.mute();
                      //   playerTarget.seekTo((val / 100) * maxTime);
                      //   playerTarget.unMute();
                      // }
                    }
                    step={1}
                  >
                    <SliderTrack
                      _hover={{
                        boxSize: 1,
                      }}
                    >
                      <SliderFilledTrack sx={{ backgroundColor: "white" }} />
                    </SliderTrack>
                    <SliderThumb
                      boxSize={1}
                      _active={{
                        boxSize: 3,
                      }}
                      _hover={{
                        boxSize: 3,
                      }}
                    />
                  </Slider>
                  <div
                    style={{
                      marginLeft: "15px",
                      fontSize: "10px",
                      paddingTop: "1px",
                    }}
                    className="noselect"
                  >
                    {/* {new Date(0 * 1000).toISOString().substring(14, 19)} */}
                    -:-
                  </div>
                </div>
              </>
            )}
          </Box>
        </Box>
        <Box className="volumeFlexPortion">
          <AiOutlineSound
            color="rgb(139, 139, 139)"
            fontSize={19}
            style={{ marginRight: "8px" }}
          />
          <Slider
            aria-label="slider-ex-1"
            //   value={(currentTime / maxTime) * 100}
            value={volume}
            min={0}
            max={100}
            focusThumbOnChange={false}
            onChange={
              (val) => {
                //   playerTarget.mute();
                //   delaySeek(e);
                let change = 100 - (100 - val) * 1.4;
                if (val < 40) {
                  change = val / 2;
                }
                if (val == 0) {
                  change = 0;
                }
                if (val > 70) {
                  change = 100;
                }
                playerTarget.setVolume(change);
                //
                //
                setVolume(val);
                // playerTarget.unMute();
              }
              //   (val) => {
              //   playerTarget.mute();
              //   playerTarget.seekTo((val / 100) * maxTime);
              //   playerTarget.unMute();
              // }
            }
            step={1}
            sx={{ width: "20%", marginRight: "20px" }}
          >
            <SliderTrack
              boxSize="6px"
              _hover={
                {
                  // boxSize: 2,
                }
              }
            >
              <SliderFilledTrack
                sx={{
                  backgroundColor: "rgb(72, 171, 83)",
                }}
                _active={{}}
              />
            </SliderTrack>
            <SliderThumb
              boxSize="10px"
              _active={{
                boxSize: "10px",
              }}
              _hover={{
                boxSize: "10px",
              }}
            />
          </Slider>
        </Box>
        {/* player ends */}
      </div>
    </>
  );
};
export default Player;
