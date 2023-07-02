import { Document} from 'mongoose'


export interface Caballos extends Document{ 
    readonly nombre: string;
    readonly numero: number;
    readonly raza: string;
    readonly pais: string;
}