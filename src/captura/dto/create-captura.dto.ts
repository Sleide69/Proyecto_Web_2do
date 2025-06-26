import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateCapturaDto {
  @IsString()
  imagen!: string;

  @IsString()
  ubicacion!: string;

  @IsDateString()
  fecha!: string;

  @IsBoolean()
  plagaDetectada!: boolean;
}
