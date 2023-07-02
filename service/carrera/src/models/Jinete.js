const { model, Schema } = require("mongoose");

const JineteSchema = new Schema({ 
  
    nombre: { type: String, required: true },
    nacionalidad: String,
    fechaNacimiento: Date,
    caballo: String,
    logros: String,  
      nivelEquitacion: { type: String, }, 
      caballoID: {type: Schema.Types.ObjectId, ref: 'Caballo'},
      caballo: {type: String},
  
});

module.exports = model("Jinete", JineteSchema);