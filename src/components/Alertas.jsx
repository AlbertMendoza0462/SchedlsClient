import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'reactstrap'

const tiempoTimeout = 5000

export const AlertMessage = {
    guardado: "Guardado satisfactoriamente!",
    cargado: "Cargado satisfactoriamente!",
    noGuardado: "Hubo un error al guardar los datos!",
    noCargado: "Hubo un error al cargar los datos!",
    sesionIniciada: "Sesion iniciada satisfactioriamente!",
    usuarioIncorrecto: "Usuario y/o clave incorrectos."
}

export const SuccessAlert = ({ mensaje }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        let timeout = setTimeout(() => {
            setVisible(false)
        }, tiempoTimeout)
        return () => clearTimeout(timeout);
    }, [])

    return (
        <Alert
            color="success"
            isOpen={visible}
            toggle={() => { setVisible(false) }}
        >{mensaje}</Alert>
    )
}

export const ErrorAlert = ({ mensaje }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        let timeout = setTimeout(() => {
            setVisible(false)
        }, tiempoTimeout)
        return () => clearTimeout(timeout);
    }, [])

    return (
        <Alert
            color="danger"
            isOpen={visible}
            toggle={() => { setVisible(false) }}
        >{mensaje}</Alert>
    )
}