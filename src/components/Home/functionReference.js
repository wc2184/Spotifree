useEffect(() => {
  // OPTIMIZED playlist single code
  // essentially doing this because youtube's data api v3 is a 10000 quota so if i view like 10 playlists of 20 songs each it's going to be 50 views a day max lol,
  // noembed is free api hits, and not affiliated with youtube's data api v3 and won't count towards my cap
  const fetchNoembedData = async () => {
    let noembedArr = [];
    for (const ele of searchResults) {
      //

      let res = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ele.id.videoId}`
      );
      let data = await res.json();
      if (!data.hasOwnProperty("error")) noembedArr.push(data);
    }

    //
    setNoembedDatas(noembedArr);
    setSubmittedNoembed(true);
    dispatch(setSearchLoading(false));
  };
  if (searchResults.length > 0) {
    fetchNoembedData();
  }
}, [searchResults]);

{
  noembedDatas.slice(5).map((ele) => {
    return (
      <Box
        _hover={{
          // pointer: "cursor",
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
          mt="5px"
          w="50px"
          h="40px"
          mb={5}
          mr="14px"
          boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
          src={noembedDatas.length > 0 && ele.thumbnail_url}
          // src={
          //   searchResults.length > 0 &&
          //   ele.snippet.thumbnails.default.url
          // }
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
              // + "noembed",
            }}
            // dangerouslySetInnerHTML={{
            //   __html:
            //     searchResults.length > 0 &&
            //     ele.snippet.title.replace(
            //       ele.snippet.channelTitle
            //         .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            //         .replace("VEVO", "") + "- ",
            //       ""
            //     ),
            // }}
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
            // dangerouslySetInnerHTML={{
            //   __html:
            //     searchResults.length > 0 &&
            //     ele.snippet.channelTitle
            //       .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            //       .replace("VEVO", ""),
            // }}
          ></Box>
        </Box>
      </Box>
    );
  });
}
