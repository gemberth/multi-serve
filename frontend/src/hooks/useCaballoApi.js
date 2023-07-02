import { useDispatch, useSelector } from "react-redux";
import { hipodromoApi } from "../api";

export const useCaballoApi = () => {
  const { status, user, errorMsg } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const traerTodos = async () => {
    try {
      const { data } = await hipodromoApi.get("/caballos");
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer todos los registros";
      return data;
    }
  };

  const guardar = async (newData) => {
    console.log(newData);
    newData.idUsuarioCreado=user.id
    try {
      const { data } = await hipodromoApi.post("/caballos/create", newData);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer todos los registros";
    }
  };

  const traerPorId = async (id) => {
    try {
      const { data } = await hipodromoApi.get(`/caballos/${id}`);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };

  // metodo de editar
  const actualizar = async (id, newData) => {
    try {
      const { data } = await hipodromoApi.put(`/caballos/update/${id}`, { ...newData });
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };

  const eliminar = async (id) => {
    try {
      const { data } = await hipodromoApi.delete(`/caballos/delete/${id}`);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };
  const eliminarTodos = async () => {
    try {
      const { data } = await hipodromoApi.delete(`/caballos/`);
      return data;
    } catch (error) {
      let data = {};
      data.errorMsg = "Error al traer el registro";
    }
  };

  return {
    guardar,
    traerTodos,
    traerPorId,
    actualizar,
    eliminar,
    eliminarTodos,
  };
};
