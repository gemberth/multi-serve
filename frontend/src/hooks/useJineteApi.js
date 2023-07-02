import { useDispatch, useSelector } from "react-redux"
import { hipodromoApi } from "../api";

export const useJineteApi= () => {
    const { status,user,errorMsg, } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    
    const traerTodos = async() => {
        try {
            const {data} = await hipodromoApi.get('/jinetes')
            return data
        } catch (error) {
            let data = {}
            data.errorMsg = "Error al traer todos los registros"
            return data
        }
    }
    const eliminar = async (id) => {
        try {
          const { data } = await hipodromoApi.delete(`/jinetes/delete/${id}`);
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer el registro";
        }
      };

      const guardar = async (newData) => {
        console.log(newData);
        try {
          const { data } = await hipodromoApi.post("/jinetes/create", newData);
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer todos los registros";
        }
      };

      const actualizar = async (id, newData) => {
        try {
          const { data } = await hipodromoApi.put(`/jinetes/update/${id}`, { ...newData });
          return data;
        } catch (error) {
          let data = {};
          data.errorMsg = "Error al traer el registro";
        }
      };


    //
    return {
        traerTodos, 
        eliminar,
        guardar,
        actualizar,
    }

}
