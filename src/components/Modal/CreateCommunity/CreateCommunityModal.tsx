import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider, Text, Input, Checkbox, Flex, Icon, Stack } from '@chakra-ui/react';
import { doc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs';
import { HiLockClosed} from 'react-icons/hi';
import { firestore } from '../../../firebase/clientApp';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({open, handleClose}) => {
    const [communityName, setCommunityName] = useState('')
    const [charsRemaining, setCharsRemaining] = useState(21)
    const [communityType, setCommunityType] = useState("public");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length > 21) return;
        
        setCommunityName(event.target.value)
        setCharsRemaining(21 - event.target.value.length)
    }

    
    const onCommunityTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const {
          target: { name },
        } = event;
        if (name === communityType) return;
        setCommunityType(name);
      };

      const handleCreateCommunity = async () => {
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(communityName) || communityName.length < 3) {
            // setError( 'Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.')
            return;
        }

        const communityDocRef = doc(firestore, 'communities', communityName )
      }

      
    return (
        <>
          <Modal isOpen={open} onClose={handleClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>Create Community</ModalHeader>
              <Box pl={3} pr={3}>
                  <Divider />
              <ModalCloseButton />
              <ModalBody display="flex" flexDirection="column" padding="10px 0px">
                  <Text fontWeight={600} fontSize={15}>Name</Text>
                <Text fontSize={11} color="gary.500"> Community names including capitalization cannot be changed</Text>
                <Text
                    color="gray.400"
                    position="relative"
                    top="28px"
                    left="10px"
                    width="20px"
                >
                    r/
                </Text>
                <Input
                    position="relative"
                    name="name"
                    value={communityName}
                    onChange={handleChange}
                    pl="22px"
                    type={""}
                    size="sm"
                />
                <Text
                    fontSize="9pt"
                    color={charsRemaining === 0 ? "red" : "gray.500"}
                    pt={2}
                >
                    {charsRemaining} Characters remaining
                </Text>
                <Text fontSize="9pt" color="red" pr={1}>{error}</Text>
                <Box mt={4} mb={4}>
                    <Text fontWeight={600} fontSize={15}>
                    Community Type
                    </Text>
                    <Stack spacing={2} pt={1}>
                        <Checkbox
                            colorScheme="blue"
                            name="public"
                            isChecked={communityType === "public"}
                            onChange={onCommunityTypeChange}
                        >
                        <Flex alignItems="center">
                        <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                        <Text fontSize="10pt" mr={1}>
                            Public
                        </Text>
                        <Text fontSize="8pt" color="gray.500" pt={1}>
                            Anyone can view, post, and comment to this community
                        </Text>
                        </Flex>
                    </Checkbox>
                    <Checkbox
                        colorScheme="blue"
                        name="restricted"
                        isChecked={communityType === "restricted"}
                        onChange={onCommunityTypeChange}
                    >
                        <Flex alignItems="center">
                        <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                        <Text fontSize="10pt" mr={1}>
                            Restricted
                        </Text>
                        <Text fontSize="8pt" color="gray.500" pt={1}>
                            Anyone can view this community, but only approved users can
                            post
                        </Text>
                        </Flex>
                    </Checkbox>
                    <Checkbox
                        colorScheme="blue"
                        name="private"
                        isChecked={communityType === "private"}
                        onChange={onCommunityTypeChange}
                    >
                        <Flex alignItems="center">
                        <Icon as={HiLockClosed} color="gray.500" mr={2} />
                        <Text fontSize="10pt" mr={1}>
                            Private
                        </Text>
                        <Text fontSize="8pt" color="gray.500" pt={1}>
                            Only approved users can view and submit to this community
                        </Text>
                        </Flex>
                    </Checkbox>
                    </Stack>
                </Box>
            </ModalBody>
                </Box>
                <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
        <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="solid"
          height="30px"
        //   onClick={handleCreateCommunity}
          isLoading={loading}
        >
          Create Community
        </Button>
      </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}
export default CreateCommunityModal;