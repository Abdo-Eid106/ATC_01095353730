import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ErrorEnum } from '../enums/error.enum';
import { promises as fs } from 'fs';
import { join, extname } from 'path';

enum ImageTypes {
  PNG = 'image/png',
  JPG = 'image/jpeg',
}

export class ImageInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const file = context.switchToHttp().getRequest().file as
      | Express.Multer.File
      | undefined;

    if (!file) {
      throw new NotFoundException(ErrorEnum.FILE_NOT_FOUND);
    }

    if (!this.validateType(file)) {
      throw new BadRequestException(ErrorEnum.INVALID_FILE_TYPE);
    }

    if (!this.validateSize(file)) {
      throw new BadRequestException(ErrorEnum.INVALID_FILE_SIZE);
    }

    file.filename = this.generateFileName(file);

    const path = join(process.cwd(), 'public', 'storage', file.filename);
    await fs.writeFile(path, file.buffer);

    return next.handle();
  }

  validateType(file: Express.Multer.File) {
    return Object.values(ImageTypes).some((type) => type == file.mimetype);
  }

  validateSize(file: Express.Multer.File) {
    return file.size <= 2e5;
  }

  generateFileName(file: Express.Multer.File) {
    const randomUUID = uuidv4();
    return randomUUID + extname(file.originalname);
  }
}
