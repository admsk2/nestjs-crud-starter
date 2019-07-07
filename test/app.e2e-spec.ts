import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ZombiesModule } from '../src/zombies/zombies.module';
import { ZombiesService } from '../src/zombies/zombies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IZombieService, IZombie, IZombieItem } from 'src/zombies/interfaces';

describe('Endpoints', () => {
  let app: INestApplication;
  let zombiesService = { 
    findAll: () => [],
    findById: (ID: string) => [],
    findByName: (name: string) => [],
    findOne: (options: object) => ({}),
    create: (zombie: IZombie) => ({}),
    update: (name: string, newValue: IZombie) => ({}),
    delete: (name: string) => "Deleted",
    findItems: (name: string) => [],
    createItem: (name: string, zombieItem: IZombieItem) => ({}),
    updateItem: (name: string, zombieItem: IZombieItem) => ({}),
    deleteItem: (name: string, item: String) => "Deleted"
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://admin:Baranina001@ds123844.mlab.com:23844/zombies'),
        ZombiesModule
      ],
    })
      .overrideProvider(ZombiesService)
      .useValue(zombiesService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET zombies`, () => {
    return request(app.getHttpServer())
      .get('/zombies')
      .expect(200)
      .expect([]);
  });

  it(`/GET zombieById`, () => {
    return request(app.getHttpServer())
      .get('/zombies/id/zombie1')
      .expect(200)
      .expect([]);
  });

  it(`/GET zombieByName`, () => {
    return request(app.getHttpServer())
      .get('/zombies/name/zombie1')
      .expect(200)
      .expect([]);
  });

  it(`/POST zombieByObject`, () => {
    return request(app.getHttpServer())
      .post('/zombies/find')
      .send({})
      .expect(200)
      .expect({});
  });

  it(`/POST createZombie`, () => {
    return request(app.getHttpServer())
      .post('/zombies')
      .send({})
      .expect(200)
      .expect({});
  });

  it(`/PATCH updateZombie`, () => {
    return request(app.getHttpServer())
      .patch('/zombies/name/zombie1')
      .send({})
      .expect(200)
      .expect({});
  });

  it(`/DELETE deleteZombie`, () => {
    return request(app.getHttpServer())
      .delete('/zombies/name/zombie1')
      .expect(200)
      .expect("Deleted");
  });

  it(`/GET readZombieItemsByName`, () => {
    return request(app.getHttpServer())
      .get('/zombies/items/zombie1')
      .expect(200)
      .expect([]);
  });

  it(`/POST createZombieItem`, () => {
    return request(app.getHttpServer())
      .post('/zombies/items/zombie1')
      .send({})
      .expect(200)
      .expect({});
  });

  it(`/PATCH updateZombieItem`, () => {
    return request(app.getHttpServer())
      .patch('/zombies/items/zombie1')
      .send({})
      .expect(200)
      .expect({});
  });

  it(`/DELETE deleteZombieItem`, () => {
    return request(app.getHttpServer())
      .delete('/zombies/items/zombie1/rabbit')
      .expect(200)
      .expect("Deleted");
  });

  afterAll(async () => {
    await app.close();
  });
});