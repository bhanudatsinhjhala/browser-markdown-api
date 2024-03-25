import { IsString } from 'class-validator';
import {
  replaceMessage,
  validationMessages,
} from '../common/config/messages.config';

export class CreateMarkdownDto {
  @IsString({
    message: replaceMessage(validationMessages.INVALID_STRING, 'File Name'),
  })
  fileName: string;

  @IsString({
    message: replaceMessage(validationMessages.INVALID_STRING, 'Data'),
  })
  data: string;
}
