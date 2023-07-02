import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException,Query} from '@nestjs/common';

import { CreateJineteDTO } from './dto/jinete.dto'

import { JineteService } from './jinete.service'

import { ApiParam, ApiTags } from '@nestjs/swagger';

//import { get } from 'http';

//import { create } from 'domain';

@ApiTags('Jinetes')
@Controller('api/jinetes')
export class JineteController {


constructor ( private jinetesService: JineteService) {}

    @Post('/create')
  async  createPost(@Res() res, @Body() createJineteDTO: CreateJineteDTO) {

      const jinetes= await this.jinetesService.createJinete(createJineteDTO);
        
        return res.status(HttpStatus.OK).json({
            message:'Jinete guardado con éxito ',
            jinetes:jinetes
        });
    }

    @Get ('/')
    async getJinetes  (@Res () res){
        const Jinetes = await this.jinetesService.getJineteAll();
        return res.status(HttpStatus.OK).json({
            Jinetes 
        })
    }
 
    @ApiParam({
        name:'JineteID'
    })
     @Get('/:JineteID')
    async  getJinete (@Res() res, @Param ('JineteID') jineteID) {
       const jinete= await this.jinetesService.getJinete(jineteID);
       if (!jinete) throw new NotFoundException ('El jinete no existe');
       return res.status(HttpStatus.OK).json(jinete);
     }


     @ApiParam({
        name:'JineteID'
    })

     @Delete ('/delete/:JineteID') 
     async deleteJinete (@Res () res, @Param('JineteID') JineteID ){
        const JineteDeleted = await this.jinetesService.deleteJinete (JineteID);
        if (!JineteDeleted) throw new NotFoundException('El jinete no existe');
        return res.status (HttpStatus.OK).json({
            message : 'Jinete eliminado con éxito',
            JineteDeleted
        });
    }


    @ApiParam({
        name:'JineteID'
    })
    
    @Put ('/update/:JineteID') 
    async updateJinete(@Res () res, @Body () CreateJineteDTO: CreateJineteDTO, @Param('JineteID') JineteID ) {
        const updatedJinete = await this.jinetesService.updateJinete(JineteID,CreateJineteDTO);
        if (!updatedJinete) throw new NotFoundException ('El jinete no existe');
        return res.status (HttpStatus.OK).json ({
            message: 'El jinete ha sido actualizado',
            updatedJinete
        });

    }


        
        




}
