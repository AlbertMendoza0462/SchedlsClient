import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { ApiPost, CerrarSesion, getEmpleado } from '../../Api';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Contexts';

const Logout = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        console.log(userContext.usuarioEmpleado)
        ApiPost("/api/Usuario/Logout", userContext.usuarioEmpleado)
            .catch(d => {
                console.log(d)
            })
        CerrarSesion(userContext)
        navigate("/login", {
            state: {
                from: location
            }
        })

    })

    return (
        <div>
        </div>
    )
}

export default Logout