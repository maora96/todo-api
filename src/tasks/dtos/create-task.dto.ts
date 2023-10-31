import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  isConcluded: boolean;

  @IsOptional()
  concludedAt: Date;

  @IsNotEmpty()
  userId: string;
}
