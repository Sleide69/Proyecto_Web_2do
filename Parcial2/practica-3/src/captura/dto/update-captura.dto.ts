import { PartialType } from '@nestjs/mapped-types';
import { CreateCapturaDto } from './create-captura.dto';

export class UpdateCapturaDto extends PartialType(CreateCapturaDto) {}
