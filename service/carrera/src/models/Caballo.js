
const { model, Schema } = require("mongoose");

const CaballosSchema = new Schema({ 
  
    nombre: { type: String, required: true },
    numero: Number,
    raza: String,
    pais: String,
  
});

module.exports = model("Caballo", CaballosSchema);
