import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageInterceptor } from '../interceptors/image.interceptor';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Request } from 'express';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor() {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'), ImageInterceptor)
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Req() request: Request,
  ) {
    return `${request.protocol}://${request.host}/storage/${image.filename}`;
  }
}
