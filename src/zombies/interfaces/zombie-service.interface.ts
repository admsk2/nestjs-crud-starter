import { IZombie } from './zombie.interface';
import { IZombieItem } from './zombie-item.interface';

export interface IZombieService {
    findAll(): Promise<IZombie[]>,
    findById(ID: string): Promise<IZombie | null>,
    findByName(name: string): Promise<IZombie | null>,
    findOne(options: object): Promise<IZombie | null>,
    create(zombie: IZombie): Promise<IZombie>,
    update(name: string, newValue: IZombie): Promise<IZombie | null>,
    delete(name: string): Promise<string>,
    findItems(name: string): Promise<IZombieItem | IZombieItem[]>,
    createItem(name: string, zombieItem: IZombieItem): Promise<IZombie>,
    updateItem(name: string, zombieItem: IZombieItem): Promise<IZombie>,
    deleteItem(name: string, item: String): Promise<string>
}