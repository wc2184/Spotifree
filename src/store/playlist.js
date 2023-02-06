import { useSelector } from "react-redux";
import csrfFetch from "./csrf";

const POPULATE_NEW_USER = "playlist/populateNewUser";
const HYDRATE_PLAYLISTS_FOR_ONE = "playlist/hydratePlaylistsForOne";
const SET_PLAYLIST_SONGS_AND_OBJ = "playlist/setPlaylistSongsAndObj";
const SET_PLAYLIST = "playlist/setPlaylist";
// date is obtained via new Date(), just copied the string, parse back in downloads/timeparser.js - will
const initialPlaylists = [
  {
    name: "Rap Music",
    uniqID: "beb4776f-b2f5-4f29-a8f6-3a45f4dfd942",
    songs: [
      {
        link: "https://www.youtube.com/watch?v=HIwAI05Y1fU",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=v6HBZC9pZHQ",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Vi2XaiKhgiU",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=JFm7YDVlqnI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=woSEPCPW7gQ",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=zI383uEwA6Q",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=cmc8q2dcIMs",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=XbGs_qK2PQA",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=np9Ub1LilKU",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=U6k5dIhB6AM",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=JocAXINz-YE",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=tvTRZJ-4EyI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=kiB9qk4gnt4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=gtqqaHbLS-E",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=fJZZ_TcFGo4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=sw4r0k8WWqU",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=RaDxlQDwbfQ",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=tfSS1e3kYeo",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=pohWmgZgn-U",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=WILNIXZr2oc",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=mjaayCARwro",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=MQJVc3Yoi_o",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
    ],
  },
  {
    name: "K-pop Hits",
    uniqID: "8e0f1dfb-a5f0-4eef-b684-8b6de07123ef",
    songs: [
      {
        link: "https://www.youtube.com/watch?v=o8RkbHv2_a0",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=jT0Lh-N3TSg",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=HtbnfBFIJls",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=1pUCsbK35JA",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=T--6HBX2K4g",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=qoK934-VghI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=3rr3Sx3BuB0",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=BiPKFk85iF4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=jip9EXrrf0o",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=1o0CtxZ_Cbo",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Uz0PppyT7Cc",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=SxAvr92fRg4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=iKe70q941vg",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=5ox6GJbDm_Q",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=f0FDOw3zvGo",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=T-BP9jJQvE8",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=V9Wsm0hlLUI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=HtYTLDClzIU",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=IPku5rNLrME",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=qFEeiq5agoE",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=6744glqD6lk",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
    ],
  },
  {
    name: "SZA's Songs",
    uniqID: "3c1496d8-1275-45fc-aada-263e1b86e0d4",
    songs: [
      {
        link: "https://www.youtube.com/watch?v=SQnc1QibapQ",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=p9rllutpWq4",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Z-T_O_vl-8Y",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },

      {
        link: "https://www.youtube.com/watch?v=oh64haEP9g8",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Sv5yCzPCkv8",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=0BdlKkvjEgA",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=0Exxu8lsGYE",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=7IDq62nUUIw",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=PALMMqZLAQk",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=2B-G_jB0Wzo",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=zFXmOl6JqRE",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=p_11tLegwF0",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=npu0F7n4M9Y",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=7frfkBdV0-w",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=_R2LiwXtuLQ",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=9njAvx-2y4c",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=iwyAxyE2Ajg",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=SB0GxBSFUJk",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=rA6DIHIg5To",
        time: "Wed Feb 01 2023 11:43:09 GMT-0500 (Eastern Standard Time)",
      },
    ],
  },
  {
    name: "Ariana Grande's Songs",
    uniqID: "9c957145-ab71-479b-a5b9-b7d3e3d3008e",
    songs: [
      {
        link: "https://www.youtube.com/watch?v=nQJEp-k-ogs",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=5OeR5XBEahU",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=1BYr1br2Ee4",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=TFrMDGfW_Sg",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=nA862JDEoKs",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Km__cJEJ3JI",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=A3BuLzTvo0o",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=FKQBr0iMUHw",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=lR5raZbD7fE",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=zMEzD2G2IKA",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=2Ek3WMM7I-0",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=MYvjW3zdCws",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Lj4-SIa9bbk",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=m7XHduHsBvk",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=6vay5SgNPpk",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=uKqRAC-JNOM",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=6GcpNvYFMGE",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=RQTgJRwMdKQ",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=TKVsRBjMWuk",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=WBXncmnxmAg",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=AVPEP_KSldA",
        time: "Wed Feb 01 2023 11:43:46 GMT-0500 (Eastern Standard Time)",
      },
    ],
  },
  {
    name: "Michael Jackson's Songs",
    uniqID: "8573cbd0-727e-46ab-a56d-a55953d3d414",
    songs: [
      {
        link: "https://www.youtube.com/watch?v=1ZZQuj6htF4",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=TDVlDUAIz5k",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=7CTJcHjkq0E",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=WlTlUseVt7E",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=7jTq2FXKr0g",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=1XMvPTFzgVU",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=0wnuTGGuAVs",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=ElN_4vUvTPs",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=YP3W-E0OamU",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=_BfcRjZn6y4",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=aUD0juRwb3I",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=a-sPK4hbtkE",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=_mMyPJSx8RU",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=cMsQhR07fsQ",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=uzbnrfd9vLQ",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=-e-y-1VRZ3I",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=MuTgX_A52Eo",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=ftCalx6_pYA",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=OZGtRvYF-A4",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=GsHZBisKwxg",
        time: "Wed Feb 01 2023 11:44:20 GMT-0500 (Eastern Standard Time)",
      },
    ],
  },
  {
    name: "Modern Pop",
    uniqID: "26554316-1a9b-454b-a4ab-d0faeaa0cdd0",
    songs: [
      {
        link: "https://www.youtube.com/watch?v=VF-FGf_ZZiI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=H5v3kku4y6Q",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },

      {
        link: "https://www.youtube.com/watch?v=mRD0-GxqHVo",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=b1kbLwvqugk",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=SQnc1QibapQ",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=61ymOWwOwuk",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },

      {
        link: "https://www.youtube.com/watch?v=MSRcC626prw",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Uq9gPaIzbe8",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=b1kbLwvqugk",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Odh9ddPUkEY",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Z8vDU6vUTj4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=kTJczUoc26U",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=61ymOWwOwuk",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=IXXxciRUMzE",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=4VaqA-5aQTM",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=G7KNmW9a75Y",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=7aekxC_monc",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=j5uAR9w7LBg",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=uPD0QOGTmMI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=NgsWGfUlwJI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
    ],
  },
  {
    name: "80's Greatest Hits",

    uniqID: "39096d7d-af79-43e1-b914-2f8982473556",
    songs: [
      {
        link: "https://www.youtube.com/watch?v=1w7OgIMMRc4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=pIgZ7gMze7A",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=izGwDsrQ1eQ",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Cv6tuzHUuuk",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Q5wPHxqgQH0",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=1k8craCGpgs",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=4ZKqbPZ6tug",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=KWIVfjjUWu4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=PqUenEMwsdQ",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=_nxrYwT0SIo",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=iFx-5PGLgb4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=7CTJcHjkq0E",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=BwEce9uNgu4",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=xUScFNXAq0w",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=qBiA_po8TYM",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=v2AC41dglnM",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=djV11Xbc914",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=OMD8hBsA-RI",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Rbm6GXllBiw",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=sZTpLvsYYHw",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=M-0Z_2j1a1U",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
      {
        link: "https://www.youtube.com/watch?v=Z9NYDgbKsBE",
        time: "Wed Feb 01 2023 03:06:47 GMT-0500 (Eastern Standard Time)",
      },
    ],
  },
];

// this is after the thunk, so the argument passed in is ACTUALLY a json blob
export const hydratePlaylistsForOne = (playlists) => {
  // not used in js code
  return {
    type: HYDRATE_PLAYLISTS_FOR_ONE,
    playlists: playlists,
  };
};

export const getCurrentPlaylist = (id) => (dispatch, getState) => {
  let playlist = getState().playlist.list.find((pl) => pl.uniqID == id);

  if (playlist) {
    dispatch(setPlaylistSongsAndObj(playlist.songs, playlist));
  } else {
    dispatch(setPlaylistSongsAndObj([], playlist));
  }
};

export const setPlaylistSongsAndObj = (songs, obj) => {
  return {
    type: SET_PLAYLIST_SONGS_AND_OBJ,
    currentList: obj,
    songs: songs,
  };
};

// call only this in the actual react app
export const getPlaylists = () => async (dispatch) => {
  let playlists = JSON.parse(localStorage.getItem("playlists"));
  if (playlists === null) {
    console.log("Populating new user.");

    localStorage.setItem("playlists", JSON.stringify(initialPlaylists));
  }
  playlists = JSON.parse(localStorage.getItem("playlists"));
  dispatch(hydratePlaylistsForOne(playlists));
};
export const createPlaylist = () => async (dispatch) => {
  let playlists = JSON.parse(localStorage.getItem("playlists"));
  let newId = crypto.randomUUID();
  let newPlaylist = {
    name: `Playlist #${playlists.length + 1}`,
    uniqID: newId,
    songs: [],
  };
  playlists.push(newPlaylist);
  localStorage.setItem("playlists", JSON.stringify(playlists));
  dispatch(hydratePlaylistsForOne(playlists));
  return newId;
  // data is an object like  {id: 2}
  // dont even think you need to dispatch anything, just dispatch all hydrate
  // to update eveyrthing
  // dispatch(getPlaylistsForOne(user_id)); UPDATE ALL USERS, source of truth is the dispatch call

  //   dispatch(hydratePlaylistsForOne(data));
  // return data2;
  // this data2 if .json() will contain the route ('/playlists/12') for your create playlist to go to
};

const initialState = {
  list: [], // all playlists
  currentList: null, // object
  songs: [], // array of objects
};

export default function playlistReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case HYDRATE_PLAYLISTS_FOR_ONE:
      return { ...state, list: action.playlists };
    case SET_PLAYLIST_SONGS_AND_OBJ:
      return { ...state, currentList: action.currentList, songs: action.songs };
    default:
      return state;
  }
}
