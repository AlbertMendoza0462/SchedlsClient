import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { ApiDelete, ApiPost } from '../../Api';
import { AlertContext } from '../../Contexts';
import { SuccessAlert, ErrorAlert, AlertMessage } from '../Alertas';
import { DeleteConfirm, SaveConfirm } from '../Confirmaciones';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EstadoSolicitud = (props) => {
    const alertContext = useContext(AlertContext)
    const [loading, setLoading] = useState([])
    const [estadoSolicitudId, setEstadoSolicitudId] = useState(0)
    const [descripcion, setDescripcion] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const estadoSolicitud = {
            EstadoSolicitudId: estadoSolicitudId,
            Descripcion: descripcion
        }
        console.log(estadoSolicitud)


        SaveConfirm(() => {
            return new Promise((resolve, reject) => {
                ApiPost("/api/EstadoSolicitud", estadoSolicitud)
                    .then(d => {
                        alertContext.setAlertas((al) => [...al, {
                            Alerta: SuccessAlert,
                            mensaje: AlertMessage.guardado
                        }])
                        console.log(d.response)
                        props.setIsOpen(false)
                        props.solicitarData()
                        setLoading(false)
                        resolve()
                    })
                    .catch(d => {
                        alertContext.setAlertas((al) => [...al, {
                            Alerta: ErrorAlert,
                            mensaje: AlertMessage.noGuardado
                        }])
                        console.log(d)
                        setLoading(false)
                        reject()
                    })
            })
        })
    }

    const handleDelete = () => {
        DeleteConfirm(() => {
            return new Promise((resolve, reject) => {
                ApiDelete("/api/EstadoSolicitud", estadoSolicitudId)
                    .then(d => {
                        alertContext.setAlertas((al) => [...al, {
                            Alerta: SuccessAlert,
                            mensaje: AlertMessage.guardado
                        }])
                        console.log(d.response)
                        props.setIsOpen(false)
                        props.solicitarData()
                        setLoading(false)
                        resolve()
                    })
                    .catch(d => {
                        alertContext.setAlertas((al) => [...al, {
                            Alerta: ErrorAlert,
                            mensaje: AlertMessage.noGuardado
                        }])
                        console.log(d)
                        setLoading(false)
                        reject()
                    })
            })
        })
    }

    useEffect(() => {
        if (props.entidad != null) {
            setEstadoSolicitudId(props.entidad.estadoSolicitudId)
            setDescripcion(props.entidad.descripcion)
        } else {
            setEstadoSolicitudId(0)
            setDescripcion("")
        }
    }, [props.entidad])

    return (
        <div>
            <Modal isOpen={props.isOpen} fullscreen={true} toggle={() => props.setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader toggle={() => props.setIsOpen(false)}>
                        <h1>Registro de Estado de Solicitud</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <div className="text-danger"></div>
                                <div className="form-group">
                                    <label className="control-label">Descripcion</label>
                                    <input className="form-control" id="Descripcion" name="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                    <span className="text-danger"></span>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                        {(props.entidad != null) ?
                            <>
                                <Button color="danger" onClick={handleDelete}>Eliminar</Button>
                            </>
                            :
                            <></>
                        }
                        <Button color="secondary" onClick={() => props.setIsOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div >
    )
}

export default EstadoSolicitud