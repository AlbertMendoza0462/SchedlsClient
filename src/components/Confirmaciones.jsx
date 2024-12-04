import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'

export const ConfirmMessage = {
    guardado: "Guardado satisfactoriamente!",
    cargado: "Cargado satisfactoriamente!",
    noGuardado: "Hubo un error al guardar los datos!",
    noCargado: "Hubo un error al cargar los datos!",
    sesionIniciada: "Sesion iniciada satisfactioriamente!",
    usuarioIncorrecto: "Usuario y/o clave incorrectos."
}

export const SaveConfirm = (handleConfirmed) => {
    return (
        Swal.fire({
            title: 'Seguro que desea guardar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirmed()
                    .then(() => {
                        Swal.fire({
                            title: 'Guardado!',
                            text: 'Se ha procesado su solicitud correctamente.',
                            icon: 'success',
                            timer: 2000,
                            timerProgressBar: true
                        })
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'No se pudo guardar.',
                            icon: 'error',
                        })
                    })
            }
        })
    )
}

export const DeleteConfirm = (handleConfirmed) => {
    return (
        Swal.fire({
            title: 'Seguro que desea eliminar?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirmed()
            }
        })
    )
}

export const LogoutConfirm = (handleConfirmed) => {
    return (
        Swal.fire({
            title: 'Seguro que desea cerrar sesion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirmed()
            }
        })
    )
}

export const ComentarioDialog = (solicitud, handleConfirmed) => {
    return (
        Swal.fire({
            title: 'Comentario',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: (c) => {
                solicitud.Comentario = c
            },
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirmed()
            }
        })
    )
}