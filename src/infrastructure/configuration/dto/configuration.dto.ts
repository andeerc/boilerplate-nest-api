import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConfigurationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: any;
}

export class CreateConfigurationDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  value: any;
}

export class UpdateConfigurationDto extends CreateConfigurationDto { }