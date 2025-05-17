import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/auth/entities/user.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', '12345'),
        database: configService.get<string>('DB_NAME', 'test'),
        entities: [Role, User, Tag, Category, Event, Booking],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
