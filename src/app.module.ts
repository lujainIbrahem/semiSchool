import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { profileModule } from './module/profile/profile.module';
import { UserModule } from './module/user/user.module';

import { seedDataModule } from './seedData/seedData.module';

@Module({
  imports: [ConfigModule.forRoot({
  envFilePath: './config/.env',
  isGlobal:true
}),

CacheModule.register({

}),
MongooseModule.forRoot(process.env.MONGO_URL_online as string, {
  onConnectionCreate: (connection: Connection) => {
    connection.on('connected', () => console.log(`db is connected successfully on ${process.env.MONGO_URL_online} `));
    return connection;
  },
}),

UserModule,
profileModule,
seedDataModule,



],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
