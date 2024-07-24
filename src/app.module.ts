import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GlobalModule } from './global/global.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './auth/logger/logger';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { LoggingInterceptor } from './auth/interceptor/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true,
        entities: [User],
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot(winstonConfig),
    UserModule,
    GlobalModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,LoggingInterceptor],
})
export class AppModule {
  constructor(private readonly configService:ConfigService) {
    console.log("connected to db");
    console.log(join(process.cwd(), 'src/user/user.graphql'));
    console.log(this.configService.get<string>('DATABASE_HOST'))
    console.log(this.configService.get<string>('DATABASE_PORT'))
    console.log(this.configService.get<string>('DATABASE_USER'))
    console.log(this.configService.get<string>('DATABASE_PASSWORD'))

  }
}
