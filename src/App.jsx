import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/sign_in';
import Signup from './pages/sign_up';
import Protectedpage from './pages/protected_page'
import { AuthProvider } from './context/authContext'
import PrivateRoutes from './utils/PrivateRoutes';


function App() {

  

  return (
    <Router>
      <AuthProvider>
        <Box>
          <Navbar />

          <Box className='content'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/sign-in' element={<Signin />}></Route>
              <Route path='/sign-up' element={<Signup />}></Route>

              
              <Route element={<PrivateRoutes />}>
                <Route path='/dashboard' element={<Protectedpage />}></Route>
              </Route>
              

            </Routes>
          </Box>

        </Box>
      </AuthProvider>

    </Router>
    
  );
}

export default App;
