import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import setCookie from '../hooks/setCookie';
import axios from 'axios';

import {
    Flex,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';


  
  export default function SimpleCard() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailerror,setemailError] = useState('');
    const [passworderror, setpasswordError] = useState('');

    const navigate = useNavigate();
    


    const sendData = (e) => {
      e.preventDefault();

      let data = {
        email: email,
        password: password
      }
      setLoading(true);

      fetch('https://seye-node-rest-api.herokuapp.com/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => {
        console.log(json);
        if (json.errors) {

          if (json.errors.email == '' && json.errors.password == '') {
            setemailError('something went wrong, try again')
            setLoading(false);

          }
          else {
            
            setemailError(json.errors.email);
            setpasswordError(json.errors.password);
            setLoading(false);
          }

          
        }
        else if (json.token) {
          //setCookie("jwt",json.token);
          localStorage.setItem("user", JSON.stringify(json.user));
          localStorage.setItem("token", json.token);
          localStorage.setItem("refreshToken", json.refreshToken);
          navigate("/dashboard", { replace: true })
          window.location.reload();
        }
        else{
          setemailError('something went wrong, try again')
          setLoading(false);
        }
       
        


      })
      .catch(err => {
          setemailError('something went wrong, try again')
          setLoading(false);
      });
    

    }


    return (
      <form onSubmit={sendData}>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>

            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <p ></p>
                  <p>{emailerror}</p>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                  <p>{passworderror}</p>
                  
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack>
                  {
                    loading === true ? (
                      <Button
                        isLoading
                        size="lg"
                        bg={'pink.400'}
                        color={'white'}
                        _hover={{
                          bg: 'pink.500',
                        }}

                      >
                        Click me
                      </Button>
                    ) : (
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={'pink.400'}
                        color={'white'}
                        _hover={{
                          bg: 'pink.500',
                        }}
                        type="submit">
                        Sign In
                      </Button>
                    )
                  }

                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
      
    );
  }