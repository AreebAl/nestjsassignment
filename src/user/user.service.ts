import { User } from './../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor( @InjectRepository(User)private userRepository:Repository<User>){
       
    }

    findAll():Promise<User[]>{
       try{
        const allData=this.userRepository.find();
       return allData;
       }catch(err){
            throw new Error(err)
       }
    }

    
    findById(id:number):Promise<User>{
      return  this.userRepository.findOneById(id);
     }


    createUser(user:User):Promise<User>{
        return this.userRepository.save(user);
    }


    async updateUser(id:number,user:User):Promise<User>{
        // const updatedResult= await this.userRepository.update(id,user);
        const userUpdted = await this.userRepository.findOneBy(id);
            if(!userUpdted){
                throw new NotFoundException("user with id ${id} not exisit")
            }
            Object.assign(userUpdted,user);
            await this.userRepository.save(user);
            return userUpdted;
        // console.log(updatedResult)
        // if(updatedResult.affected==0){
        //     throw new NotFoundException(`User With id ${id} not exisist`);
        // }
        
       
    }

   async remove(id:number):Promise<void>{
        const deletedResults=await this.userRepository.delete(id);
        if(deletedResults.affected==0){
            throw new NotFoundException(`User with id${id} not found`);
        }
       
    }
}
