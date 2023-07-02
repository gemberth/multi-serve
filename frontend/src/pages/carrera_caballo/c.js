const agregarCarrera = async (caballo) => {
    let detalle = {
    //   idReceta: caballo._id,
      idUsuario: user.id,
      idCaballo: caballo._id,
      idJinete: user.id,
      hipodromo: "Hipodromo 1",
      descripcion: "Carrera 1",


    };
    const data = await guardarDetalle(detalle);
  };
  const formReceta = {
    nombre: "",
    numero: 0,
    raza: "",
    pais: "",
  lfoto: "",
  fecha: new Date(), 
};

import { Schema } from 'mongoose'

export const JineteSchema  = new Schema({
    nombre: { type: String, required: true },
    nacionalidad: String,    
    logros: String,
    nivelEquitacion: { type: String, }, 
    caballoID: {type: Schema.Types.ObjectId, ref: 'Caballo'},
    caballo: {type: String},


});