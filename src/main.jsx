import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';



import ReactDOM from "react-dom/client";
import "./index.js.css";
import { ProSidebarProvider } from "react-pro-sidebar";

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
// basename={baseUrl}>
root.render(
    <BrowserRouter>
        <ProSidebarProvider>
            <App />
        </ProSidebarProvider>
    </BrowserRouter>);

