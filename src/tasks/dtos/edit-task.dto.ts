import { IsOptional } from 'class-validator';

export class EditTaskDTO {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  isConcluded: boolean;

  @IsOptional()
  concludedAt: Date;
}
