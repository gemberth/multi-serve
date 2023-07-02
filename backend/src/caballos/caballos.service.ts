import { Injectable } from '@nestjs/common';
import { Model} from 'mongoose'
import { InjectModel} from '@nestjs/mongoose'

import { Caballos} from './interfaces/caballos.interface'
import { CreateCaballosDTO} from './dto/caballos.dto'


@Injectable()
export class CaballosService {
    constructor (@InjectModel('Caballos') private readonly caballosModel:Model <Caballos>) {}

    async getCaballos(): Promise <Caballos []> {
        
       const caballos=  await this.caballosModel.find ()
        return caballos

    }

    
   async getCaballo (CaballoID: string ): Promise <Caballos> {
      const caballo = await this.caballosModel.findById(CaballoID);
        return caballo;
        
    }


   async createCaballo (CreateCaballosDTO : CreateCaballosDTO): Promise <Caballos> {
        const caballo = new this.caballosModel(CreateCaballosDTO);
        return await caballo.save();

    }

    async deleteCaballo (CaballoID:string): Promise <Caballos> {
        const deleteCaballo = await this.caballosModel.findByIdAndDelete(CaballoID);
        return deleteCaballo
    
        }


    
    async updateCaballo(CaballoID:string, CreateCaballosDTO: CreateCaballosDTO): Promise <Caballos> {
        const updateCaballo = await this.caballosModel.findByIdAndUpdate (CaballoID,
            CreateCaballosDTO, {new : true });
            return updateCaballo;

    }

   
}


