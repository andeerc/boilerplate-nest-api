import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ClassSerializerInterceptor, LogLevel, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DatabaseInfraService } from './infrastructure/database/database-infra.service';

async function bootstrap() {
  const logLevels: LogLevel[] = process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['verbose'];

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { logger: logLevels }
  );

  app.enableCors();

  // trust proxy
  app.use(morgan('tiny'));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .addServer('http://localhost:3001', 'Local server')
    .setTitle('API')
    .setDescription('API project')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    customCss: `.swagger-ui .topbar { display: none }`,
    customSiteTitle: 'API',
    jsonDocumentUrl: '/api/json',
    yamlDocumentUrl: '/api/yaml',
  });

  const databaseService = app.get(DatabaseInfraService);
  await databaseService.runMigrations();
  await databaseService.runSeeds();

  await app.listen({ host: "0.0.0.0", port: 3001 }, () => {
    console.log('Server is running on http://localhost:3001');
  });
}

bootstrap();
