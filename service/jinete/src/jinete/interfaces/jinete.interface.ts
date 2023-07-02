import { Document} from 'mongoose'


export interface Jinete extends Document{ 
    readonly nombre: string;
    readonly nacionalidad: string;
    readonly caballo: string;
    readonly logros: string;
}