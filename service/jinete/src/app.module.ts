import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JineteModule } from './jinete/jinete.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    //  MongooseModule.forRoot('mongodb://admin:admin@mongodb:27017/carrera?authSource=admin'),
  
     JineteModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
