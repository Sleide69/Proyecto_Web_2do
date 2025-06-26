import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateNotificacionDto {
  @IsString()
  mensaje!: string;

  @IsString()
  tipo!: string;

  @IsDateString()
  fecha!: string;

  @IsOptional()
  @IsNumber()
  plagaId?: number;
}
