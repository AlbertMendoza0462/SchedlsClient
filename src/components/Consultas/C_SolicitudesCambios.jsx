import React, { useContext, useEffect, useState } from 'react';
import { ApiGet } from '../../Api';
import LoadingPage from '../LoadingPage';
import { AlertContext, CantSolicitudesActivasContext, UserContext } from '../../Contexts';
import { AlertMessage, ErrorAlert, SuccessAlert } from '../Alertas';
import Turno from '../Registros/R_Turno';
import SolicitudCambio from '../Registros/R_SolicitudCambio';
import dayjs from 'dayjs';

const SolicitudesCambios = () => {
    const alertContext = useContext(AlertContext)
    const userContext = useContext(UserContext)
    const cantSolicitudesActivasContext = useContext(CantSolicitudesActivasContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [entidad, setEntidad] = useState()

    const solicitarData = () => {
        ApiGet("/api/SolicitudCambio")
            .then(d => {
                alertContext.setAlertas((al) => [...al, {
                    Alerta: SuccessAlert,
                    mensaje: AlertMessage.cargado
                }])
                setData(d.response)
                setLoading(false)
            })
            .catch(d => {
                alertContext.setAlertas((al) => [...al, {
                    Alerta: ErrorAlert,
                    mensaje: AlertMessage.noCargado
                }])
                console.log(d)
                setLoading(false)
            })
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

    useEffect(() => {
        if (!isOpen) {
            setEntidad(null)
        }
    }, [isOpen])

    useEffect(() => {
        solicitarData();
    }, [])

    const mostrarData = (data) => {
        return (
            <div>
                <SolicitudCambio isOpen={isOpen} setIsOpen={setIsOpen} entidad={entidad} solicitarData={solicitarData} />
                <table className='table table-striped table-hover table-sm' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Solicitante</th>
                            <th>Turno Actual</th>
                            <th>Turno Solicitado</th>
                            <th>Empleado de Turno</th>
                            <th>Fecha Solicitud</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(d =>
                            <tr key={d.solicitudCambioId}
                                className={
                                    (d.estadoSolicitudId == 1) ? "table-info " : (d.estadoSolicitudId == 2) ? "table-primary " : ""
                                }
                                onClick={() => {
                                    if (userContext.usuarioEmpleado.IsAdmin ||
                                        userContext.usuarioEmpleado.EmpleadoId == d.usuarioId ||
                                        userContext.usuarioEmpleado.EmpleadoId == d.turnoActual.usuario.usuarioId ||
                                        userContext.usuarioEmpleado.EmpleadoId == d.turnoSolicitado.usuario.usuarioId) {
                                        setEntidad(d)
                                        setIsOpen(true)
                                    }
                                }}>
                                <td>{d.solicitudCambioId}</td>
                                <td>{d.usuario.nombre + " " + d.usuario.apellido}</td>
                                <td>{dayjs(d.fechaTurnoActual).format('DD/MM/YYYY hh:mm a')}</td>
                                <td>{dayjs(d.fechaTurnoSolicitado).format('DD/MM/YYYY hh:mm a')}</td>
                                <td>{d.turnoSolicitado.usuario.nombre + " " + d.turnoSolicitado.usuario.apellido}</td>
                                <td>{dayjs(d.fechaSolicitud).format('DD/MM/YYYY hh:mm a')}</td>
                                <td>{d.estadoSolicitud.descripcion}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        );
    }



    let contents = loading
        ? <LoadingPage />
        : mostrarData(data);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 id="tabelLabel" >Mantenimiento de Solicitudes de Cambios</h1>
                    <p>This component demonstrates fetching data from the server.</p>
                </div>
                <div className="form-group">
                    <input type="button" className="btn btn-primary" onClick={() => {
                        setEntidad(null)
                        setIsOpen(true)
                    }} value="Nuevo" />
                </div>
            </div>
            {contents}
        </div>
    );
}
export default SolicitudesCambios