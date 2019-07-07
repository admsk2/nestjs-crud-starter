import { ApiModelProperty } from '@nestjs/swagger';

export class CreateZombieItemDto {
    @ApiModelProperty()
    readonly name: String
  
    @ApiModelProperty()
    readonly price: Number 
}