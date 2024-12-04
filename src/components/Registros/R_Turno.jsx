import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { ApiDelete, ApiGet, ApiPost } from '../../Api';
import { AlertContext } from '../../Contexts';
import { SuccessAlert, ErrorAlert, AlertMessage } from '../Alertas';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { esES } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DeleteConfirm, SaveConfirm } from '../Confirmaciones';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const theme = createTheme(esES);

const Turno = (props) => {
    const alertContext = useContext(AlertContext)
    const [loading, setLoading] = useState(true)
    const [turnoId, setTurnoId] = useState(0)
    const [empleadoId, setEmpleadoId] = useState(0)
    const [tipoTurnoId, setTipoTurnoId] = useState(0)
    const [fechaInicio, setFechaInicio] = useState("")
    const [cantHorasEnDiaDeSemana, setCantHorasEnDiaDeSemana] = useState("")
    const [cantHorasEnFinDeSemana, setCantHorasEnFinDeSemana] = useState("")
    const [intervaloDeDias, setIntervaloDeDias] = useState(1)

    const [usuarios, setUsuarios] = useState([])
    const [tiposTurnos, setTiposTurnos] = useState([])
    const [fechaInicioComponent, setFechaInicioComponent] = useState(dayjs(new Date().toLocaleString()))
    const [cantHorasEnDiaDeSemanaComponent, setCantHorasEnDiaDeSemanaComponent] = useState(() => {
        let time = new Date()
        time.setHours(8)
        time.setMinutes(0)
        time.setSeconds(0)
        time.setMilliseconds(0)
        return dayjs(time.toLocaleString())
    })
    const [cantHorasEnFinDeSemanaComponent, setCantHorasEnFinDeSemanaComponent] = useState(() => {
        let time = new Date()
        time.setHours(8)
        time.setMinutes(0)
        time.setSeconds(0)
        time.setMilliseconds(0)
        return dayjs(time.toLocaleString())
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const turno = {
            turnoId: turnoId,
            usuarioId: empleadoId,
            tipoTurnoId: tipoTurnoId,
            fechaInicio: fechaInicio,
            cantHorasEnDiaDeSemana: cantHorasEnDiaDeSemana,
            cantHorasEnFinDeSemana: cantHorasEnFinDeSemana,
            intervaloDeDias: intervaloDeDias
        }
        console.log(turno)

        SaveConfirm(() => {
            return new Promise((resolve, reject) => {
                ApiPost("/api/Turno", turno)
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
                ApiDelete("/api/Turno", turnoId)
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
            setTurnoId(props.entidad.turnoId)
            setEmpleadoId(props.entidad.usuarioId)
            setTipoTurnoId(props.entidad.tipoTurnoId)
            setIntervaloDeDias(props.entidad.intervaloDeDias)
            setFechaInicioComponent(dayjs(props.entidad.fechaInicio))
            setCantHorasEnDiaDeSemanaComponent(() => {
                let nums = props.entidad.cantHorasEnDiaDeSemana.split(":")
                let time = new Date()
                time.setHours(nums[0])
                time.setMinutes(nums[1])
                time.setSeconds(nums[2])
                time.setMilliseconds(0)
                return dayjs(time.toLocaleString())
            })
            setCantHorasEnFinDeSemanaComponent(() => {
                let nums = props.entidad.cantHorasEnFinDeSemana.split(":")
                let time = new Date()
                time.setHours(nums[0])
                time.setMinutes(nums[1])
                time.setSeconds(nums[2])
                time.setMilliseconds(0)
                return dayjs(time.toLocaleString())
            })
        } else {
            setTurnoId(0)
            setEmpleadoId(0)
            setTipoTurnoId(0)
            setIntervaloDeDias(0)
            setFechaInicioComponent(dayjs(new Date().toLocaleString()))
            setCantHorasEnDiaDeSemanaComponent(() => {
                let time = new Date()
                time.setHours(8)
                time.setMinutes(0)
                time.setSeconds(0)
                time.setMilliseconds(0)
                return dayjs(time.toLocaleString())
            })
            setCantHorasEnFinDeSemanaComponent(() => {
                let time = new Date()
                time.setHours(8)
                time.setMinutes(0)
                time.setSeconds(0)
                time.setMilliseconds(0)
                return dayjs(time.toLocaleString())
            })
        }
    }, [props.entidad])

    useEffect(() => {
        setFechaInicio(fechaInicioComponent.format("YYYY-MM-DDTHH:mm:ss"))
    }, [fechaInicioComponent])

    useEffect(() => {
        setCantHorasEnDiaDeSemana(cantHorasEnDiaDeSemanaComponent.format("HH:mm:ss"))
    }, [cantHorasEnDiaDeSemanaComponent])

    useEffect(() => {
        setCantHorasEnFinDeSemana(cantHorasEnFinDeSemanaComponent.format("HH:mm:ss"))
    }, [cantHorasEnFinDeSemanaComponent])

    const solicitarData = () => {
        ApiGet("/api/TipoTurno")
            .then(d => {
                setTiposTurnos(d.response)
            })
            .catch(d => {
                alertContext.setAlertas((al) => [...al, {
                    Alerta: ErrorAlert,
                    mensaje: AlertMessage.noCargado
                }])
                console.log(d)
            })
        ApiGet("/api/Usuario")
            .then(d => {
                setUsuarios(d.response)
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
        solicitarData();
    }, [])

    return (
        <div>
            <Modal isOpen={props.isOpen} fullscreen={true} toggle={() => props.setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader toggle={() => props.setIsOpen(false)}>
                        <h1>Registro de Turno</h1>
                    </ModalHeader>
                    <ModalBody>
                        <ThemeProvider theme={theme}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-4">
                                    <div className="text-danger"></div>
                                    <div className="form-group">
                                        <label className="control-label">Empleado</label>
                                        <select value={empleadoId} className="form-select" onChange={(e) => setEmpleadoId(e.target.value)}>
                                            <option value="0" disabled></option>
                                            {usuarios.map((usuario, key) => {
                                                return (
                                                    <option key={key} selected={(usuario.empleadoId == empleadoId)} value={usuario.empleadoId}>{usuario.nombre + " " + usuario.apellido}</option>
                                                )
                                            })}
                                        </select>
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Tipo de Turno</label>
                                        <select value={tipoTurnoId} className="form-select" onChange={(e) => setTipoTurnoId(e.target.value)}>
                                            <option value="0" disabled></option>
                                            {tiposTurnos.map((tipoTurno, key) => {
                                                return (
                                                    <option key={key} selected={(tipoTurno.tipoTurnoId == tipoTurnoId)} value={tipoTurno.tipoTurnoId}>{tipoTurno.descripcion}</option>
                                                )
                                            })}
                                        </select>
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Fecha de Inicio</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoItem>
                                                <MobileDateTimePicker className="form-control" id="Fecha" name="Fecha" format="DD/MM/YYYY hh:mm a" value={fechaInicioComponent} onChange={(e) => setFechaInicioComponent(e)} />
                                            </DemoItem>
                                        </LocalizationProvider>
                                        <span className="text-danger"></span>
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                        <div className="form-group">
                                            <label className="control-label">Horas en Dia de Semana</label>
                                            <DemoItem>
                                                <MobileTimePicker className="form-control" id="Fecha" name="Fecha" format="HH:mm:ss" value={cantHorasEnDiaDeSemanaComponent} onChange={(e) => setCantHorasEnDiaDeSemanaComponent(e)} />
                                            </DemoItem>
                                            <span className="text-danger"></span>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Horas en Fin de Semana</label>
                                            <DemoItem>
                                                <MobileTimePicker className="form-control" id="Fecha" name="Fecha" format="HH:mm:ss" value={cantHorasEnFinDeSemanaComponent} onChange={(e) => setCantHorasEnFinDeSemanaComponent(e)} />
                                            </DemoItem>
                                            <span className="text-danger"></span>
                                        </div>
                                    </ LocalizationProvider>
                                    <div className="form-group">
                                        <label className="control-label">Intervalo de Dias</label>
                                        <input type="number" min="1" className="form-control" id="IntervaloDeDias" name="IntervaloDeDias" value={intervaloDeDias} onChange={(e) => setIntervaloDeDias(e.target.value)} />
                                        <span className="text-danger"></span>
                                    </div>
                                </div>
                            </div>
                        </ThemeProvider>
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
        </div>
    )
}

export default Turno