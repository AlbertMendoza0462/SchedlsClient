import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EvaluarSesion } from './Api';

export const UserContext = createContext()

export const UserContextProvider = ({ children, isSesionValida, usuarioEmpleado, setUsuarioEmpleado }) => {
    return (
        <UserContext.Provider value={{ isSesionValida, usuarioEmpleado, setUsuarioEmpleado }}>
            {children}
        </UserContext.Provider>
    )
}

export const AlertContext = createContext()

export const AlertContextProvider = ({ children, alertas, setAlertas }) => {
    return (
        <AlertContext.Provider value={{ alertas, setAlertas }}>
            {children}
        </AlertContext.Provider>
    )
}

export const LoadContext = createContext()

export const LoadContextProvider = ({ children, isLoading, setIsLoading }) => {
    return (
        <LoadContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadContext.Provider>
    )
}

export const CantSolicitudesActivasContext = createContext()

export const CantSolicitudesActivasContextProvider = ({ children, cantidad, setCantidad }) => {
    return (
        <CantSolicitudesActivasContext.Provider value={{ cantidad, setCantidad }}>
            {children}
        </CantSolicitudesActivasContext.Provider>
    )
}