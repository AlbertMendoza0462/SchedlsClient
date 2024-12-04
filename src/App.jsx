import React, { createContext, useContext, useEffect, useState } from 'react';
import './custom.css';
import { AlertContextProvider, CantSolicitudesActivasContextProvider, LoadContextProvider, UserContextProvider } from './Contexts';
import { SuccessAlert } from './components/Alertas';
import AppContent from './AppContent';

const App = () => {
    const [usuarioEmpleado, setUsuarioEmpleado] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isSesionValida, setIsSesionValida] = useState(false)
    const [alertas, setAlertas] = useState([])
    const [cantSolicitudesActivas, setCantSolicitudesActivas] = useState(0)

    return (
        <AlertContextProvider
            alertas={alertas}
            setAlertas={setAlertas}
        >
            <LoadContextProvider
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            >
                <UserContextProvider
                    isSesionValida={isSesionValida}
                    usuarioEmpleado={usuarioEmpleado}
                    setUsuarioEmpleado={setUsuarioEmpleado}
                >
                    <CantSolicitudesActivasContextProvider
                        cantidad={cantSolicitudesActivas}
                        setCantidad={setCantSolicitudesActivas}
                    >
                        <AppContent setIsSesionValida={setIsSesionValida} />
                    </CantSolicitudesActivasContextProvider>
                </UserContextProvider>
            </LoadContextProvider>
        </AlertContextProvider>
    )
}
export default App