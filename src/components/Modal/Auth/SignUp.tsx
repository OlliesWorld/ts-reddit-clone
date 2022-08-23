import React, {useState} from 'react';
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import {  ModalView } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/error";

type SignUpProps = {
    toggleView: (view: ModalView) => void;
  };

  const SignUp: React.FC<SignUpProps> = ({ toggleView }) => {
    
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formError, setFormError] = useState("");

    const [
        createUserWithEmailAndPassword,
        _,
        loading,
        authError,
      ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formError) setFormError("");
        if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    if (form.password !== form.confirmPassword) {
      return setFormError("Passwords do not match");
    }

    // Valid form inputs
    createUserWithEmailAndPassword(form.email, form.password);
  };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    return (
        <form onSubmit={onSubmit}>
            <Input required name="email" placeholder="email" type="email" mb={2} onChange={onChange} fontSize="10pt" _placeholder={{color: "gray.500"}} _hover={{bg: "white", border: "1px solid", borderColor: "blue.500"}} _focus={{outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500"}} bg="gray.50"/>
            <Input required name="password" placeholder="password" type="password" onChange={onChange} mb={2}fontSize="10pt" _placeholder={{color: "gray.500"}} _hover={{bg: "white", border: "1px solid", borderColor: "blue.500"}} _focus={{outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500"}} bg="gray.50"/>
            <Input required name="confirmPassword" placeholder="confirm password" type="password" onChange={onChange} mb={2}fontSize="10pt" _placeholder={{color: "gray.500"}} _hover={{bg: "white", border: "1px solid", borderColor: "blue.500"}} _focus={{outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500"}} bg="gray.50"/>
            <Text textAlign="center" color="red">{formError ||
                FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button type='submit' width="100%" height="36px" mt={2} mb={2} isLoading={loading}>Sign up</Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already a redditor?</Text>
                <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={() => toggleView("login")}
                >Log In</Text>
               
            </Flex>
        </form>
    )
}

export default SignUp;