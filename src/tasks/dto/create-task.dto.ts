import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MinLength(1, { message: 'Title must be at least 1 character' })
  @MaxLength(255, { message: 'Title cannot exceed 255 characters' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsOptional()
  @MaxLength(1000, { message: 'Content cannot exceed 1000 characters' })
  content?: string;
}
