import { Outlet, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/authContext'


const PrivateRoutes = () => {
    
    let {user} = useContext(AuthContext)
    return(
        !user ? <Navigate to="/sign-in"/> : <Outlet/>
    )
}

export default PrivateRoutes;