import { useDispatch, useSelector } from "react-redux"
import { hipodromoApi } from "../api";


export const useCarreraApi= () => {

    const guardar = async(newData) => {
        try {
            const {data} = await hipodromoApi.post('/carrera/crear', newData)
            console.log(data)
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al guardar los registros"
        }
    }

    const traerPorIdUsuario = async(id) => {
        try {
            const {data} = await hipodromoApi.get(`/carrera/${id}`)
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer el registro"
        }
    }
    const traerPorIdCabezerra = async(id) => {
        try {
            const {data} = await hipodromoApi.get(`/carrera/id/${id}`)
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer el registro"
        }
    }
    const traerTodosCarrera = async(id) => {
        try {
            const {data} = await hipodromoApi.get(`/carrera/detalle`)
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer el registro"
        }
    }
    const eliminar = async (id) => {
        try {
          const { data } = await hipodromoApi.delete(`/carrera/${id}`);
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer el registro";
        }
      };

      const actualizar = async (id, newData) => {
        try {
          const { data } = await hipodromoApi.put(`/carrera/${id}`, { ...newData });
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer el registro";
        }
      };

    return {
        guardar,
        traerPorIdUsuario,
        eliminar,
        traerTodosCarrera,
        traerPorIdCabezerra,
        actualizar
    }
}