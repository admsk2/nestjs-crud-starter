import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { IZombie, IZombieService, IZombieItem } from './interfaces/index';
import { CreateZombieDto, CreateZombieItemDto } from './dto';
import { debug } from 'console';

@Injectable()
export class ZombiesService implements IZombieService {

  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Zombie') private readonly zombieModel: Model<IZombie>
    ) {}

    /**
     * Read Zombies
     * @return {Promise<IZombie[]>} Zombie interface
     */
  
    async findAll(): Promise<IZombie[]> {
      return await this.zombieModel.find().exec();
    }

    /**
     * Read single Zombie by ID
     * @param {String} ID Zombie ID
     * @return {Promise<IZombie>} Zombie interface
     */
  
    async findById(ID: String): Promise<IZombie> {
        return await this.zombieModel.findById(ID).exec();
    }

    /**
     * Read single Zombie by name
     * @param {String} name Zombie name
     * @return {Promise<IZombie>} Zombie interface
     */
  
    async findByName(name: String): Promise<IZombie> {
        return await this.zombieModel.findOne({name: name}).exec();
    }

    /**
     * Read single Zombie by data
     * @param {Object} object Request object
     * @return {Promise<IZombie>} Zombie interface
     */
  
    async findOne(options: object): Promise<IZombie> {
        return await this.zombieModel.findOne(options).exec();
    }

    /**
     * Creates Zombie
     * @param {CreateZombieDto} createZombieDto Zombie data (transfer object)
     * @return {Promise<IZombie>} Zombies array
     */

    async create(createZombieDto: CreateZombieDto): Promise<IZombie> {
      const createdZombie = new this.zombieModel(createZombieDto);
      return await createdZombie.save();
    }

    /**
     * Update single Zombie
     * @param {String} name Zombie name (unique identifier)
     * @param {CreateZombieDto} updateZombieDto Zombie data (transfer object)
     */

    async update(name: String, updateZombieDto: CreateZombieDto): Promise<IZombie> {
      const createdZombie = new this.zombieModel(updateZombieDto);
      return await createdZombie.findOneAndUpdate({name: name},{$set: updateZombieDto});
    }

    /**
     * Delete single Zombie
     * @param {String} name Zombie name (unique identifier)
     * @return {Promise<string>}
     */

    async delete(name: string): Promise<string> {
        try {
            await this.zombieModel.findOneAndRemove({name: name}).exec();
            return 'The zombie has been deleted';
        }
        catch (err){
            debug(err);
            return 'The zombie could not be deleted';
        }
    }

    /**
     * Read single Zombie items
     * @param {String} name Zombie name
     * @return {Promise<IZombieItem[]>} Zombie interface
     */
  
    async findItems(name: String): Promise<IZombieItem | IZombieItem[]> {
      const response = await this.zombieModel.findOne({name: name}, 'items').exec();
      return response;
    }

    /**
     * Creates Zombie item
     * @param {CreateZombieItemDto} createZombieItemDto Zombie item data (transfer object)
     * @return {Promise<IZombie>} Zombie item
     */

    async createItem(name: String, createZombieItemDto: CreateZombieItemDto): Promise<IZombie> {
      const createdZombie = this.zombieModel;
      return await createdZombie.findOneAndUpdate({name: name},{$push: {items: createZombieItemDto}});
    }

    /**
     * Update single Zombie item
     * @param {String} name Zombie name (unique identifier)
     * @param {CreateZombieItemDto} updateZombieItemDto 
     * @return {Promise<IZombie>} Zombie item
     */

    async updateItem(name: String, updateZombieItemDto: CreateZombieItemDto): Promise<IZombie> {
      const createdZombie = new this.zombieModel(updateZombieItemDto);
      return await createdZombie.findOneAndUpdate({name: name, 'items.name': updateZombieItemDto.name},{$set: {'items.$': updateZombieItemDto}});
    }

    /**
     * Delete single Zombie item
     * @param {String} name Zombie name (unique identifier)
     * @param {String} item Zombie item name (unique identifier)
     * @return {Promise<string>} 
     */

    async deleteItem(name: string, item: String): Promise<string> {
        try {
            await this.zombieModel.findOneAndRemove({name: name}, {$pull: {items: {name: item}}}).exec();
            return 'The zombie item has been deleted';
        }
        catch (err){
            debug(err);
            return 'The zombie item could not be deleted';
        }
    }

}
