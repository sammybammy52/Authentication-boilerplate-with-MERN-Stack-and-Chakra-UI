import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Select,
    Button,
    ButtonGroup,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useNavigate } from 'react-router-dom';

  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    

    const navigate = useNavigate();


    

    const sendData = (e) => {

      e.preventDefault();
      
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
      }

      setLoading(true);
      
      fetch('https://seye-node-rest-api.herokuapp.com/signup', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => {
       //setCookie("jwt",json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        localStorage.setItem("token", json.token);
        localStorage.setItem("refreshToken", json.refreshToken);
       navigate("/dashboard");
        


      })
      .catch(err => console.log("e no work"));
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
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
              </Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>

              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='role'>Role</FormLabel>
                  <Select id='role' placeholder="Select role" onChange={(e) => setRole(e.target.value)}>
                    <option value="Admin">Admin</option>
                    <option value="Customer">Customer</option>
                  </Select>
                </FormControl>

                <Stack spacing={10} pt={2}>

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
                        Sign up
                      </Button>
                    )
                  }

                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Link color={'blue.400'}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
      
    );
  }