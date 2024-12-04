import { useContext, useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode";

export const getToken = () => {
    const token = localStorage.getItem('Token');
    if (token == null) {
        return ""
    }
    return token
}

export const getEmpleado = () => {
    try {
        const empleado = JSON.parse(jwt_decode(getToken()).Empleado);
        return empleado
    } catch (e) {
        return null
    }
}

export const EvaluarSesion = (navigate, location, userContext) => {
    let token = getToken()
    if (token.length) {
        ApiGet("/api/Usuario/ValidaSesion")
            .catch(d => {
                CerrarSesion(navigate, location)
            })
        userContext.setUsuarioEmpleado(getEmpleado())
        return true
    } else {
        return false
    }
}

export const IniciarSesion = (token, userContext) => {
    localStorage.setItem("Token", token)
    userContext.setUsuarioEmpleado(getEmpleado())
}

export const CerrarSesion = (userContext) => {
    localStorage.removeItem('Token');
    userContext.setUsuarioEmpleado({})
}

export const ApiGet = (ruta) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json"
        }
    };

    let promesa = new Promise((resolve, reject) => {
        axios.get(ruta, config)
            .then(response => {
                resolve({
                    response: response.data
                })
            })
            .catch(error => {
                reject({
                    error: error
                })
            })
    })
    return promesa
}

export const ApiPost = (ruta, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json"
        }
    };

    let promesa = new Promise((resolve, reject) => {
        axios.post(ruta, data, config)
            .then(response => {
                resolve({
                    response: response.data
                })
            })
            .catch(error => {
                console.log(error)
                reject({
                    error: error
                })
            })
    })
    return promesa
}

export const ApiDelete = (ruta, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-type": "application/json"
        }
    };

    let promesa = new Promise((resolve, reject) => {
        axios.delete(ruta + "/" + data, config)
            .then(response => {
                resolve({
                    response: response.data
                })
            })
            .catch(error => {
                console.log(error)
                reject({
                    error: error
                })
            })
    })
    return promesa
}