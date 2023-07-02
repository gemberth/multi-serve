import { useEffect, useState, } from "react";
import {  useForm, useCarreraApi, useUsuarioApi } from "../../hooks"
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import './styles.css'
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

// import './styles.css'


const formRutina = {
  hipodromo: '',
  descripcion: '',
  // categorias: ''
}

export const UserPage = () => {
  const { user } = useSelector(state => state.auth)

  //PARA NAVEGAR A OTRA PAG
  const navigate = useNavigate()

  const { traerTodos, guardar, traerPorId } = useUsuarioApi();
  const { traerPorIdUsuario, eliminar, actualizar, traerPorIdCabezerra, traerTodosCarrera } = useCarreraApi();

  const [listaUsuario, setlistaUsuario] = useState([])

  const [usuarioSeleccionado, setusuarioSeleccionado] = useState({})


  const [listaCaloriaSeleccionado, setlistaCaloriaSeleccionado] = useState([])
  // const [listaTodosSeleccionado, setlistaTodosSeleccionado] = useState([])
  // const [estado, setestado] = useState()
  const [accion, setaccion] = useState("Ingresar");
  const [showModal, setShowModal] = useState(false);
  const [rutinaSelecion, setrutinaSelecion] = useState({});
  const [listaRutina, setListaRutina] = useState([]);

  //USAR FORMULARIO

  const {
    onInputChange,
    formState,
    setFormState,
    hipodromo,
    descripcion,

  } = useForm(formRutina);
  useEffect(() => {
    traerTodosApi();
  }, [])

  const traerTodosApi = async () => {
    let data = await traerPorId(user.id);
    let recetasUsuario = await traerPorIdUsuario(user.id);
    // let todosUsuarios = await traerTodosCarrera(user.id);
    setusuarioSeleccionado(data.usuario)
    console.log(data)
    setlistaCaloriaSeleccionado(recetasUsuario.detalle)
    // setlistaTodosSeleccionado(todosUsuarios.detalle)
    console.log(recetasUsuario.detalle)
    // console.log(recetasUsuario.detalle.hipodromo)
    // 
  }

  const guardarDatosy = async (e) => {
    e.preventDefault();
    //VALIDACIONES
    if (descripcion.length < 1) {
      alert("Error en la descripcion")
      return
    }

    let data = guardar({ ...formState })

    data.usuario

    //CONFIRMACIONES
  }
  const guardarDatos = (e) => {
    e.preventDefault();
    if (accion == "Ingresar") {
      if (hipodromo.length < 1) {
        alert("Error en la descripcion");
        return;
      }
      // console.log({...formState});
      let data = guardar({ ...formState });
      data.rutina;
    } else {
      try {
        console.log(rutinaSelecion);
        let data = actualizar(
          rutinaSelecion._id,
          { ...formState }
        );
        setShowModal(false);

      } catch (error) {
        console.error(error);
      }
    }
    setFormState({
      hipodromo: '',
      descripcion: '',
    });
    traerTodosApi();
    setShowModal(false);
  };

  const abrirModal = () => {
    setaccion("Ingresar");
    setShowModal(true);
  };

  const seleccionarRutina = (rutina) => {
    setaccion("Modificar");
    console.log(rutina);
    setrutinaSelecion(rutina)
    setFormState({
      hipodromo: rutina.hipodromo,
      descripcion: rutina.descripcion,

    });
    setShowModal(true);
  };


  const eliminarDetalle = async (id) => {
    let data = await eliminar(id)
    console.log(data)
    traerTodosApi()

  }
  const editarCarrera = (usuario) => {
    navigate('/carrera/edit/' + usuario)
  }

  function formatearFecha(fecha) {
    var opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    var fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opciones);
    return fechaFormateada;
  }
  const editarUsuario = (usuario) => {
    navigate('/usuario/' + usuario._id)
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <div className="row">

          <div className="col-md-6">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Perfil de Usuario</h5>

                {

                  <div>
                    <p className="card-text"><b>Nombre:</b> {usuarioSeleccionado.nombre}</p>
                    <p className="card-text"><b>Edad:</b> {usuarioSeleccionado.edad}</p>
                    <p className="card-text"><b>Correo:</b> {usuarioSeleccionado.email}</p>
                    <p className="card-text"><b>Nivel de Equitacion:</b>  {usuarioSeleccionado.nivelEquitacion}</p>
                    <button className="btn btn-success" onClick={() => editarUsuario(usuarioSeleccionado)}>Editar</button>
                  </div>
                }

                <div className="card-body" >
                </div>

              </div>
            </div>
          </div>



          <div className="col-md-13">

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Carrera Asignada del Usuario logeado</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre del Jinete</th>
                      <th>Nivel</th>
                      <th>Nacionalidad</th>
                      <th>Nombre del Caballo</th>
                      <th>Numero del Caballo</th>
                      <th>Raza del Caballo</th>
                      <th>Lugar Asignado</th>
                      <th>Descripcion de tareas</th>
                      {/* <th>Raza del asignacion</th>               */}
                      <th>Fecha de asignacion</th>
                      <th colSpan={2}>ACCION</th>
                      {/* <th colSpan={1}>Editar</th> */}
                    </tr>
                    {
                      listaCaloriaSeleccionado.length > 0 ?
                        <>
                          {
                            listaCaloriaSeleccionado.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.idUsuario.nombre}</td>
                                  <td>{item.idUsuario.nivelEquitacion}</td>
                                  <td>{item.idUsuario.nacionalidad}</td>
                                  <td>{item.idCaballo.nombre}</td>
                                  <td>{item.idCaballo.numero}</td>
                                  <td>{item.idCaballo.raza}</td>
                                  <td>{item.hipodromo}</td>
                                  <td>{item.descripcion}</td>
                                  <td>{formatearFecha(item.fecha)}</td>
                                  <td><button className="btn btn-danger" onClick={() => eliminarDetalle(item._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                                  <td><button className="btn btn-success" onClick={() => seleccionarRutina(item)}><FontAwesomeIcon icon={faEdit} /></button></td>
                                </tr>
                              )
                            })

                          }
                        </>
                        :
                        <></>
                    }
                  </thead>

                </table>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Agregar Rutina</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-group">
                      <label htmlFor="descripcion">Hipodromo</label>
                      <input
                        id="hipodromo"
                        name="hipodromo"
                        value={hipodromo}
                        onChange={onInputChange}
                        className="form-control"
                        required
                      />
                      <br />
                      <label htmlFor="descripcion">DESCRIPCION</label>
                      <input
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={onInputChange}
                        className="form-control"
                        required
                      />
                      <br />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(event) => guardarDatos(event)}
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                  </Modal.Footer>
                </Modal>


              </div>
            </div>
          </div>


     
        </div>

      </div>


    </>
  )
}
