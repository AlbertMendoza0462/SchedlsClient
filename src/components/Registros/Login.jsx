import React, { useContext, useRef, useState } from 'react';
import { Container } from 'reactstrap'
import { Navbar, NavbarBrand } from 'reactstrap';
import { ApiPost, IniciarSesion } from '../../Api';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertContext, UserContext } from '../../Contexts';
import { AlertMessage, ErrorAlert, SuccessAlert } from '../Alertas';

const Login = () => {
    const alertContext = useContext(AlertContext)
    const userContext = useContext(UserContext)
    const [correo, setCorreo] = useState("")
    const [clave, setClave] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = (e) => {
        e.preventDefault()

        const credenciales = {
            Correo: correo,
            Clave: clave
        }

        ApiPost("/api/Usuario/Login", credenciales)
            .then(d => {
                let token = d.response
                IniciarSesion(token, userContext)
                alertContext.setAlertas((al) => [...al, {
                    Alerta: SuccessAlert,
                    mensaje: AlertMessage.sesionIniciada
                }])
                navigate("/", {
                    state: {
                        from: location
                    }
                })
            })
            .catch(d => {
                alertContext.setAlertas((al) => [...al, {
                    Alerta: ErrorAlert,
                    mensaje: AlertMessage.usuarioIncorrecto
                }])
                console.log(d)
            })
    }

    return (
        <div>
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand>Schedls</NavbarBrand>
                </Navbar>
            </header>
            <Container>
                <div>
                    <h1>Login</h1>

                    <hr />
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className="text-danger"></div>
                                <div className="form-group">
                                    <label className="control-label">Correo</label>
                                    <input className="form-control" id="Correo" name="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                    <span className="text-danger"></span>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Clave</label>
                                    <input className="form-control" id="Clave" name="Clave" type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
                                    <span className="text-danger"></span>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    )
}

export default Login