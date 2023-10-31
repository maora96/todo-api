import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [User, Task],
      synchronize: true,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST.toString(),
      database: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
