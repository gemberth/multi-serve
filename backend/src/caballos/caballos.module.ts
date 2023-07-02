import { Module } from '@nestjs/common';
import { CaballosController } from './caballos.controller';
import { CaballosService } from './caballos.service';
import { MongooseModule} from '@nestjs/mongoose'; 
import { CaballosSchema} from './schemas/caballos.schema'
@Module({
  imports:[ 
    MongooseModule.forFeature([
      {name: 'Caballos', schema: CaballosSchema}
  ])],
  controllers: [CaballosController],
  providers: [CaballosService]
})
export class CaballosModule {}
