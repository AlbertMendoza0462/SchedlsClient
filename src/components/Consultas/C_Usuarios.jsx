import React, { useContext, useEffect, useState } from 'react';
import { ApiGet } from '../../Api';
import LoadingPage from '../LoadingPage';
import { AlertContext, UserContext } from '../../Contexts';
import { AlertMessage, ErrorAlert, SuccessAlert } from '../Alertas';
import Usuario from '../Registros/R_Usuario';

const Usuarios = () => {
    const alertContext = useContext(AlertContext)
    const userContext = useContext(UserContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [entidad, setEntidad] = useState()

    const solicitarData = () => {
        ApiGet("/api/Usuario")
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
                <Usuario isOpen={isOpen} setIsOpen={setIsOpen} entidad={entidad} solicitarData={solicitarData} />
                <table className='table table-striped table-hover table-sm' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Es Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(d =>
                            <tr key={d.empleadoId} onClick={() => {
                                if (userContext.usuarioEmpleado.IsAdmin || userContext.usuarioEmpleado.EmpleadoId == d.empleadoId) {
                                    setEntidad(d)
                                    setIsOpen(true)
                                }
                            }}>
                                <td>{d.empleadoId}</td>
                                <td>{d.nombre}</td>
                                <td>{d.apellido}</td>
                                <td>{d.correo}</td>
                                <td>{(d.isAdmin) ? "Si" : "No"}</td>
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
                    <h1 id="tabelLabel" >Mantenimiento de Usuarios</h1>
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
export default Usuarios