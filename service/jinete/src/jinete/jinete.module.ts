import { Module } from '@nestjs/common';
import { JineteController } from './jinete.controller';
import { JineteService } from './jinete.service';
import { MongooseModule} from '@nestjs/mongoose'; 
import { JineteSchema} from './schemas/jinete.schema'
@Module({
  imports:[ 
    MongooseModule.forFeature([
      {name: 'Jinete', schema: JineteSchema}
  ])],
  controllers: [JineteController],
  providers: [JineteService]
})
export class JineteModule {}
