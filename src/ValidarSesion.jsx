import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ApiGet, EvaluarSesion } from './Api';
import { AlertContext, CantSolicitudesActivasContext, LoadContext, UserContext } from './Contexts';
import { AlertMessage, ErrorAlert } from './components/Alertas';

const ValidarSesion = ({ children, setIsSesionValida }) => {
    const userContext = useContext(UserContext)
    const loadContext = useContext(LoadContext)
    const cantSolicitudesActivasContext = useContext(CantSolicitudesActivasContext)
    const alertContext = useContext(AlertContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setIsSesionValida(EvaluarSesion(navigate, location, userContext))
    }, [location])

    useEffect(() => {
        setIsSesionValida(EvaluarSesion(navigate, location, userContext))
    }, [])

    useEffect(() => {
        if (!loadContext.isLoading) {
            if (!userContext.isSesionValida) {
                if (location.pathname.toLowerCase() !== "/login") {
                    navigate("/login", {
                        state: {
                            from: location
                        }
                    })
                }
            } else if (location.pathname.toLowerCase() === "/login") {
                navigate("/", {
                    state: {
                        from: location
                    }
                })
            }
            if (userContext.isSesionValida) {
                ApiGet("/api/SolicitudCambio/ContarActivas")
                    .then(d => {
                        cantSolicitudesActivasContext.setCantidad(d.response)
                    })
                    .catch(d => {
                        alertContext.setAlertas((al) => [...al, {
                            Alerta: ErrorAlert,
                            mensaje: AlertMessage.noCargado
                        }])
                        console.log(d)
                    })
            }
        } else {
            loadContext.setIsLoading(false)
        }
    }, [loadContext.isLoading, userContext.isSesionValida])


    return (
        <>
            {children}
        </>
    )
}

export default ValidarSesion