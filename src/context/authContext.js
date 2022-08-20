import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=> localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [token, setToken] = useState(()=> localStorage.getItem('token') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    let contextData = {
        user:user,
        token:token,
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>

        
    )
}