import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useUsuarioApi } from "../../hooks"
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import imagenMario from '../../assets/Mario.png'
import './styles.css'


const formReceta = {
    descripcion: '',
    calorias: '',
    categorias: ''
}

export const UsuarioPage = () => {

    //PARA NAVEGAR A OTRA PAG
    const navigate = useNavigate()

    const { traerTodos, guardar } = useUsuarioApi();

    const [listaUsuario, setlistaUsuario] = useState([])
    const [estado, setestado] = useState()

    //USAR FORMULARIO
    const { onInputChange, descripcion, calorias, categorias, formState } = useForm(formReceta)

    useEffect(() => {
        traerTodosApi();
    }, [])

    const traerTodosApi = async () => {
        let data = await traerTodos();
        setlistaUsuario(data.usuarios)
    }

    const guardarDatos = async(e) => {
        e.preventDefault();
        //VALIDACIONES
        if(descripcion.length < 1)
        {
            alert("Error en la descripcion")
            return
        }

        let data = guardar({...formState})

        data.usuario

        //CONFIRMACIONES
    }

    const editarUsuario = (usuario) => {
        console.log(usuario._id)
        navigate('/usuario/'+usuario._id)
    }

    return (
        <>
            <NavBar></NavBar>

            <form onSubmit={guardarDatos}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="descripcion" name="descripcion"
                        value={descripcion} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="submit">Guardar</button>
            </form>


            <div className="contenedor">
                <h1>Pagina de usuario</h1>
                {
                    listaUsuario.map((usuario, i) => {
                        return (
                            <div key={i}>
                                <h2>{usuario.nombre}</h2>
                                <h2>{usuario.edad}</h2>
                                <h2>{usuario.email}</h2>
                                <h2>{usuario.pesoInicial}</h2>
                                <button onClick={() => editarUsuario(usuario)}>Editar</button>
                            </div>
                        )
                    })
                }
            </div>


        </>
    )
}
