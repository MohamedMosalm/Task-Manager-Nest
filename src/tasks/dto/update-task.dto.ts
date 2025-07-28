import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Task title',
    example: 'Complete updated project documentation',
    minLength: 1,
    maxLength: 255,
  })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  @MinLength(1, { message: 'Title must be at least 1 character' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  title?: string;

  @ApiPropertyOptional({
    description: 'Detailed task description',
    example:
      'Updated comprehensive documentation for the task management API including all endpoints and examples',
    maxLength: 1000,
  })
  @IsString({ message: 'Content must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'Content cannot exceed 1000 characters' })
  content?: string;

  @ApiPropertyOptional({
    description: 'Task completion status',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({ message: 'Completed must be a boolean value' })
  @IsOptional()
  completed?: boolean;
}
