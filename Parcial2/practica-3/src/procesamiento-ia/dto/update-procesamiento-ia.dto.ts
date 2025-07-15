import { PartialType } from '@nestjs/mapped-types';
import { CreateProcesamientoIaDto } from './create-procesamiento-ia.dto';

export class UpdateProcesamientoIaDto extends PartialType(
  CreateProcesamientoIaDto,
) {}
