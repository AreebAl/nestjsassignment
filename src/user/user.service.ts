import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { GlobalService } from '../global/global.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';




@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly globalService: GlobalService,
      //  @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
       // private readonly jwtService: JwtService, // Inject JwtService for token operations
      ) {
        this.globalService.getGlobalInfo();
     //   this.logger.log("info","getting user data")
      }

  findAll(): Promise<User[]> {
    const user=this.userRepository.find();
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(user:CreateUserDto | CreateUserInput): Promise<any> {
   try{
    // const users=this.userRepository.save(user);
    user.password=await bcrypt.hash(user.password,10);
    console.log(user,"from service user")
    return this.userRepository.save(user);
   }catch(err){
    console.log(err);
    throw new Error(err.message)
   }
  }

  async updateUser(id: number, user: UpdateUserDto | UpdateUserInput): Promise<UpdateUserDto> {
    const existingUser = await this.userRepository.findOne({where:{id}});
    console.log("existinguser",existingUser)
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if(user.password){
      user.password=await bcrypt.hash(user.password,10);
    }
     //Object.assign(user,existingUser);
     this.userRepository.update(id,user);
     return user;
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.userRepository.findOne({where:{id}});
    console.log("existing user",existingUser);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const result = await this.userRepository.delete(id);
    console.log(result);
    return existingUser;
  }

  // async validateUser(email: string, password: string): Promise<User> {
  //   const user = await this.userRepository.findOne({ where: { email } });
  //   if (user && await bcrypt.compare(password, user.password)) {
  //     return user;
  //   }
  //   throw new UnauthorizedException('Invalid credentials');
  // }

  // async generateJwtToken(user: User): Promise<string> {
  //   const payload = { email: user.email, sub: user.id };
  //   return this.jwtService.sign(payload);
  // }
}
