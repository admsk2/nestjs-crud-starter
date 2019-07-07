import { ApiModelProperty } from '@nestjs/swagger';
import { CreateZombieItemDto } from './create-zombie-item.dto';

export class CreateZombieDto {
  @ApiModelProperty()
  readonly name: String
}