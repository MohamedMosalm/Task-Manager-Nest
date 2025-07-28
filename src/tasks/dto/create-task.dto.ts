import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Complete project documentation',
    minLength: 1,
    maxLength: 255,
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MinLength(1, { message: 'Title must be at least 1 character' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed task description',
    example:
      'Write comprehensive documentation for the task management API including all endpoints and examples',
    maxLength: 1000,
  })
  @IsString({ message: 'Content must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'Content cannot exceed 1000 characters' })
  content?: string;
}
