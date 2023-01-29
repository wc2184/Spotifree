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

  ref.current = searchTerm;

  useEffect(() => {
    document.querySelector(".searchbartarget").focus();
  }, []);

  //   useEffect(() => {
  //     const searchInterval = setInterval(() => {
  //
  //
  //     }, 1000);
  //     return () => {
  //       clearInterval(searchInterval);
  //     };
  //   }, [searchTerm]);

  //     const updateLive = () => {
  //
  //       return searchTerm;
  //     };
  //     const searchNowDebounce = () => {
  //
  //       // let liveterm = useSelector((state) => state.search.search);
  //       (() => updateLive())();
  //       //
  //
  //     };
  //
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

    dispatch(setSearchLoading(true));
    dispatch(searchYoutube(searchTerm)).then(() => {
      setTimeout(() => {
        // setSubmitted(true);
      }, 200);
      window.scrollTo(0, 0);
    });
  };
  //
  //
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
              document.querySelector(".searchbartarget").blur();
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
