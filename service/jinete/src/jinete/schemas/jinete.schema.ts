import { Schema } from 'mongoose'

export const JineteSchema  = new Schema({
    nombre: { type: String, required: true },
    nacionalidad: String,
    // caballo: String,
    logros: String,
    nivelEquitacion: { type: String, }, 
    caballoID: {type: Schema.Types.ObjectId, ref: 'Caballo'},
    caballo: {type: String},
    lfoto: {type: String},


});