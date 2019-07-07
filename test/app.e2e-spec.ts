import * as dotenv from 'dotenv';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ZombiesModule } from '../src/zombies/zombies.module';
import { ZombiesService } from '../src/zombies/zombies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IZombieService, IZombie, IZombieItem } from 'src/zombies/interfaces';

describe('Endpoints', () => {
  let app: INestApplication;

  // let zombiesService = { 
  //   findAll: () => [],
  //   findById: (ID: string) => [],
  //   findByName: (name: string) => [],
  //   findOne: (options: object) => ({}),
  //   create: (zombie: IZombie) => ({}),
  //   update: (name: string, newValue: IZombie) => ({}),
  //   delete: (name: string) => "Deleted",
  //   findItems: (name: string) => [],
  //   createItem: (name: string, zombieItem: IZombieItem) => ({}),
  //   updateItem: (name: string, zombieItem: IZombieItem) => ({}),
  //   deleteItem: (name: string, item: String) => "Deleted"
  // };

  function stripMongoProperties(mongoObject) {
    delete mongoObject._id;
    delete mongoObject.__v;
    return mongoObject;
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(dotenv.config().parsed.MONGODB_URI),
        ZombiesModule
      ],
    })
      // .overrideProvider(ZombiesService)
      // .useValue(zombiesService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  let zombieID: string;
  let zombieCreation: Date = new Date();

  const zombieItem: IZombieItem = {
    name: "Metal Hammer",
    price: 999
  }

  const zombie: IZombie = {
    name: "Zombie1",
    created_at: zombieCreation,
    items: [zombieItem]
  };

  const zombieItem2: IZombieItem = {
    name: "Iron Maiden",
    price: 666
  }

  const zombie2: IZombie = {
    name: "Zombie2",
    created_at: zombieCreation,
    items: [zombieItem2]
  };

  const zombieItem3: IZombieItem = {
    name: "Deep Purple",
    price: 100
  }

  it(`/POST createZombie`, () => {
    return request(app.getHttpServer())
      .post('/zombies')
      .send(zombie)
      .expect(200)
      .then(res => {
        zombieID = res.body._id;
        let createdZombie = stripMongoProperties(res.body);
        createdZombie.created_at = new Date(createdZombie.created_at);
        expect(createdZombie).toEqual(zombie);
      });
  });

  it(`/GET zombies`, () => {
    return request(app.getHttpServer())
      .get('/zombies')
      .expect(200)
      .then(res => {
        let createdZombie = stripMongoProperties(res.body[0]);
        createdZombie.created_at = new Date(createdZombie.created_at);
        expect(createdZombie).toEqual(zombie);
      });
  });

  it(`/GET zombieById`, () => {
    return request(app.getHttpServer())
      .get('/zombies/id/'+zombieID)
      .expect(200)
      .then(res => {
        let createdZombie = stripMongoProperties(res.body);
        createdZombie.created_at = new Date(createdZombie.created_at);
        expect(createdZombie).toEqual(zombie);
      });
  });

  it(`/POST zombieByObject`, () => {
    return request(app.getHttpServer())
      .post('/zombies/find')
      .send({name: zombie.name})
      .expect(200)
      .then(res => {
        let createdZombie = stripMongoProperties(res.body);
        createdZombie.created_at = new Date(createdZombie.created_at);
        expect(createdZombie).toEqual(zombie);
      });
  });

  it(`/PATCH updateZombie`, () => {
    return request(app.getHttpServer())
      .patch('/zombies/name/Zombie1')
      .send(zombie2)
      .expect(200)
      .then(res => {
        let createdZombie = stripMongoProperties(res.body);
        createdZombie.created_at = new Date(createdZombie.created_at);
        expect(createdZombie).toEqual(zombie2);
      });
  });

  it(`/GET zombieByName`, () => {
    return request(app.getHttpServer())
      .get('/zombies/name/'+zombie2.name)
      .expect(200)
      .then(res => {
        let createdZombie = stripMongoProperties(res.body);
        createdZombie.created_at = new Date(createdZombie.created_at);
        expect(createdZombie).toEqual(zombie2);
      });
  });

  it(`/GET readZombieItemsByName`, () => {
    return request(app.getHttpServer())
      .get('/zombies/items/Zombie2')
      .expect(200)
      .then(res => {
        let createdZombieItems = stripMongoProperties(res.body);
        expect(createdZombieItems).toEqual({items: zombie2.items});
      });
  });

  it(`/POST createZombieItem`, () => {
    return request(app.getHttpServer())
      .post('/zombies/items/Zombie2')
      .send(zombieItem3)
      .expect(200)
      .then(res => {
        let createdZombie = stripMongoProperties(res.body);
        let zombieItemsUpdated = zombie2;
        createdZombie.created_at = new Date(createdZombie.created_at);
        zombieItemsUpdated.items.push(zombieItem3);
        expect(createdZombie).toEqual(zombieItemsUpdated);
      });
  });

  it(`/PATCH updateZombieItem`, () => {
    return request(app.getHttpServer())
      .patch('/zombies/items/Zombie2')
      .send({
        name: "Deep Purple",
        price: 222
      })
      .expect(200)
      .then(res => {
        let createdZombie = stripMongoProperties(res.body);
        let zombieItemsUpdated = zombie2;
        createdZombie.created_at = new Date(createdZombie.created_at);
        zombieItemsUpdated.items = [zombieItem2];
        zombieItemsUpdated.items.push({
          name: "Deep Purple",
          price: 222
        });
        expect(createdZombie).toEqual(zombieItemsUpdated);
      });
  });

  it(`/DELETE deleteZombieItem`, () => {
    return request(app.getHttpServer())
      .delete('/zombies/items/Zombie2/Deep&nbsp;Purple')
      .expect(200)
      .expect("Deleted");
  });

  it(`/DELETE deleteZombie`, () => {
    return request(app.getHttpServer())
      .delete('/zombies/name/Zombie2')
      .expect(200)
      .expect("Deleted");
  });

  afterAll(async () => {
    await app.close();
  });
});