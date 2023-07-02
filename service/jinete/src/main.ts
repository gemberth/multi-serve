import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Habilitar CORS para permitir acceso desde cualquier origen
  app.enableCors({
    origin: '*',
  });
//CONFIGURACION SWAGGER


  const config = new DocumentBuilder()
    .setTitle('Carreras de caballos jinete - Api2')
    .setDescription('Aplicación de carreras de caballos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  
}
bootstrap();
