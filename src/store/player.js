const SET_CURRENT_SONG = "player/setCurrentSong";
const SET_QUEUE = "player/setQueue";
const SET_INDEX = "player/setIndex";
const SET_ALREADY_LISTENED = "player/setAlreadyListened";
const SET_SHUFFLE = "player/setShuffle";
const SET_REPEAT = "player/setRepeat";
export const setCurrentSong = (id) => {
  return {
    type: SET_CURRENT_SONG,
    id: id,
  };
};

// run whenever you click a song from a playlist, or from search
export const setQueue = (array) => {
  localStorage.setItem("queue", JSON.stringify(array));
  return {
    type: SET_QUEUE,
    queue: array,
  };
};
export const setIndex = (num) => {
  localStorage.setItem("index", JSON.stringify(num));
  return {
    type: SET_INDEX,
    index: num,
  };
};
// (array of numbers) append a new song that hasn't been listened to
export const setAlreadyListened = (array) => {
  localStorage.setItem("alreadyListened", JSON.stringify(array));
  return {
    type: SET_ALREADY_LISTENED,
    alreadyListened: array,
  };
};
export const setShuffle = (bool) => {
  localStorage.setItem("shuffle", bool);
  return {
    type: SET_SHUFFLE,
    shuffle: bool,
  };
};

export const setRepeat = () => (dispatch, getState) => {
  //* 0 off,
  //* 1 repeat,
  //* 2 repeat One
  let prevValue = Number(getState().player.repeat);
  let newVal = (prevValue + 1) % 3;
  localStorage.setItem("repeat", newVal); //auto converts to string
  dispatch({ type: SET_REPEAT, repeat: newVal });
  //! you can have a non async thunk if you want to access getState(), but just remember to dispatch within it. CANNOT return a object wtih type etc
};
let michaelPlaylist = [
  [
    {
      url: "https://www.youtube.com/watch?v=1ZZQuj6htF4",
      version: "1.0",
      thumbnail_height: 360,
      provider_name: "YouTube",
      thumbnail_width: 480,
      width: 200,
      title: "Michael Jackson - P.Y.T. (Pretty Young Thing) (Audio)",
      author_name: "michaeljacksonVEVO",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/1ZZQuj6htF4/hqdefault.jpg",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/1ZZQuj6htF4?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - P.Y.T. (Pretty Young Thing) (Audio)"></iframe>',
      height: 113,
      type: "video",
      provider_url: "https://www.youtube.com/",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      url: "https://www.youtube.com/watch?v=TDVlDUAIz5k",
      thumbnail_height: 360,
      version: "1.0",
      thumbnail_width: 480,
      width: 200,
      provider_name: "YouTube",
      author_name: "michaeljacksonVEVO",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/TDVlDUAIz5k/hqdefault.jpg",
      title: "Michael Jackson - Heaven Can Wait (Audio)",
      height: 113,
      provider_url: "https://www.youtube.com/",
      type: "video",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/TDVlDUAIz5k?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Heaven Can Wait (Audio)"></iframe>',
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      version: "1.0",
      thumbnail_height: 360,
      url: "https://www.youtube.com/watch?v=7CTJcHjkq0E",
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/7CTJcHjkq0E?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Billie Jean"></iframe>',
      type: "video",
      height: 150,
      provider_url: "https://www.youtube.com/",
      title: "Billie Jean",
      thumbnail_url: "https://i.ytimg.com/vi/7CTJcHjkq0E/hqdefault.jpg",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      author_name: "Michael Jackson - Topic",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      url: "https://www.youtube.com/watch?v=WlTlUseVt7E",
      version: "1.0",
      thumbnail_height: 360,
      title: "Beat It",
      thumbnail_url: "https://i.ytimg.com/vi/WlTlUseVt7E/hqdefault.jpg",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      author_name: "Michael Jackson - Topic",
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/WlTlUseVt7E?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Beat It"></iframe>',
      type: "video",
      provider_url: "https://www.youtube.com/",
      height: 150,
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      url: "https://www.youtube.com/watch?v=7jTq2FXKr0g",
      version: "1.0",
      thumbnail_height: 360,
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      title: "Michael Jackson - Dangerous (Audio)",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/7jTq2FXKr0g/hqdefault.jpg",
      author_name: "michaeljacksonVEVO",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/7jTq2FXKr0g?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Dangerous (Audio)"></iframe>',
      provider_url: "https://www.youtube.com/",
      type: "video",
      height: 113,
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      version: "1.0",
      thumbnail_height: 360,
      url: "https://www.youtube.com/watch?v=1XMvPTFzgVU",
      provider_name: "YouTube",
      thumbnail_width: 480,
      width: 200,
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/1XMvPTFzgVU?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Wanna Be Startin&#39; Somethin&#39; (Audio)"></iframe>',
      height: 113,
      provider_url: "https://www.youtube.com/",
      type: "video",
      title: "Michael Jackson - Wanna Be Startin' Somethin' (Audio)",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/1XMvPTFzgVU/hqdefault.jpg",
      author_name: "michaeljacksonVEVO",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      version: "1.0",
      thumbnail_height: 360,
      url: "https://www.youtube.com/watch?v=0wnuTGGuAVs",
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/0wnuTGGuAVs?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson, Justin Timberlake - Love Never Felt So Good (Audio)"></iframe>',
      provider_url: "https://www.youtube.com/",
      height: 113,
      type: "video",
      title:
        "Michael Jackson, Justin Timberlake - Love Never Felt So Good (Audio)",
      author_name: "michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/0wnuTGGuAVs/hqdefault.jpg",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/ElN_4vUvTPs?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Human Nature (Audio)"></iframe>',
      provider_url: "https://www.youtube.com/",
      type: "video",
      height: 113,
      title: "Michael Jackson - Human Nature (Audio)",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      author_name: "michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/ElN_4vUvTPs/hqdefault.jpg",
      provider_name: "YouTube",
      thumbnail_width: 480,
      width: 200,
      version: "1.0",
      thumbnail_height: 360,
      url: "https://www.youtube.com/watch?v=ElN_4vUvTPs",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      provider_name: "YouTube",
      thumbnail_width: 480,
      width: 200,
      title: "Black or White",
      thumbnail_url: "https://i.ytimg.com/vi/YP3W-E0OamU/hqdefault.jpg",
      author_name: "Michael Jackson - Topic",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/YP3W-E0OamU?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Black or White"></iframe>',
      height: 150,
      provider_url: "https://www.youtube.com/",
      type: "video",
      url: "https://www.youtube.com/watch?v=YP3W-E0OamU",
      version: "1.0",
      thumbnail_height: 360,
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      title: "Michael Jackson - Off the Wall (Audio)",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      author_name: "michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/_BfcRjZn6y4/hqdefault.jpg",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/_BfcRjZn6y4?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Off the Wall (Audio)"></iframe>',
      provider_url: "https://www.youtube.com/",
      height: 113,
      type: "video",
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      url: "https://www.youtube.com/watch?v=_BfcRjZn6y4",
      version: "1.0",
      thumbnail_height: 360,
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      title: "Dirty Diana",
      thumbnail_url: "https://i.ytimg.com/vi/aUD0juRwb3I/hqdefault.jpg",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      author_name: "Michael Jackson - Topic",
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/aUD0juRwb3I?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Dirty Diana"></iframe>',
      provider_url: "https://www.youtube.com/",
      height: 150,
      type: "video",
      url: "https://www.youtube.com/watch?v=aUD0juRwb3I",
      version: "1.0",
      thumbnail_height: 360,
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      url: "https://www.youtube.com/watch?v=a-sPK4hbtkE",
      version: "1.0",
      thumbnail_height: 360,
      title: "Michael Jackson - Blue Gangsta (Audio)",
      author_name: "michaeljacksonVEVO",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      thumbnail_url: "https://i.ytimg.com/vi/a-sPK4hbtkE/hqdefault.jpg",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/a-sPK4hbtkE?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Blue Gangsta (Audio)"></iframe>',
      provider_url: "https://www.youtube.com/",
      type: "video",
      height: 113,
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      provider_url: "https://www.youtube.com/",
      height: 150,
      type: "video",
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/_mMyPJSx8RU?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Smooth Criminal (Radio Edit)"></iframe>',
      author_name: "Michael Jackson - Topic",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      thumbnail_url: "https://i.ytimg.com/vi/_mMyPJSx8RU/hqdefault.jpg",
      title: "Smooth Criminal (Radio Edit)",
      thumbnail_width: 480,
      width: 200,
      provider_name: "YouTube",
      thumbnail_height: 360,
      version: "1.0",
      url: "https://www.youtube.com/watch?v=_mMyPJSx8RU",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      title: "Michael Jackson - Who Is It (Audio)",
      author_name: "MJLiveHQ",
      author_url: "https://www.youtube.com/@MJLiveHQ",
      thumbnail_url: "https://i.ytimg.com/vi/cMsQhR07fsQ/hqdefault.jpg",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/cMsQhR07fsQ?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Michael Jackson - Who Is It (Audio)"></iframe>',
      height: 113,
      provider_url: "https://www.youtube.com/",
      type: "video",
      provider_name: "YouTube",
      thumbnail_width: 480,
      width: 200,
      url: "https://www.youtube.com/watch?v=cMsQhR07fsQ",
      version: "1.0",
      thumbnail_height: 360,
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/uzbnrfd9vLQ?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="The Way You Make Me Feel (2012 Remaster)"></iframe>',
      height: 150,
      provider_url: "https://www.youtube.com/",
      type: "video",
      title: "The Way You Make Me Feel (2012 Remaster)",
      author_name: "Michael Jackson - Topic",
      thumbnail_url: "https://i.ytimg.com/vi/uzbnrfd9vLQ/hqdefault.jpg",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      provider_name: "YouTube",
      thumbnail_width: 480,
      width: 200,
      version: "1.0",
      thumbnail_height: 360,
      url: "https://www.youtube.com/watch?v=uzbnrfd9vLQ",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      url: "https://www.youtube.com/watch?v=-e-y-1VRZ3I",
      version: "1.0",
      thumbnail_height: 360,
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      title: "Thriller (2003 Edit)",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      author_name: "Michael Jackson - Topic",
      thumbnail_url: "https://i.ytimg.com/vi/-e-y-1VRZ3I/hqdefault.jpg",
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/-e-y-1VRZ3I?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Thriller (2003 Edit)"></iframe>',
      height: 150,
      type: "video",
      provider_url: "https://www.youtube.com/",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      url: "https://www.youtube.com/watch?v=MuTgX_A52Eo",
      version: "1.0",
      thumbnail_height: 360,
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      title: "Michael Jackson - Slave to the Rhythm (Official Audio)",
      thumbnail_url: "https://i.ytimg.com/vi/MuTgX_A52Eo/hqdefault.jpg",
      author_url: "https://www.youtube.com/@michaeljacksonVEVO",
      author_name: "michaeljacksonVEVO",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/MuTgX_A52Eo?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Slave to the Rhythm (Official Audio)"></iframe>',
      type: "video",
      height: 113,
      provider_url: "https://www.youtube.com/",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      thumbnail_width: 480,
      width: 200,
      provider_name: "YouTube",
      provider_url: "https://www.youtube.com/",
      height: 113,
      type: "video",
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/ftCalx6_pYA?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Beat It (Official Audio)"></iframe>',
      thumbnail_url: "https://i.ytimg.com/vi/ftCalx6_pYA/hqdefault.jpg",
      author_name: "Nielson Lucas",
      author_url: "https://www.youtube.com/@NielsonLucas",
      title: "Michael Jackson - Beat It (Official Audio)",
      thumbnail_height: 360,
      version: "1.0",
      url: "https://www.youtube.com/watch?v=ftCalx6_pYA",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      provider_url: "https://www.youtube.com/",
      type: "video",
      height: 113,
      html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/OZGtRvYF-A4?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Michael Jackson - Billie Jean (Official Audio)"></iframe>',
      author_name: "Nielson Lucas",
      author_url: "https://www.youtube.com/@NielsonLucas",
      thumbnail_url: "https://i.ytimg.com/vi/OZGtRvYF-A4/hqdefault.jpg",
      title: "Michael Jackson - Billie Jean (Official Audio)",
      thumbnail_width: 480,
      width: 200,
      provider_name: "YouTube",
      thumbnail_height: 360,
      version: "1.0",
      url: "https://www.youtube.com/watch?v=OZGtRvYF-A4",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
  [
    {
      version: "1.0",
      thumbnail_height: 360,
      url: "https://www.youtube.com/watch?v=GsHZBisKwxg",
      provider_name: "YouTube",
      width: 200,
      thumbnail_width: 480,
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/GsHZBisKwxg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="They Don&#39;t Care About Us (Remastered Version)"></iframe>',
      height: 150,
      provider_url: "https://www.youtube.com/",
      type: "video",
      title: "They Don't Care About Us (Remastered Version)",
      thumbnail_url: "https://i.ytimg.com/vi/GsHZBisKwxg/hqdefault.jpg",
      author_url: "https://www.youtube.com/channel/UCoIOOL7QKuBhQHVKL8y7BEQ",
      author_name: "Michael Jackson - Topic",
    },
    "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
  ],
];
const initialState = {
  song: "",
  queue: JSON.parse(localStorage.getItem("queue")) || michaelPlaylist,
  alreadyListened: JSON.parse(localStorage.getItem("alreadyListened")) || [6],
  index: JSON.parse(localStorage.getItem("index")) || 6,
  shuffle: localStorage.getItem("shuffle") === "true" ? true : false,
  repeat: Number(localStorage.getItem("repeat")) || 0,
};

export default function songReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case SET_CURRENT_SONG:
      return { ...state, song: action.id };
    case SET_QUEUE:
      return { ...state, queue: action.queue };
    case SET_ALREADY_LISTENED:
      return { ...state, alreadyListened: action.alreadyListened };
    case SET_INDEX:
      return { ...state, index: action.index };
    case SET_SHUFFLE:
      return { ...state, shuffle: action.shuffle };
    case SET_REPEAT:
      return { ...state, repeat: action.repeat };
    default:
      return state;
  }
}
