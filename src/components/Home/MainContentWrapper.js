import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MainContentWrapper = ({
  children,
  sidebarwidth,
  playlistLoading,
  setPlaylistLoading,
  colors,
  hashCode,
}) => {
  //
  // window.onscroll = function () {
  //   window.scrollTo(0, window.scrollY);
  // };
  const currentList = useSelector((state) => state.playlist.currentList);
  const location = useLocation();

  return (
    <div
      style={{
        // width: `calc(100% - ${sidebarwidth}px)`,
        width: `calc(100% - ${sidebarwidth}px)`,
        padding: "20px 100px 20px 20px",
        // maxWidth: `calc(1517px - ${sidebarwidth + 10}px)`,
        // overflowX: "hidden",
        minHeight: "100vh",

        // backgroundColor: "rgb(29, 29, 29)", //* UNCOMMENT THIS AFTER finishing code
        // overscrollBehaviorY: "none",
        // overflow: "auto",
        marginLeft: sidebarwidth,
        // backgroundColor: "green",
        // backgroundColor: "rgb(18, 18, 18)",
        backgroundColor: "transparent",
        // opacity: 1,
      }}
    >
      {!playlistLoading && currentList ? (
        <Box
          sx={{
            display: "block",
            height: "440px",
            position: "absolute",
            width: `calc(100% - ${sidebarwidth}px)`,
            zIndex: 0,
            top: 0,
            left: 0,
            // backgroundColor: "rgb(184, 8, 24)",
            backgroundImage: `linear-gradient(to bottom, ${
              colors[Math.abs(hashCode(currentList.uniqID) % colors.length)]
            }, rgb(18,18,18));`,
            opacity: 0.8,
            marginLeft: sidebarwidth,
          }}
        ></Box>
      ) : (
        !location.pathname.includes("search") && (
          <Box
            sx={{
              display: "block",
              height: "440px",
              position: "absolute",
              width: `calc(100% - ${sidebarwidth}px)`,
              zIndex: 0,
              top: 0,
              left: 0,
              // backgroundColor: "rgb(184, 8, 24)",
              backgroundImage: `linear-gradient(to bottom, rgb(69,69,69), rgb(18,18,18));`,
              opacity: 0.8,
              marginLeft: sidebarwidth,
            }}
          ></Box>
        )
      )}
      {children}
    </div>
  );
};
export default MainContentWrapper;
