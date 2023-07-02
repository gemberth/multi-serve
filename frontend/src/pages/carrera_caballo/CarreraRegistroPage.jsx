import { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm,  useCaballoApi } from "../../hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "./styles2.css";
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
    numero: 0,
    raza: "",
    pais: "",
  lfoto: "",
  fecha: new Date(), 
};

export const CarreraRegistroPage = () => {
  //PARA NAVEGAR A OTRA PAG
  const navigate = useNavigate();
  const { traerTodos, guardar, eliminar, actualizar } = useCaballoApi();
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
    numero,
    raza,
    pais,
    lfoto,
    // idUsuarioCreado: "",
    // fecha: new Date(),
  } = useForm(formReceta);

  useEffect(() => {
    traerTodosApi();
  }, []);

  const traerTodosApi = async () => {
    let data = await traerTodos();
    setlistaReceta(data.Caballos);
  };

  // SELECIONAR PARA EDITAR
  const seleccionarReceta = (receta) => {
    setaccion("Modificar");
    setrecetaSelecion(receta)
    setFormState({
      nombre: receta.nombre,
      numero: receta.numero,
      raza: receta.raza,
      pais: receta.pais,
      lfoto: receta.lfoto,
    });
    setShowModal(true);
  };

  // GUARDAR
  const guardarDatos = (e) => {
    e.preventDefault();
    if (accion == "Ingresar") {
      if (nombre.length < 1) {
        alert("Error en la descripcion");
        return;
      }
      // console.log({...formState});
      let data = guardar({ ...formState });
      data.Caballos;
      traerTodosApi();
    } else {
      try {
        let data = actualizar(
            
          recetaSelecion._id,
          {...formState}
          
        );
        setShowModal(false);
        traerTodosApi();
      } catch (error) {
        console.error(error);
      }
    }
    setFormState({
        nombre: "",
        numero: 0,
        raza: "",
        pais:"",
      lfoto: "",
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
    if (window.confirm("¿Estás seguro de que deseas eliminar este regristro?")) {
      try {
        await eliminar(recetaId);
        console.log(recetaId);
        setlistaReceta(listaReceta.filter((r) => r._id !== recetaId));
        Swal.fire({
          title: "Caballo eliminada",
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
          Agregar Caballo
        </button>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>NUMERO DE COMPETENCIA</th>
              <th>RAZA DEL CABALLO</th>
              <th>PAIS DE ORIGEN</th>
              <th>IMAGEN</th>
              <th colSpan={2}>ACCION</th>
            </tr>
          </thead>
          <tbody>
            {listaReceta.map((receta, i) => {
              return (
                <tr key={i}>
                  <td>{receta.nombre}</td>
                  <td>{receta.numero}</td>
                  <td>{receta.raza}</td>
                  <td>{receta.pais}</td>
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
            <Modal.Title>Agregar Caballo</Modal.Title>
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
              <label htmlFor="numero">Numero de competencia</label>
              <input
                id="numero"
                name="numero"
                value={numero}
                onChange={onInputChange}
                className="form-control"
                type="number"
                min="0"
                required
              />
              <br />
              <label htmlFor="raza">Raza</label>
              <input
                id="raza"
                name="raza"
                value={raza}
                onChange={onInputChange}
                className="form-control"
                required
              />
              <br />
              <label htmlFor="pais">Pais</label>
              <input
                id="pais"
                name="pais"
                value={pais}
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
