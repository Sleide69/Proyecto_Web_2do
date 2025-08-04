import { 
  IsString, 
  IsEmail, 
  IsEnum, 
  IsNumber, 
  IsOptional, 
  IsDateString, 
  Min, 
  Max, 
  IsPositive,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsPhoneNumber
} from 'class-validator';
import { Transform } from 'class-transformer';
import { RaceType, RaceStatus, ShirtType, ShirtSize, PaymentMethod } from '../enums';

/**
 * DTO para crear una nueva carrera
 */
export class CreateRaceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @IsEnum(RaceType)
  type: RaceType;

  @IsDateString()
  eventDate: string;

  @IsDateString()
  registrationStartDate: string;

  @IsDateString()
  registrationEndDate: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  location: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  distance: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(10000)
  maxParticipants: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10000)
  registrationFee: number;

  @IsEnum(RaceStatus)
  @IsOptional()
  status?: RaceStatus = RaceStatus.PLANNED;
}

/**
 * DTO para actualizar una carrera
 */
export class UpdateRaceDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(500)
  description?: string;

  @IsEnum(RaceType)
  @IsOptional()
  type?: RaceType;

  @IsDateString()
  @IsOptional()
  eventDate?: string;

  @IsDateString()
  @IsOptional()
  registrationStartDate?: string;

  @IsDateString()
  @IsOptional()
  registrationEndDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  location?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  distance?: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(10000)
  @IsOptional()
  maxParticipants?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10000)
  @IsOptional()
  registrationFee?: number;

  @IsEnum(RaceStatus)
  @IsOptional()
  status?: RaceStatus;
}

/**
 * DTO para crear un competidor
 */
export class CreateCompetitorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(ShirtType)
  shirtType: ShirtType;

  @IsEnum(ShirtSize)
  shirtSize: ShirtSize;
}

/**
 * DTO para actualizar un competidor
 */
export class UpdateCompetitorDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(ShirtType)
  @IsOptional()
  shirtType?: ShirtType;

  @IsEnum(ShirtSize)
  @IsOptional()
  shirtSize?: ShirtSize;
}
