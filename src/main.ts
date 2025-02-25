import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DatabaseService } from './infrastructure/database/database.service';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { ConfigurationService } from './infrastructure/configuration/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors();
  app.use(morgan('tiny'));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const appConfig = app.get(ConfigurationService);
  const apiPort = await appConfig.get<number>('PORT');

  const swaggerConfig = new DocumentBuilder()
    .addServer(`http://localhost:${apiPort}`)
    .setTitle('API')
    .setDescription('API')
    .build();

  const swaggerDocumentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocumentFactory, {
    customCss: `.swagger-ui .topbar { display: none }`,
    jsonDocumentUrl: '/api/json',
    yamlDocumentUrl: '/api/yaml',
  });

  const databaseService = app.get(DatabaseService);
  await databaseService.runMigrations();
  await databaseService.runSeeds();

  await app.listen({ host: "0.0.0.0", port: apiPort }, () => {
    console.log(`Server is running on http://localhost:${apiPort}`);
  });
}

bootstrap();
