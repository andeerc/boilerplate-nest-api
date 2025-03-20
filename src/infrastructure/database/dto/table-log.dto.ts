import { ApiProperty } from "@nestjs/swagger";

class TableLogUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;
};

class TableLogMetadataDto {
  @ApiProperty()
  date: Date;

  @ApiProperty({
    type: Object,
    description: 'Diferenças entre os registros.'
  })
  diff: any;

  @ApiProperty()
  user: TableLogUserDto;

  @ApiProperty({
    enum: ['create', 'update', 'delete'],
    description: 'Ação realizada no registro.'
  })
  action: 'create' | 'update' | 'delete';
}

export class TableLogDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Identificador do registro.'
  })
  recId: string;

  @ApiProperty({
    type: TableLogMetadataDto,
    isArray: true,
    description: 'Registros de alterações no registro.'
  })
  metadata: TableLogMetadataDto[];
}