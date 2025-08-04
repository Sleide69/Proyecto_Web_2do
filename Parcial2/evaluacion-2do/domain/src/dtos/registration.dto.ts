import { 
  IsString, 
  IsNumber, 
  IsEnum, 
  IsOptional, 
  IsUUID,
  ValidateNested,
  IsPositive,
  Min,
  Max,
  IsNotEmpty,
  MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod, RegistrationStatus } from '../enums';
import { CreateCompetitorDto } from './base.dto';

/**
 * DTO para crear una inscripción con competidor embebido
 */
export class CreateRegistrationDto {
  @IsUUID()
  raceId!: string;

  @ValidateNested()
  @Type(() => CreateCompetitorDto)
  competitor!: CreateCompetitorDto;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  notes?: string;
}

/**
 * DTO para actualizar una inscripción
 */
export class UpdateRegistrationDto {
  @IsEnum(RegistrationStatus)
  @IsOptional()
  status?: RegistrationStatus;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  notes?: string;
}

/**
 * DTO para crear un pago
 */
export class CreatePaymentDto {
  @IsUUID()
  registrationId!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0.01)
  @Max(10000)
  amount!: number;

  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  transactionId!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}

/**
 * DTO para el resumen completo de inscripción
 */
export class RegistrationSummaryDto {
  registration!: {
    id: string;
    raceId: string;
    competitorId: string;
    status: RegistrationStatus;
    registrationDate: Date;
    confirmationCode: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
  };

  race!: {
    id: string;
    name: string;
    description: string;
    type: string;
    eventDate: Date;
    location: string;
    distance: string;
    registrationFee: number;
    status: string;
  };

  competitor!: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    shirtType: string;
    shirtSize: string;
    fullName: string;
  };

  payment?: {
    id: string;
    amount: number;
    method: PaymentMethod;
    status: string;
    transactionId: string;
    description?: string;
    paymentDate?: Date;
    fee: number;
    netAmount: number;
  } | null;
}
