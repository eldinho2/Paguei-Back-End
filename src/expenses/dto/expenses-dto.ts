import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  fixed: boolean;

  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  monthId: string;
}