import React, { useEffect } from 'react';
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Text } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authModalState, ModalView } from "../../../atoms/authModalAtom";
import { auth } from '../../../firebase/clientApp';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPass';
import { userState } from '../../../atoms/userAtom';

type AuthModalProps = {
    
};

const AuthModal:React.FC = () => {
   const [modalState, setModalState] = useRecoilState(authModalState);
 
   const handleClose = () => {
       setModalState((prev) => ({
           ...prev,
           open: false,
       }))
   };
   const currentUser = useRecoilValue(userState);
   const [user, error] = useAuthState(auth);

   const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

   useEffect(() => {
    if(user) handleClose();
   }, [user]);
   
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' alignItems="center" justifyContent="center" pb={6}>
              <Flex direction="column" align="center" justify="center" width="70%">
                  {modalState.view === 'login' || modalState.view === 'signup' ? (
                      <>
                        <OAuthButtons />
                        <Text color="gray.500" fontWeight={700}>OR</Text>
                        <AuthInputs toggleView={toggleView}/>
                       </>
                  ) : (
                         <ResetPassword toggleView={toggleView}/>
                  )}
                    
                    
              </Flex>
           
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;