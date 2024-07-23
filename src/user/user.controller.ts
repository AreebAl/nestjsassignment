import { User } from 'src/entities/user.entity';
import { UsersService } from './user.service';
import { Body, Controller, Delete, Get, Inject, InternalServerErrorException, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResponseDto } from 'src/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/roles.enum';
import { LoggingInterceptor } from 'src/auth/interceptor/logging.interceptor';
import {  WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('user')
export class UserController {


  constructor(
    private readonly userService: UsersService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
  ) {
    console.log("usr controller")
  }
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get("/")
  async findAll(): Promise<ResponseDto<User[]>> {
    try {
      const users = await this.userService.findAll();
      this.logger.log("info",['Fetching all users',users]);
      return {
        success: true,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {

      // Log internal server error for troubleshooting
      console.error('Error retrieving users', error);
      throw new InternalServerErrorException({
        success: false,
        message: `Failed to retrieve user. Please try again later.`,
        error: error.message,
      });

    }
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CLIENT)
  @Get(":id")
  async getUserById(@Param('id') id: number): Promise<ResponseDto<User>> {
    try {
      const user = await this.userService.findById(id);
      return {
        success: true,
        message: `User with ID ${id} retrieved successfully`,
        data: user,
      };
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message)
    }
  }
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post()
  async create(@Body() user: CreateUserDto): Promise<ResponseDto<User>> {
    try {
      console.log(user);
      const newUser = await this.userService.createUser(user);
      return {
        success: true,
        message: "User created succesfully",
        data: newUser
      }
    } catch (err) {
      console.log(err.message)
      throw new InternalServerErrorException({
        success: false,
        message: "Failed to create user.Please try again later.",
        error: err instanceof Error ? err.message : "Uknown Error"
      });
    }
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN,)
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    try {
      const existingUser = await this.userService.updateUser(id, user);
      return {
        success: true,
        message: `User with ID ${id} updated successfully`,
        data: existingUser,
      };
    } catch (error) {
      console.error(`Error updating user with ID ${id}`, error);
      throw new InternalServerErrorException({
        success: false,
        message: `Failed to update user with ID ${id}. Please try again later.`,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Delete(":id")
  async deleteUser(@Param('id') id): Promise<any> {

    try {
      const deletedUser =await this.userService.remove(id);
      return {
        success: true,
        message: `User with ID ${id} deleted successfully`,
        data: deletedUser,
      }
    } catch (err) {
      console.log(err.message);
      throw new InternalServerErrorException({
        success: false,
        message: `Failed to delete user with ID ${id}. Please try again later.`,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }



}
