import React, { useContext, useState, Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { UserContext } from '../Contexts';
import { useNavigate } from 'react-router-dom';
import { LogoutConfirm } from './Confirmaciones';

export const NavMenu = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(true)
    const [empleadoNombre, setEmpleadoNombre] = useState(userContext.usuarioEmpleado.Nombre + " " + userContext.usuarioEmpleado.Apellido)

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    const handleCerrarSesion = () => {
        LogoutConfirm(() => {
            navigate("/logout")
        })
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <NavbarBrand>{empleadoNombre}</NavbarBrand>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink className="btn btn-danger text-white" onClick={handleCerrarSesion}>Cerrar Sesion</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}
