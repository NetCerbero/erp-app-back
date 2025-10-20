import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { JwtAuthGuard, TransformInterceptor } from './core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ActionGuard } from './core/guard/action.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      transform: true,
      transformOptions: {
        // No transforma las ?query=false al valor correcto
        //enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );
  
  const options = {
    origin: (origin, callback) => {
      if (
        !origin ||
        AppModule.allowedOrigins.some((o) => origin.startsWith(o))
      ) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por el CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  //Esto es importante si usas un proxy para tener la ip correcta que se conecta
  //app.set('trust proxy', true);
  app.enableCors(options);
  app.use(cookieParser());
  await app.listen(AppModule.port);
}
bootstrap();