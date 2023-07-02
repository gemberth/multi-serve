import { Schema } from 'mongoose'

export const CaballosSchema  = new Schema({
    nombre: { type: String, required: true },
    numero: Number,
    raza: String,
    pais: String,
    lfoto: String,
    fecha: Date,


});