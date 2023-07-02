const { Schema, model } = require('mongoose');

const CarreraSchema = new Schema({
  // id: { type: String, required: true },
  idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuario'},
  idCaballo: { type: Schema.Types.ObjectId, ref: 'Caballo'},
  idJinete: { type: Schema.Types.ObjectId, ref: 'Jinete'},
  hipodromo: { type: String },
  descripcion: { type: String },
  // idReceta: { type: Schema.Types.ObjectId, ref: 'Receta'},
  fecha: { type: Date, default: Date.now },
});

module.exports = model('Carrera', CarreraSchema);