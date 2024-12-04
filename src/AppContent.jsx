import React, { createContext, useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './custom.css';
import Login from './components/Registros/Login';
import Logout from './components/Registros/Logout';
import SidebarComponent from './components/SidebarComponent';
import ValidarSesion from './ValidarSesion';
import LoadingPage from './components/LoadingPage';
import { AlertMessage, ErrorAlert, SuccessAlert } from './components/Alertas';
import { Layout } from './components/Layout';
import Usuario from "./components/Registros/R_Usuario";
import TiposTurnos from "./components/Consultas/C_TiposTurnos";
import EstadosSolicitudes from "./components/Consultas/C_EstadosSolicitudes";
import TipoTurno from "./components/Registros/R_TipoTurno";
import EstadoSolicitud from "./components/Registros/R_EstadoSolicitud";
import Turnos from "./components/Consultas/C_Turnos";
import Turno from "./components/Registros/R_Turno";
import CambioClave from "./components/Registros/R_CambioClave";
import Usuarios from "./components/Consultas/C_Usuarios";
import { Home } from "./components/Home";
import { AlertContext, CantSolicitudesActivasContext, LoadContext, UserContext } from './Contexts';
import Calendario from './components/Consultas/Calendario';
import SolicitudesCambios from './components/Consultas/C_SolicitudesCambios';
import { ApiGet } from './Api';

const AppContent = ({ setIsSesionValida }) => {
    const alertContext = useContext(AlertContext)
    const loadContext = useContext(LoadContext)
    const userContext = useContext(UserContext)

    return (
        <div id="app">
            <div className="position-fixed p-4 end-0 bottom-0" style={{ zIndex: 1030 }}>
                <div className="position-relative right-0 d-flex flex-column align-items-end justify-content-end">
                    {alertContext.alertas.map((obj, key) => {
                        return <obj.Alerta key={key} mensaje={obj.mensaje} />
                    })}
                </div>
            </div>
            <ValidarSesion setIsSesionValida={setIsSesionValida}>
                {(!loadContext.isLoading)
                    ?
                    <div style={({ height: "100vh" }, { display: "flex" })}>
                        {(userContext.isSesionValida) ? <SidebarComponent /> : ""}
                        < main >
                            <Routes>
                                <Route path="" index element={<Layout><Home /></Layout>} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/calendario" element={<Layout><Calendario /></Layout >} />
                                <Route path="/usuario" element={<Layout><Usuarios /></Layout >} />
                                <Route path="/solicitudCambio" element={<Layout><SolicitudesCambios /></Layout >} />
                                <Route path="/usuario/cambioClave" element={<Layout><CambioClave /></Layout >} />
                                {(userContext.usuarioEmpleado.IsAdmin) ? <>
                                    <Route path="/tipoTurno" element={<Layout><TiposTurnos /></Layout >} />
                                    <Route path="/estadoSolicitud" element={<Layout><EstadosSolicitudes /></Layout >} />
                                    <Route path="/turno" element={<Layout><Turnos /></Layout >} />
                                </>
                                    : <></>}
                            </Routes>
                        </main>
                    </div>
                    :
                    <LoadingPage allPage={true} />}
            </ValidarSesion>
        </div >
    )
}
export default AppContent