
import React, {useState, useEffect, useContext } from 'react'
import AuthContext from '../context/authContext'

export default function Protected_page() {

    let {user} = useContext(AuthContext)
    
    return(
        <h1 color='black'>hello {user.email}, this is a protected page</h1>
    );
}