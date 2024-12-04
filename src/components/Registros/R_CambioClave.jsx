import React, { useContext, useRef, useState } from 'react';
import axios from 'axios'
import { ApiPost } from '../../Api';
import { AlertContext } from '../../Contexts';
import { SuccessAlert, ErrorAlert, AlertMessage } from '../Alertas';
import { SaveConfirm } from '../Confirmaciones';

const CambioClave = () => {
    const alertContext = useContext(AlertContext)
    const [loading, setLoading] = useState([])
    const [claveActual, setClaveActual] = useState("")
    const [claveNueva, setClaveNueva] = useState("")
    const [claveConfirmacion, setClaveConfirmacion] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const claves = {
            claveActual: claveActual,
            claveNueva: claveNueva,
            claveConfirmacion: claveConfirmacion
        }
        console.log(claves)

        SaveConfirm(() => {
            return new Promise((resolve, reject) => {
                ApiPost("/api/Usuario/CambiarClave", claves)
                    .then(d => {
                        alertContext.setAlertas((al) => [...al, {
                            Alerta: SuccessAlert,
                            mensaje: AlertMessage.guardado
                        }])
                        console.log(d.response)
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

    return (
        <div>
            <h1>Cambio de Clave</h1>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="text-danger"></div>
                        <div className="form-group">
                            <label className="control-label">Clave Actual</label>
                            <input className="form-control" id="ClaveActual" name="ClaveActual" type="password" value={claveActual} onChange={(e) => setClaveActual(e.target.value)} />
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Clave Nueva</label>
                            <input className="form-control" id="ClaveNueva" name="ClaveNueva" type="password" value={claveNueva} onChange={(e) => setClaveNueva(e.target.value)} />
                            <span className="text-danger"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Confirmacion de Clave Nueva</label>
                            <input className="form-control" id="ClaveConfirmacion" name="ClaveConfirmacion" type="password" value={claveConfirmacion} onChange={(e) => setClaveConfirmacion(e.target.value)} />
                            <span className="text-danger"></span>
                        </div>
                        <hr />
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CambioClave