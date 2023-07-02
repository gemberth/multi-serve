import { Injectable } from '@nestjs/common';
import { Model} from 'mongoose'
import { InjectModel} from '@nestjs/mongoose'

import { Jinete} from './interfaces/jinete.interface'
import { CreateJineteDTO} from './dto/jinete.dto'


@Injectable()
export class JineteService {
    constructor (@InjectModel('Jinete') private readonly jinetesModel:Model <Jinete>) {}

    async getJineteAll(): Promise <Jinete []> {
        
       const jinetes=  await this.jinetesModel.find ()
        return jinetes

    }

    
   async getJinete (JineteID: string ): Promise <Jinete> {
      const jinete = await this.jinetesModel.findById(JineteID);
        return jinete;
        
    }


   async createJinete (CreateJineteDTO : CreateJineteDTO): Promise <Jinete> {
        const jinete = new this.jinetesModel(CreateJineteDTO);
        return await jinete.save();

    }

    async deleteJinete (JineteID:string): Promise <Jinete> {
        const deleteJinete = await this.jinetesModel.findByIdAndDelete(JineteID);
        return deleteJinete
    
        }


    
    async updateJinete(JineteID:string, CreateJineteDTO: CreateJineteDTO): Promise <Jinete> {
        const updateJinete = await this.jinetesModel.findByIdAndUpdate (JineteID,
            CreateJineteDTO, {new : true });
            return updateJinete;

    }

   
}


