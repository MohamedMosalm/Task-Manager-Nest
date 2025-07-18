import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  @MinLength(1, { message: 'Title must be at least 1 character' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  title?: string;

  @IsString({ message: 'Content must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'Content cannot exceed 1000 characters' })
  content?: string;

  @IsBoolean({ message: 'Completed must be a boolean value' })
  @IsOptional()
  completed?: boolean;
}
