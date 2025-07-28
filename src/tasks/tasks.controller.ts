import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/guards/auth.guards';
import { User, UserPayload } from '../auth/decorators/user.decorator';

@ApiTags('Tasks')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({
    summary: 'Create a new task',
    description: 'Create a new task for the authenticated user',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Task creation details',
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body or validation failed',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @User() user: UserPayload) {
    return this.tasksService.create(createTaskDto, user.sub);
  }

  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Retrieve all tasks belonging to the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @Get()
  findAll(@User() user: UserPayload) {
    return this.tasksService.findAll(user.sub);
  }

  @ApiOperation({
    summary: 'Get task by ID',
    description:
      'Retrieve a specific task by its ID (only if it belongs to the authenticated user)',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Task ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid task ID format',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiForbiddenResponse({
    description: 'You can only access your own tasks',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @User() user: UserPayload) {
    return this.tasksService.findOne(id, user.sub);
  }

  @ApiOperation({
    summary: 'Update task',
    description:
      'Update a specific task by its ID (only if it belongs to the authenticated user)',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Task ID',
    example: 1,
  })
  @ApiBody({
    type: UpdateTaskDto,
    description: 'Task update details',
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid request body, validation failed, or invalid task ID format',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiForbiddenResponse({
    description: 'You can only update your own tasks',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @User() user: UserPayload,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.sub);
  }

  @ApiOperation({
    summary: 'Delete task',
    description:
      'Delete a specific task by its ID (only if it belongs to the authenticated user)',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Task ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid task ID format',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiForbiddenResponse({
    description: 'You can only delete your own tasks',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user: UserPayload) {
    return this.tasksService.remove(id, user.sub);
  }
}
