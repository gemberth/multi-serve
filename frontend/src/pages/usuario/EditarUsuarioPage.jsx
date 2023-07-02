import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsuarioApi, useForm } from "../../hooks";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

// const recetaFormFields = {
//     descripcion: '',
//     caloria: '',
//     categoria: '',
//     preparacion: '',
//     lfoto: '',
//     // descripcion: '',
   
// }

export const EditarUsuarioPage = () => {
    const navigate = useNavigate()

    const {guardar, traerPorId, actualizar} = useUsuarioApi()
    const [recetaSeleccionado, setrecetaSeleccionado] = useState({
        nombre: '',
        edad: '',
        nacionalidad:'',
        nivelEquitacion:'',
        fechaNacimiento: '',
        email: '',
        // lfoto: '',
    })
    const params = useParams();
    const onInputChanged = ({ target }) => {
        setrecetaSeleccionado({
            ...recetaSeleccionado,
            [target.name]: target.value
        })
    }

    const onDateChanged = ( event, changing ) => {
      setFormValues({
          ...formValues,
          [changing]: event
      })
  }

  
    useEffect(() => {
 
        traerPorIdApi()
    }, [])
    // const { descripcion, caloria,categoria, preparacion, lfoto,  onInputChange } = useForm(recetaFormFields);
    const registerSubmit = (e) => {
        e.preventDefault();
        actualizar(params.id,recetaSeleccionado)
        navigate('/user')
    }
    const traerPorIdApi = async() => {
        console.log(params.id)
        let data = await traerPorId(params.id)

        console.log(data)
        setrecetaSeleccionado(data.usuario)
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     footer: '<a href="">Why do I have this issue?</a>'
        //   })
    }
    

  return (
    <>
    <div className="contenedor mb-3">
            <div className="demo-content container login-container">
                <div className="row mgAuto">
                    <div className="login-form-1" style={{ magin: '0 auto' }}>
                        <h3>Ingreso</h3>
                        <form onSubmit={registerSubmit}>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name='nombre'
                                    value={recetaSeleccionado.nombre}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Edad"
                                    name='edad'
                                    value={recetaSeleccionado.edad}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nivel Equitacion"
                                    name='nivelEquitacion'
                                    value={recetaSeleccionado.nivelEquitacion}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nacionalidad"
                                    name='nacionalidad'
                                    value={recetaSeleccionado.nacionalidad}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                            
                            <div class="input-group">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="fechaNacimiento"
                                    name='fechaNacimiento'
                                    value={recetaSeleccionado.fechaNacimiento}
                                    onChange={onInputChanged}
                                />
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    name='email'
                                    value={recetaSeleccionado.email}
                                    onChange={onInputChanged}
                                />
                            </div>
                                                     
                            <div className="d-grid gap-2">
                                <input
                                    type="submit"
                                    className="btnSubmit"
                                    value="Registrarse"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        
    </>
  )
}
