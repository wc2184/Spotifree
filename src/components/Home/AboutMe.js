import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";

const AboutMe = ({ isOpen, onClose }) => {
  //   1372;
  const [isLessThan1372] = useMediaQuery("(max-width: 1372px)");
  return (
    <Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="50%" minHeight="80%">
        <ModalHeader fontSize="6xl">Hi, I'm William 👋</ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize={isLessThan1372 ? "1.25rem" : "1.5rem"}>
          I created this website, Spotifree. <br></br> <br></br> The entire site
          was built with{" "}
          <span style={{ color: "teal", fontWeight: "bold" }}>React</span>,{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>Redux</span>, and{" "}
          <span style={{ color: "#1da1f2", fontWeight: "bold" }}>
            <a target="_blank" href="https://chakra-ui.com/">
              Chakra UI
            </a>
          </span>
          .<br></br> <br></br> I manually did all the custom styling by hand in
          an attempt to match the actual Spotify website. 😅 <br></br> <br></br>
          The music comes from Youtube: there's a 0px by 0px Youtube iframe in
          the background; search functionality comes from Youtube Data API V3.{" "}
          <br></br> <br></br>
          <br></br> <br></br>{" "}
          <span style={{ fontWeight: "bold" }}>
            P.S. As a recent CS college grad, I'm currently looking for work, so
            if you loved this site- feel free to reach out to me!
          </span>
        </ModalBody>
        <Box m="0 40px" maxW="100%" display="flex" gap="30px">
          <Button
            as="a"
            href="https://github.com/wc2184"
            target="_blank"
            _hover={{
              cursor: "pointer",
              transform: "scale(1.03)",
            }}
            backgroundColor="#0d1117"
            color="white"
            fontSize={isLessThan1372 ? "14px" : "1.15rem"}
            leftIcon={<BsGithub />}
            flex={1}
          >
            <Text mt="3px">My Github</Text>
          </Button>
          <Button
            as="a"
            href="https://www.linkedin.com/in/william-chan-3bb674194/"
            target="_blank"
            _hover={{
              cursor: "pointer",
              transform: "scale(1.03)",
            }}
            colorScheme="linkedin"
            fontSize={isLessThan1372 ? "14px" : "1.15rem"}
            leftIcon={<AiFillLinkedin />}
            flex={1.1}
          >
            <Text mt="3px">My LinkedIn</Text>
          </Button>
          <Button
            as="a"
            href="https://williamchan.surge.sh/"
            target="_blank"
            _hover={{
              cursor: "pointer",
              transform: "scale(1.03)",
            }}
            colorScheme="yellow"
            fontSize={isLessThan1372 ? "14px" : "1.15rem"}
            leftIcon={<BsGithub />}
            flex={1}
          >
            <Text mt="3px">My Website</Text>
          </Button>
        </Box>
        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button> */}
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AboutMe;
