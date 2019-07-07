import { IZombieItem } from "./zombie-item.interface";

export interface IZombie {
  name: String,
  created_at?: Date,
  items?: IZombieItem[]
}