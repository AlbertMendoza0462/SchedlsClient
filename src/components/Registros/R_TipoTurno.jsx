import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { ApiDelete, ApiPost } from '../../Api';
import { AlertContext } from '../../Contexts';
import { SuccessAlert, ErrorAlert, AlertMessage } from '../Alertas';
import { DeleteConfirm, SaveConfirm } from '../Confirmaciones';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TipoTurno = (props) => {
    const alertContext = useContext(AlertContext)
    const [loading, setLoading] = useState([])
    const [tipoTurnoId, setTipoTurnoId] = useState(0)
    const [descripcion, setDescripcion] = useState("")
    const [abreviatura, setAbreviatura] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const usuario = {
            TipoTurnoId: tipoTurnoId,
            Descripcion: descripcion,
            Abreviatura: abreviatura,
        }
        console.log(usuario)

        SaveConfirm(() => {
            return new Promise((resolve, reject) => {
                ApiPost("/api/TipoTurno", usuario)
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
                ApiDelete("/api/TipoTurno", tipoTurnoId)
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
            setTipoTurnoId(props.entidad.tipoTurnoId)
            setDescripcion(props.entidad.descripcion)
            setAbreviatura(props.entidad.abreviatura)
        } else {
            setTipoTurnoId(0)
            setDescripcion("")
            setAbreviatura("")
        }
    }, [props.entidad])

    return (
        <div>
            <Modal isOpen={props.isOpen} fullscreen={true} toggle={() => props.setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader toggle={() => props.setIsOpen(false)}>
                        <h1>Registro de Tipo de Turno</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                                <div className="text-danger"></div>
                                <div className="form-group">
                                    <label className="control-label">Descripción</label>
                                    <input className="form-control" id="Descripcion" name="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                    <span className="text-danger"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Abreviatura</label>
                                    <input className="form-control" id="Abreviatura" name="Abreviatura" value={abreviatura} onChange={(e) => setAbreviatura(e.target.value)} />
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

export default TipoTurno