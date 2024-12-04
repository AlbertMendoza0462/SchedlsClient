import React, { useContext, useEffect, useState } from 'react';
import { ApiGet } from '../../Api';
import LoadingPage from '../LoadingPage';
import { AlertContext, UserContext } from '../../Contexts';
import { AlertMessage, ErrorAlert, SuccessAlert } from '../Alertas';
import Turno from '../Registros/R_Turno';
import dayjs from 'dayjs';

const Turnos = () => {
    const alertContext = useContext(AlertContext)
    const userContext = useContext(UserContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [entidad, setEntidad] = useState()

    const solicitarData = () => {
        ApiGet("/api/Turno")
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
                <Turno isOpen={isOpen} setIsOpen={setIsOpen} entidad={entidad} solicitarData={solicitarData} />
                <table className='table table-striped table-hover table-sm' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Empleado</th>
                            <th>Tipo de Turno</th>
                            <th>Fecha de Inicio</th>
                            <th>Horas en Dias de Semana</th>
                            <th>Horas en Fin de Semana</th>
                            <th>Intervalo de Días</th>
                        </tr>
                    </thead>
                    <tbody className="h-100">
                        {data.map(d =>
                            <tr key={d.turnoId} onClick={() => {
                                if (userContext.usuarioEmpleado.IsAdmin) {
                                    setEntidad(d)
                                    setIsOpen(true)
                                }
                            }}>
                                <td>{d.turnoId}</td>
                                <td>{d.usuario.nombre + " " + d.usuario.apellido}</td>
                                <td>{d.tipoTurno.descripcion}</td>
                                <td>{dayjs(d.fechaInicio).format('DD/MM/YYYY hh:mm a')}</td>
                                <td>{d.cantHorasEnDiaDeSemana}</td>
                                <td>{d.cantHorasEnFinDeSemana}</td>
                                <td>{d.intervaloDeDias}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }



    let contents = loading
        ? <LoadingPage />
        : mostrarData(data);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div>
                    <h1 id="tabelLabel" >Mantenimiento de Turnos</h1>
                    <p>This component demonstrates fetching data from the server.</p>
                </div>
                {(userContext.usuarioEmpleado.IsAdmin) ?
                    <div className="form-group">
                        <input type="button" className="btn btn-primary" onClick={() => {
                            setEntidad(null)
                            setIsOpen(true)
                        }} value="Nuevo" />
                    </div>
                    : <></>}
            </div>
            {contents}
        </div>
    );
}
export default Turnos