import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { editPlaylist } from "../../store/playlist";
import Lorem from "./Lorem";

const EditPlaylistModal = ({ title, isOpen, onClose }) => {
  const currentList = useSelector((state) => state.playlist.currentList);
  const dispatch = useDispatch();
  console.log(title, "titl");
  if (title)
    return (
      <>
        <Modal
          preserveScrollBarGap
          isCentered
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent h="20vh">
            <ModalHeader pb={1}>Edit Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                defaultValue={currentList.name}
                autoFocus
                fontSize="28px"
                size="lg"
                h="100%"
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    console.log(e.target.value, "ee");
                    dispatch(
                      editPlaylist(
                        currentList.uniqID,
                        e.target.value,
                        currentList.description
                      )
                    );
                    onClose();
                  }
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
              />
            </ModalBody>

            <ModalFooter pt={1}>
              <Button colorScheme="green" mr={3} onClick={onClose}>
                Save
              </Button>
              <Button variant="ghost">Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  return (
    <>
      <Modal preserveScrollBarGap isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="30vh">
          <ModalHeader>Edit Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              autoFocus
              onFocus={(e) => {
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                );
              }}
              fontSize="larger"
              defaultValue={currentList.description}
              h="100%"
              resize="none"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  console.log(e.target.value, "ee");
                  dispatch(
                    editPlaylist(
                      currentList.uniqID,
                      currentList.name,
                      e.target.value
                    )
                  );
                  onClose();
                }
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Save
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditPlaylistModal;
