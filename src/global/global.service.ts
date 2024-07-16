// src/global/global.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  // Your logic here
  getGlobalInfo(): string {
    console.log("thi is global service")
    return 'This is global information!';
  }
}
