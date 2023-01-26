const MainContentWrapper = ({ children, sidebarwidth }) => {
  // console.log(sidebarwidth, "sidebar wid");
  // window.onscroll = function () {
  //   window.scrollTo(0, window.scrollY);
  // };
  return (
    <div
      style={{
        // width: `calc(100% - ${sidebarwidth}px)`,
        width: `calc(100% - ${sidebarwidth + 100}px)`,
        // maxWidth: `calc(1517px - ${sidebarwidth + 10}px)`,
        // overflowX: "hidden",
        height: "100%",
        padding: "20px",
        // backgroundColor: "rgb(29, 29, 29)", //* UNCOMMENT THIS AFTER finishing code
        // overscrollBehaviorY: "none",
        // overflow: "auto",
        marginLeft: sidebarwidth,
        backgroundColor: "rgb(18, 18, 18)",
      }}
    >
      {children}
    </div>
  );
};
export default MainContentWrapper;
