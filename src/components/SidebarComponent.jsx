import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, Menu, SubMenu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import { CantSolicitudesActivasContext, UserContext } from '../Contexts';

const getIsCollapsedStorage = () => {
    let isCollapsed = localStorage.getItem('IsCollapsed');
    if (isCollapsed == null) {
        return false
    }
    return isCollapsed
}

const SidebarComponent = () => {
    const userContext = useContext(UserContext)
    const cantSolicitudesActivasContext = useContext(CantSolicitudesActivasContext)
    const navigate = useNavigate()
    const { collapseSidebar } = useProSidebar();

    return (
        <div>
            <Sidebar
                style={{ height: "100vh" }}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar()
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>Schedls</h2>
                    </MenuItem>
                    <MenuItem icon={<HomeOutlinedIcon />} onClick={() => navigate("/")}>Home</MenuItem>
                    <MenuItem icon={<CalendarTodayOutlinedIcon />} onClick={() => navigate("/calendario")}>Calendario</MenuItem>
                    {(userContext.usuarioEmpleado.IsAdmin) ?
                        <MenuItem icon={<EventNoteOutlinedIcon />} onClick={() => navigate("/turno")}>Turnos</MenuItem>
                        : <></>}
                    <MenuItem icon={<LoopOutlinedIcon />} onClick={() => navigate("/solicitudCambio")}>
                        Cambios {(cantSolicitudesActivasContext.cantidad) ? <span className="badge text-bg-danger">{cantSolicitudesActivasContext.cantidad}</span> : <></>}
                    </MenuItem>
                    <SubMenu icon={<AccountCircleOutlinedIcon />} label="Usuarios">
                        <MenuItem icon={<ViewListOutlinedIcon />} onClick={() => navigate("/usuario")}>Mantenimiento</MenuItem>
                        <MenuItem icon={<PeopleOutlinedIcon />} onClick={() => navigate("/usuario/cambioClave")}>Cambio de Clave</MenuItem>
                    </SubMenu>
                    {(userContext.usuarioEmpleado.IsAdmin) ? <>
                        <MenuItem icon={<BallotOutlinedIcon />} onClick={() => navigate("/estadoSolicitud")}>Estado de Solicitud</MenuItem>
                        <MenuItem icon={<StyleOutlinedIcon />} onClick={() => navigate("/tipoTurno")}>Tipos de Turnos</MenuItem>
                    </>
                        : <></>}
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SidebarComponent