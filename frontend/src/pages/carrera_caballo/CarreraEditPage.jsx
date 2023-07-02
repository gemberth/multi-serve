import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCarreraApi, useForm } from "../../hooks";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";



export const CarreraEditPage = () => {
    const navigate = useNavigate()

    const {guardar, traerPorId, actualizar,traerPorIdCabezerra} = useCarreraApi()
    const [recetaSeleccionado, setrecetaSeleccionado] = useState({
        hipodromo: '',
        descripcion: '',
        idJinete:'',
       
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
        let data = await traerPorIdCabezerra(params.id)

        console.log(data)
        setrecetaSeleccionado(data.carrera)
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
                                    placeholder="Hipodromo"
                                    name='hipodromo'
                                    value={recetaSeleccionado.hipodromo}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Descripcion de asignacion"
                                    name='descripcion'
                                    value={recetaSeleccionado.descripcion}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ID Jinete"
                                    name='idJinete'
                                    value={recetaSeleccionado.idJinete}
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
