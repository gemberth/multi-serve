import './LoginPage.css';
import { useAuthStore, useForm } from "../../hooks";
import { useEffect } from 'react';
import swal from "sweetalert2";

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}


export const LoginPage = () => {

    const {startLogin, errorMsg} = useAuthStore();

    useEffect(() => {
      if (errorMsg !== undefined){
        swal.fire(
            'Error en la autentificación',
            errorMsg,
            'error'
          )
      }
    
    }, [errorMsg])
    

    const {loginEmail, loginPassword, onInputChange} = useForm(loginFormFields);
    
    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword})
    }
    
    return (
        <div className="contenedor">
            <div className="demo-content container login-container">
                <div className="row mgAuto">
                    <div className="login-form-1" style={{ magin: '0 auto' }}>
                        <h3>Ingreso al sistema de carreras</h3>
                        <form onSubmit={loginSubmit}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    name='loginEmail'
                                    value={loginEmail}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name='loginPassword'
                                    value={loginPassword}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login"
                                />
                            </div>

                            <div className="d-grid gap-2">
                                <a href="/auth/registro">Registrarse</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}