import { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm,  useJineteApi } from "../../hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./styles.css";
import { Modal, Button } from "react-bootstrap";

// const formReceta = {
//   descripcion: "",
//   caloria: "",
//   categoria: "",
//   preparacion: "",
//   lfoto: "",
//   fecha: new Date(),
// };


const formReceta = {
    nombre: "",
    nacionalidad: "",
    logros: "",
    nivelEquitacion: "",
    caballo: "",
    lfoto: "",
    fecha: new Date(), 
};

export const JinetePage = () => {
  //PARA NAVEGAR A OTRA PAG
  const navigate = useNavigate();
  const { traerTodos, guardar, eliminar, actualizar } = useJineteApi();
  const [listaReceta, setlistaReceta] = useState([]);
  const [accion, setaccion] = useState("Ingresar");
  const [recetaSelecion, setrecetaSelecion] = useState({});
  const [estado, setestado] = useState();
  const [showModal, setShowModal] = useState(false);

  //USAR FORMULARIO
  const {
    onInputChange,
    formState,
    setFormState,
    nombre,
    nacionalidad,
    logros,
    nivelEquitacion,
    caballo,
    lfoto,
    // idUsuarioCreado: "",
    // fecha: new Date(),
  } = useForm(formReceta);

  useEffect(() => {
    traerTodosApi();
  }, []);

  const traerTodosApi = async () => {
    let data = await traerTodos();
    console.log(data);
    console.log(data.Jinetes);
    setlistaReceta(data.Jinetes);
  };

  // SELECIONAR PARA EDITAR
  const seleccionarReceta = (receta) => {
    setaccion("Modificar");
    setrecetaSelecion(receta)
    setFormState({
      nombre: receta.nombre,
      nacionalidad: receta.nacionalidad,
      logros: receta.logros,
      nivelEquitacion: receta.nivelEquitacion,
      caballo: receta.caballo,
      lfoto: receta.lfoto,
    });
    setShowModal(true);
  };
  // GUARDAR
  const guardarDatos = (e) => {
    e.preventDefault();
    if (accion == "Ingresar") {
      if (nombre.length < 1) {
        alert("Error en el nombre");
        return;
      }
      // console.log({...formState});
      let data = guardar({ ...formState });
      data.Jinetes;
      traerTodosApi();
    } else {
      try {
        let data = actualizar(
            
          recetaSelecion._id,
          {...formState}
          
        );
        traerTodosApi();
        setShowModal(false);
        traerTodosApi();
      } catch (error) {
        console.error(error);
      }
    }
    setFormState({
        nombre: "",
        nacionalidad: "",
        logros: "",
        nivelEquitacion: "",
        caballo: "",
      idUsuarioCreado: "",
      fecha: new Date(),
    });
    traerTodosApi();
    setShowModal(false);
  };
  // ABRIR MODAL
  const abrirModal = () => {
    setaccion("Ingresar");
    setShowModal(true);
  };
  // ELIMINAR
  const eliminarReceta = async (recetaId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar el registro?")) {
      try {
        await eliminar(recetaId);
        console.log(recetaId);
        setlistaReceta(listaReceta.filter((r) => r._id !== recetaId));
        Swal.fire({
          title: "Jinete eliminada",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="app">
        <br />
        <button className="btn btn-success" onClick={() => abrirModal()}>
          {" "}
          Agregar Jinete
        </button>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Logros</th>
              <th>Nivel Equitacion</th>
              <th>Caballo</th>
              <th>IMAGEN</th>
              <th colSpan={2}>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {listaReceta.map((receta, i) => {
              return (
                <tr key={i}>
                  <td>{receta.nombre}</td>
                  <td>{receta.nacionalidad}</td>
                  <td>{receta.logros}</td>
                  <td>{receta.nivelEquitacion}</td>
                  <td>{receta.caballo}</td>
                  {/* <td>{receta.lfoto}</td> */}
                  <td>
                    <img src={receta.lfoto} alt={receta.descripcion} />
                  </td>
                  <td>
                    <button
                      // onClick={() => setShowModal(true)}
                      onClick={() => seleccionarReceta(receta)}
                      className="btn btn-primary"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => eliminarReceta(receta._id)}
                      className="btn btn-danger"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Jinetes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="nacionalidad">Nacionalidad</label>
              <input
                id="nacionalidad"
                name="nacionalidad"
                value={nacionalidad}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="logros">Logros</label>
              <input
                id="logros"
                name="logros"
                value={logros}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="nivelEquitacion">Nivel Equitacion</label>
              <input
                id="nivelEquitacion"
                name="nivelEquitacion"
                value={nivelEquitacion}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="caballo">Caballo</label>
              <input
                id="caballo"
                name="caballo"
                value={caballo}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="lfoto">URL IMAGEN</label>
              <input
                id="lfoto"
                name="lfoto"
                value={lfoto}
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
    </>
  );
};
