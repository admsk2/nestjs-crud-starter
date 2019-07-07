import { HttpModule, CacheModule } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { ZombiesController } from './zombies.controller';
import { ZombiesService } from './zombies.service';
import { IZombie } from './interfaces/zombie.interface';
import { IZombieItem } from './interfaces';

describe('ZombiesController', () => {
  let zombiesController: ZombiesController;
  let zombiesService: ZombiesService;

  const response = {
    send: (body?: any) => {},
    status: (code: number) => response,
    json: (data) => data
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule, CacheModule.register()],
      controllers: [ZombiesController],
      providers: [ZombiesService, {
        provide: getModelToken("Zombie"),
        useValue: {}
      }],
    }).compile();

    zombiesController = module.get<ZombiesController>(ZombiesController);
    zombiesService = module.get<ZombiesService>(ZombiesService);
  });

  /**
   * Create
   */

  describe('createZombie', () => {
    it('should create a Zombie', async () => {

      const zombie: IZombie = {
          name: "Zombie1",
          created_at: new Date()
      }

      jest.spyOn(zombiesService, 'create').mockImplementation(() => Promise.resolve(zombie));

      expect(await zombiesController.createZombie(response, zombie)).toBe(zombie);

    });

    it('should create a Zombie with item and prices', async () => {

      const zombie: IZombie = {
          name: "Zombie2",
          items: [{
            name: "Hammer",
            price: 100
          }],
          created_at: new Date()
      }

      jest.spyOn(zombiesService, 'create').mockImplementation(() => Promise.resolve(zombie));

      expect(await zombiesController.createZombie(response, zombie)).toBe(zombie);

    });
  });

  describe('createZombieItem', () => {
    it('should create a Zombies item', async () => {

      const zombieItem: IZombieItem = {
          name: "Chicken",
          price: 25
      }

      const param: Object = {
        name: "Zombie1"
      }

      jest.spyOn(zombiesService, 'createItem').mockImplementation(() => Promise.resolve(zombieItem));

      expect(await zombiesController.createZombieItem(response, param, zombieItem)).toBe(zombieItem);

    });
  });

  /**
   * Read
   */

  describe('readZombies', () => {
    it('should return an array of Zombies', async () => {

      const result: IZombie[] = [
        {
          name: "Zombie1",
          created_at: new Date()
        },
        {
          name: "Zombie2",
          created_at: new Date()
        }
      ];

      jest.spyOn(zombiesService, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.readZombies(response)).toBe(result);

    });
  });

  describe('readZombieItems', () => {
    it('should return an array of Zombie items', async () => {

      const result: IZombieItem | IZombieItem[] = [
        {
          name: "Fish",
          price: 10
        }
      ];

      const param: Object = {
        name: "Zombie1"
      };

      jest.spyOn(zombiesService, 'findItems').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.readZombieItemsByName(response, param)).toBe(result);

    });
  });

  describe('readZombieByQuery', () => {
    it('should return a Zombie', async () => {

      const result: IZombie = {
          name: "Zombie1",
          created_at: new Date()
      };

      const query = {created_at: new Date()};

      jest.spyOn(zombiesService, 'findOne').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.readZombieByQuery(response, query)).toBe(result);

    });
  });

  describe('readZombieById', () => {
    it('should return a Zombie', async () => {

      const result: IZombie = {
          name: "Zombie1",
          created_at: new Date()
      };

      const query = {id: "Zombie1"};

      jest.spyOn(zombiesService, 'findById').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.readZombieByID(response, query)).toBe(result);

    });
  });

  describe('readZombieByName', () => {
    it('should return a Zombie', async () => {

      const result: IZombie = {
          name: "Zombie1",
          created_at: new Date()
      };

      const query = {name: "Zombie1"};

      jest.spyOn(zombiesService, 'findByName').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.readZombieByName(response, query)).toBe(result);

    });
  });

  /**
   * Update
   */

  describe('updateZombie', () => {
    it('should update a Zombie', async () => {

      const result: IZombie = {
          name: "Zombie2",
          items: [{
            name: "Chicken",
            price: 25
          }],
          created_at: new Date()
      };

      const param: Object = {
        name: "Zombie2"
      };

      jest.spyOn(zombiesService, 'update').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.updateZombie(param, response, result)).toBe(result);

    });
  });

  describe('updateZombieItem', () => {
    it('should update a Zombie item', async () => {

      const result: IZombieItem = {
          name: "Rabbit",
          price: 500
      };

      const param: Object = {
        name: "Zombie1"
      };

      jest.spyOn(zombiesService, 'updateItem').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.updateZombieItem(param, response, result)).toBe(result);

    });
  });

  /**
   * Delete
   */

  describe('deleteZombie', () => {
    it('should delete a Zombie', async () => {

      const param: Object = {
        name: "Zombie1"
      };

      const result: string = "Deleted";

      jest.spyOn(zombiesService, 'delete').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.deleteZombie(param, response)).toBe(undefined); // TODO

    });
  });

  describe('deleteZombieItem', () => {
    it('should delete a Zombie item', async () => {

      const param: Object = {
        name: "Zombie1",
        item: "Guacamole"
      };

      const result: string = "Deleted";

      jest.spyOn(zombiesService, 'deleteItem').mockImplementation(() => Promise.resolve(result));

      expect(await zombiesController.deleteZombieItem(param, response)).toBe(undefined); // TODO

    });
  });

});