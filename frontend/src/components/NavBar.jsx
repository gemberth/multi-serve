import { useAuthStore, useForm } from "../hooks/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from  "react-router-dom";
import { AppRouter } from '../router';
import './style.css'


export const NavBar = () => {
    const { startLogout, errorMsg } = useAuthStore();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/">
                        <img src="vite.svg" width={45} hight={45}/>
                        
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/user">Perfil Jinete</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/carrera">Carrera</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/jinete">Jinete</a>
                            </li>                          

                        </ul>
                        <button className="fas fa-sign-out-alt btn-outline-danger" onClick={startLogout}>  Salir  <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                                                     
                    </div>
                </div>
            </nav>
        </>
    )
}
