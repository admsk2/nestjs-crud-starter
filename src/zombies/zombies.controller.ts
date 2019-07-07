import { Controller, Get, Post, Patch, Delete, Param, CacheInterceptor, UseInterceptors, Body, Response, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ZombiesService } from './zombies.service';
import { CreateZombieDto, CreateZombieItemDto } from './dto/';
import { IZombieItem, IZombie } from './interfaces';

@ApiUseTags('zombies')
@Controller('zombies')
@UseInterceptors(CacheInterceptor)
export class ZombiesController {
  constructor(private readonly zombiesService: ZombiesService) {}

  /**
   * Find all zombies
   * @param {@Response} res Response object
   * @return {Promise<IZombie[]>} Array of Zombies
   */

  @Get()
  public async readZombies(@Response() res): Promise<IZombie[]> {
    const zombies = await this.zombiesService.findAll();
    return res.status(HttpStatus.OK).json(zombies);
  }

  /**
   * Find zombie by id
   * @param {@Response} res Response object
   * @param {@Param} param Param object
   * @return {Promise<IZombie>} Single zombie
   */

  @Get('/id/:id')
  public async readZombieByID(@Response() res, @Param() param): Promise<IZombie> {
    if (param.id && param.id.match(/^[a-zA-Z0-9_.-]*$/)) {
      const zombie = await this.zombiesService.findById(param.id);
      return res.status(HttpStatus.OK).json(zombie);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  /**
   * Find zombie by name value
   * @param {@Response} res Response object
   * @param {@Param} param Param object
   * @return {Promise<IZombie>} Single zombie
   */

  @Get('/name/:name')
  public async readZombieByName(@Response() res, @Param() param): Promise<IZombie> {
    const zombie = await this.zombiesService.findByName(param.name);
    return res.status(HttpStatus.OK).json(zombie);
  }

  /**
   * Find zombie by query
   * @param {@Response} res Response object
   * @param {@Body} body Query upon the zombie will be found
   * @return {Promise<IZombie>} Single zombie
   */

  @Post('find')
  public async readZombieByQuery(@Response() res, @Body() body): Promise<IZombie> {
    const query = body;
    const zombies = await this.zombiesService.findOne(query);
    return res.status(HttpStatus.OK).json(zombies);
  }

  /**
   * Create new Zombie
   * @param {@Response} res Response object
   * @param {@Body} createZombieDto Data upon the zombie will be created
   * @return {Promise<IZombie>} Created zombie
   */

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async createZombie(@Response() res, @Body() createZombieDto: CreateZombieDto): Promise<IZombie> {
      const zombie = await this.zombiesService.create(createZombieDto);
      return res.status(HttpStatus.OK).json(zombie);
  }

  /**
   * Updates Zombie
   * @param {@Param} param Param object
   * @param {@Response} res Response object
   * @param {@Body} createZombieDto Data upon the zombie will be created
   * @return {Promise<IZombie>} Created zombie
   */

  @Patch('/name/:name')
  public async updateZombie(@Param() param, @Response() res, @Body() body): Promise<IZombie> {
      const zombie = await this.zombiesService.update(param.name, body);
      return res.status(HttpStatus.OK).json(zombie);
  }

  /**
   * Deletes Zombie
   * @param {@Param} param Param object
   * @param {@Response} res Response object
   * @return {Promise<IZombie>} Created zombie
   */

  @Delete('/name/:name')
  public async deleteZombie(@Param() param, @Response() res): Promise<string> {
      await this.zombiesService.delete(param.name);
      return res.status(HttpStatus.OK).send("Deleted");
  }

  /**
   * Zombie items
   */


  /**
   * Find all Zombie items
   * @param {@Response} res Response object
   * @return {Promise<IZombie[]>} Array of Zombies
   */
  
  @Get('/items/:name')
    public async readZombieItemsByName(@Response() res, @Param() param): Promise<IZombieItem | IZombieItem[]> {
    if (param.name && !!param.name.match(/^[a-zA-Z0-9_.-]*$/)[0]) {
      const items = await this.zombiesService.findItems(param.name);
      return res.status(HttpStatus.OK).json(items);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  /**
   * Create new Zombie item
   * @param {@Response} res Response object
   * @param {@Body} createZombieDto Data upon the zombie will be created
   * @return {Promise<IZombie>} Created zombie
   */

  @Post('/items/:name')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async createZombieItem(@Response() res, @Param() param, @Body() createZombieItemDto: CreateZombieItemDto): Promise<IZombieItem> {
      const zombieItem = await this.zombiesService.createItem(param.name, createZombieItemDto);
      return res.status(HttpStatus.OK).json(zombieItem);
  }

  /**
   * Updates Zombie item
   * @param {@Param} param Param object
   * @param {@Response} res Response object
   * @param {@Body} createZombieDto Data upon the zombie will be created
   * @return {Promise<IZombie>} Created zombie
   */

  @Patch('/items/:name')
  public async updateZombieItem(@Param() param, @Response() res, @Body() body): Promise<IZombie> {
      const zombie = await this.zombiesService.updateItem(param.name, body);
      return res.status(HttpStatus.OK).json(zombie);
  }

  /**
   * Deletes Zombie item
   * @param {@Param} param Param object
   * @param {@Response} res Response object
   * @return {Promise<IZombie>} Created zombie
   */

  @Delete('/items/:name/:item')
  public async deleteZombieItem(@Param() param, @Response() res): Promise<string> {
      await this.zombiesService.deleteItem(param.name, param.item);
      return res.status(HttpStatus.OK).send("Deleted");
  }

}
