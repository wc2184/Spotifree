import { MenuGroup, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const AddToPlaylist = () => {
  const playlist = useSelector((state) => state.playlist.list);
  const currentSong = useSelector((state) => state.player.song);
  console.log("render");
  return (
    <>
      <Portal>
        <MenuList
          border="2px solid gray"
          maxWidth={260}
          backgroundColor="#f2f2f2"
          zIndex="dropdown"
        >
          <MenuGroup userSelect="none" ml={3} title="Choose a Playlist">
            {playlist
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
                    maxWidth="260px"
                    overflow="hidden"
                    // icon={null}
                    command={
                      list.songs.some((arr) => arr.link.includes(currentSong))
                        ? "✔️"
                        : null
                    }
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
