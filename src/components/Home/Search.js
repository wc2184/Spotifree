import { useCallback, useEffect, useMemo, useRef } from "react";
import debounce from "lodash/debounce";
import {
  Box,
  Button,
  CheckboxIcon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { searchYoutube, setSearch, setSearchLoading } from "../../store/search";
import { FiSearch } from "react-icons/fi";

const Search = ({ submitted, setSubmitted }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.search);
  const searchResults = useSelector((state) => state.search.searchResults);
  const searchLoading = useSelector((state) => state.search.searchLoading);
  const ref = useRef();
  console.log(searchTerm, "thsi is search term");
  ref.current = searchTerm;
  console.log(ref, "this is ref");

  //   useEffect(() => {
  //     const searchInterval = setInterval(() => {
  //       console.log(searchTerm, "search termmy in intervally");
  //       console.log(ref, "search ref inside ");
  //     }, 1000);
  //     return () => {
  //       clearInterval(searchInterval);
  //     };
  //   }, [searchTerm]);

  //     const updateLive = () => {
  //       console.log(searchTerm);
  //       return searchTerm;
  //     };
  //     const searchNowDebounce = () => {
  //       console.log("search now");
  //       // let liveterm = useSelector((state) => state.search.search);
  //       (() => updateLive())();
  //       // console.log(liveterm);
  //       console.log(searchTerm, "buggy searchterm");
  //     };
  //     console.log(searchTerm, "searchTerm");
  //     const debouncedSearch = useMemo(() => {
  //       return debounce(searchNow, 1000);
  //     }, []);

  //     useEffect(() => {
  //       return () => {
  //         debouncedSearch.cancel();
  //       };
  //     }, [searchTerm]);

  const searchNow = () => {
    if (!searchTerm) return;
    console.log(searchTerm, "this is searchTerm");
    dispatch(setSearchLoading(true));
    dispatch(searchYoutube(searchTerm)).then(() => {
      setTimeout(() => {
        // setSubmitted(true);
      }, 200);
      window.scrollTo(0, 0);
    });
  };
  //   console.log(searchTerm, "da search");
  //   console.log(searchResults, "da search");
  return (
    <>
      <InputGroup
        sx={{
          display: "flex",
          flexDir: "column",
          width: "350px",
          marginTop: "12px",
          marginLeft: "18px",
        }}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<Box as={FiSearch} size={24} ml="6px" />}
        />
        <Input
          className="searchbartarget"
          placeholder="What do you want to listen to?"
          sx={{ width: "350px", borderRadius: "500px" }}
          _focus={{ outline: "none" }}
          focusBorderColor="gray"
          bgColor="white"
          value={searchTerm}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
            // debouncedSearch(e);
          }}
          onKeyDown={(e) => {
            // if (e.key == "Enter") {
            //   debouncedSearch.flush();
            // }
            if (e.key == "Enter") {
              searchNow(e);
            }
          }}
        />

        {!searchLoading && searchTerm ? (
          <InputRightElement width="4.5rem">
            <Button
              sx={{ borderRadius: "500px", backgroundColor: "lightgray" }}
              h="1.75rem"
              size="sm"
              onClick={() => {
                searchNow(searchTerm);
              }}
            >
              Find
            </Button>
          </InputRightElement>
        ) : null}
      </InputGroup>
    </>
  );
};
export default Search;
