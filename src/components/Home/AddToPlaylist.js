import {
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToPlaylist, removeFromPlaylist } from "../../store/playlist";

const AddToPlaylist = ({ redirect = false, song }) => {
  const playlist = useSelector((state) => state.playlist.list);
  let currentSong = useSelector((state) => state.player.song);
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  if (song) {
    currentSong = song;
  }
  return (
    <>
      <Portal>
        <MenuList
          border="2px solid gray"
          maxWidth={270}
          backgroundColor="#f2f2f2"
          zIndex="dropdown"
          position="absolute"
          top={0}
          left={0}
          //   transition="ease 0.2s"
        >
          <MenuGroup userSelect="none" ml={3} title="Choose a Playlist">
            {playlist &&
              playlist
                .slice(0)
                .reverse()
                .map((list) => {
                  return (
                    <MenuItem
                      userSelect="none"
                      backgroundColor="#f2f2f2"
                      _hover={{ backgroundColor: "#c9c9c7" }}
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      maxWidth="270px"
                      overflow="hidden"
                      // icon={null}
                      command={
                        list.songs.some((arr) => arr.link.includes(currentSong))
                          ? "✔️"
                          : null
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(list.uniqID, "uniqIDDD");
                        if (
                          !list.songs.some((arr) =>
                            arr.link.includes(currentSong)
                          )
                        ) {
                          toast({
                            title: "Song added!",
                            description: `Added to ${list.name}`,
                            status: "success",
                            duration: 2500,
                            isClosable: true,
                          });
                          dispatch(addToPlaylist(currentSong, list.uniqID));
                          if (redirect) {
                            history.push(`/playlist/${list.uniqID}`);
                            setTimeout(() => {
                              window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: "smooth",
                              });
                            }, 700);
                          }
                        } else {
                          console.log("running remove");
                          dispatch(
                            removeFromPlaylist(currentSong, list.uniqID)
                          );
                          toast({
                            title: "Song removed.",
                            description: `Removed from ${list.name}`,
                            status: "success",
                            duration: 2500,
                            isClosable: true,
                          });
                        }
                      }}
                    >
                      {list.name}
                    </MenuItem>
                  );
                })}

            {/* <MenuItem
              userSelect="none"
              backgroundColor="#f2f2f2"
              _hover={{ backgroundColor: "#c9c9c7" }}
            >
              test
            </MenuItem>
            <MenuItem
              userSelect="none"
              backgroundColor="#f2f2f2"
              _hover={{ backgroundColor: "#c9c9c7" }}
            >
              test
            </MenuItem> */}
          </MenuGroup>
        </MenuList>
      </Portal>
    </>
  );
};
export default AddToPlaylist;
