import { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import {  useForm,  useCaballoApi,useCarreraApi } from "../../hooks";
import "./styles.css";

import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const formReceta = {
  descripcion: "",
  calorias: "",
  categorias: "",
  preparacion: "",
};

export const CarreraPage = () => {
  //PARA NAVEGAR A OTRA PAG
  const navigate = useNavigate();
  const { traerTodos, guardar } = useCaballoApi();
  const { guardar: guardarDetalle } = useCarreraApi();
  const [listaReceta, setlistaReceta] = useState([]);
  const [estado, setestado] = useState();
  const { user } = useSelector((state) => state.auth);

  //USAR FORMULARIO
  // const { onInputChange, descripcion, calorias, categorias,preparacion, formState } =
  // useForm(formReceta);

  useEffect(() => {
    traerTodosApi();
  }, []);

  const traerTodosApi = async () => {
    let data = await traerTodos();
    console.log(data);
    console.log(data.Caballos);
    
    setlistaReceta(data.Caballos);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    //VALIDACIONES
    if (descripcion.length < 1) {
      alert("Error en la descripcion");
      return;
    }

    let data = guardar({ ...formState });

    data.receta;

    //CONFIRMACIONES
  };

  const editarReceta = (receta) => {
    console.log(receta._id);
    navigate("/carrera/" + receta._id);
  };
  const CRUDReceta = () => {
    navigate("/carrera/new");
  };

  const agregarReceta = async (receta) => {
    let detalle = {
        idUsuario: user.id,
        idCaballo: receta._id,
        idJinete: user.id,
        hipodromo: "Hipodromo 1",
        descripcion: "Carrera 1",
    };
    const data = await guardarDetalle(detalle);
  };

  return (
    <>
      <NavBar></NavBar>

      <div className="app-receta">
        <br />
        <button onClick={() => CRUDReceta()} className="btn btn-success">
          {" "}
          Registrar Equino
        </button>
        <h2>Selecionar Equino </h2>
        <br />
        <div className="receta-container">
          {listaReceta.map((receta, i) => {
            return (
              <div key={i} className="receta-card">
                <h2>Descripcion del Equino: </h2>
                <p>Nombre: {receta.nombre}</p>
                <p>N°:  {receta.numero}</p>
                <p>Raza: {receta.raza}</p>
                <p>Preparacion: {receta.preparacion}</p>
                <p>Pais de origen: {receta.pais}</p>
                <img src={receta.lfoto} alt="" />
                <br />
                <br />
                <button
                  className="btn btn-success"
                  // onClick={() => agregarReceta(receta)}
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: "¿Agregar Caballo?",
                      text: "¿Estás seguro que deseas agregar este Caballo?",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonText: "Agregar",
                      cancelButtonText: "Cancelar",
                    });

                    if (result.isConfirmed) {
                      agregarReceta(receta);
                      Swal.fire({
                        title: "Caballo agregado",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
