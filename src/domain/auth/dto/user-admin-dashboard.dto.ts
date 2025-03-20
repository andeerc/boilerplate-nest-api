import { ApiProperty } from "@nestjs/swagger";

export class UserAdminDashboardDto {
  @ApiProperty()
  message: string;
}