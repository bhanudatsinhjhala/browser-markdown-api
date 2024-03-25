import { IsMongoId } from 'class-validator';
import {
  replaceMessage,
  validationMessages,
} from '../common/config/messages.config';

export class ParamIdDto {
  @IsMongoId({
    message: replaceMessage(validationMessages.INVALID_DATA, 'id'),
  })
  id: string;
}
