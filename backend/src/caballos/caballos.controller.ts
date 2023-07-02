import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException,Query} from '@nestjs/common';

import { CreateCaballosDTO } from './dto/caballos.dto'

import { CaballosService } from './caballos.service'

import { ApiParam, ApiTags } from '@nestjs/swagger';

//import { get } from 'http';

//import { create } from 'domain';

@ApiTags('Caballos')
@Controller('api/caballos')
export class CaballosController {


constructor ( private caballosService: CaballosService) {}

    @Post('/create')
  async  createPost(@Res() res, @Body() createCaballosDTO: CreateCaballosDTO) {

      const caballos= await this.caballosService.createCaballo(createCaballosDTO);
        
        return res.status(HttpStatus.OK).json({
            message:'Caballo guardado con éxito ',
            caballos:caballos
        });
    }

    @Get ('/')
    async getCaballos  (@Res () res){
        const Caballos = await this.caballosService.getCaballos();
        return res.status(HttpStatus.OK).json({
            Caballos 
        }).res.set('Access-Control-Allow-Origin', '*');
    }
 
    @ApiParam({
        name:'CaballoID'
    })
     @Get('/:CaballoID')
    async  getCaballo (@Res() res, @Param ('CaballoID') caballoID) {
       const caballo= await this.caballosService.getCaballo(caballoID);
       if (!caballo) throw new NotFoundException ('El caballo no existe');
       return res.status(HttpStatus.OK).json(caballo) ;
     }


     @ApiParam({
        name:'CaballoID'
    })

     @Delete ('/delete/:CaballoID') 
     async deleteCaballo (@Res () res, @Param('CaballoID') CaballoID ){
        const CaballoDeleted = await this.caballosService.deleteCaballo (CaballoID);
        if (!CaballoDeleted) throw new NotFoundException('El caballo no existe');
        return res.status (HttpStatus.OK).json({
            message : 'Caballo eliminado con éxito',
            CaballoDeleted
        });
    }


    @ApiParam({
        name:'CaballoID'
    })
    
    @Put ('/update/:CaballoID') 
    async updateCaballo(@Res () res, @Body () CreateCaballosDTO: CreateCaballosDTO, @Param('CaballoID') CaballoID ) {
        const updatedCaballo = await this.caballosService.updateCaballo(CaballoID,CreateCaballosDTO);
        if (!updatedCaballo) throw new NotFoundException ('El caballo no existe');
        return res.status (HttpStatus.OK).json ({
            message: 'El caballo ha sido actualizado',
            updatedCaballo
        });

    }


        
        




}
