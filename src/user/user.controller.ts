import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { ResponseDto } from 'src/response.dto';
import { error } from 'console';

@Controller('user')
export class UserController {


  constructor(private readonly userService: UserService) {
    console.log("usr controller")
  }

  @Get("/")
  async findAll(): Promise<ResponseDto<User[]>> {
    try {
      const users = await this.userService.findAll();
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


  @Get(":id")
  async getUserById(@Param('id') id: number): Promise<ResponseDto<User>> {
    try {
      const user =await this.userService.findById(id);
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

  @Post()
  async create(@Body() user:User):Promise<ResponseDto<User>>{
    try{
        const newUser=await this.userService.createUser(user);
        return{
          success:true,
          message:"User created succesfully",
          data:newUser
        }
    }catch(err){
      console.log(err.message)
        throw new InternalServerErrorException({
          success:false,
          message:"Failed to create user.Please try again later.",
          error:err instanceof Error?err.message:"Uknown Error"
        });
    }
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User) {
    try {
      await this.userService.updateUser(id,user);
      return {
        success: true,
        message: `User with ID ${id} updated successfully`,
        data: null,
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



}
