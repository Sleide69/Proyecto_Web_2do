import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Registration, RegistrationStatus } from '../entities/registration.entity';
import { Race, RaceStatus } from '../entities/race.entity';
import { Competitor } from '../entities/competitor.entity';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { CreateRegistrationDto, UpdateRegistrationDto, RegistrationSummaryDto } from '../dto/registration.dto';
import { RaceService } from './race.service';
import { CompetitorService } from './competitor.service';
import { PaymentService } from './payment.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly persistence: JsonPersistenceService,
    private readonly raceService: RaceService,
    private readonly competitorService: CompetitorService,
    private readonly paymentService: PaymentService
  ) {}

  async createRegistration(createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
    // Verificar que la carrera existe y está disponible
    const race = await this.raceService.findRaceById(createRegistrationDto.raceId);
    
    if (race.status !== RaceStatus.OPEN_REGISTRATION) {
      throw new BadRequestException('La carrera no está disponible para registro');
    }

    // Verificar fechas de registro
    const now = new Date();
    const registrationStart = new Date(race.registrationStartDate);
    const registrationEnd = new Date(race.registrationEndDate);

    if (now < registrationStart) {
      throw new BadRequestException('El período de registro aún no ha iniciado');
    }

    if (now > registrationEnd) {
      throw new BadRequestException('El período de registro ha terminado');
    }

    // Verificar cupos disponibles
    const existingRegistrations = this.persistence.findBy('registrations', { raceId: race.id });
    if (existingRegistrations.length >= race.maxParticipants) {
      throw new BadRequestException('No hay cupos disponibles para esta carrera');
    }

    // Crear o buscar competidor
    let competitor: Competitor;
    const existingCompetitor = await this.competitorService.findCompetitorByEmail(
      createRegistrationDto.competitor.email
    );

    if (existingCompetitor) {
      // Verificar que no esté ya registrado en esta carrera
      const existingRegistration = this.persistence.findOneBy('registrations', {
        raceId: race.id,
        competitorId: existingCompetitor.id
      });

      if (existingRegistration) {
        throw new ConflictException('El competidor ya está registrado en esta carrera');
      }

      competitor = existingCompetitor;
    } else {
      competitor = await this.competitorService.createCompetitor(createRegistrationDto.competitor);
    }

    // Crear pago si se proporciona
    let payment: Payment | undefined;
    if (createRegistrationDto.payment) {
      // Asegurar que el monto del pago coincida con la tarifa de registro
      if (createRegistrationDto.payment.amount !== race.registrationFee) {
        throw new BadRequestException(
          `El monto del pago (${createRegistrationDto.payment.amount}) no coincide con la tarifa de registro (${race.registrationFee})`
        );
      }
      payment = await this.paymentService.createPayment(createRegistrationDto.payment);
    }

    // Crear registro
    const registration = new Registration({
      id: uuidv4(),
      raceId: race.id,
      competitorId: competitor.id,
      paymentId: payment?.id,
      status: payment ? RegistrationStatus.PENDING : RegistrationStatus.CONFIRMED,
      registrationDate: new Date(),
      notes: createRegistrationDto.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    registration.generateConfirmationCode();

    const savedRegistration = this.persistence.create('registrations', registration);

    // Cargar datos relacionados
    savedRegistration.race = race;
    savedRegistration.competitor = competitor;
    savedRegistration.payment = payment;

    return savedRegistration;
  }

  async findAllRegistrations(): Promise<Registration[]> {
    const registrations = this.persistence.findAll<Registration>('registrations');
    return this.loadRelatedData(registrations);
  }

  async findRegistrationById(id: string): Promise<Registration> {
    const registration = this.persistence.findById<Registration>('registrations', id);
    if (!registration) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    const [loadedRegistration] = await this.loadRelatedData([registration]);
    return loadedRegistration;
  }

  async updateRegistration(id: string, updateRegistrationDto: UpdateRegistrationDto): Promise<Registration> {
    await this.findRegistrationById(id); // Verificar que existe

    const updatedRegistration = this.persistence.update<Registration>('registrations', id, updateRegistrationDto);
    if (!updatedRegistration) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    const [loadedRegistration] = await this.loadRelatedData([updatedRegistration]);
    return loadedRegistration;
  }

  async cancelRegistration(id: string): Promise<Registration> {
    const registration = await this.findRegistrationById(id);

    if (registration.status === RegistrationStatus.CANCELLED) {
      throw new BadRequestException('El registro ya está cancelado');
    }

    if (registration.status === RegistrationStatus.COMPLETED) {
      throw new BadRequestException('No se puede cancelar un registro completado');
    }

    // Si hay un pago asociado, cancelarlo
    if (registration.paymentId && registration.payment) {
      if (registration.payment.status === PaymentStatus.COMPLETED) {
        await this.paymentService.refundPayment(registration.paymentId);
      } else {
        await this.paymentService.cancelPayment(registration.paymentId);
      }
    }

    return this.updateRegistration(id, { status: RegistrationStatus.CANCELLED });
  }

  async confirmRegistration(id: string): Promise<Registration> {
    const registration = await this.findRegistrationById(id);

    if (registration.status === RegistrationStatus.CONFIRMED) {
      throw new BadRequestException('El registro ya está confirmado');
    }

    // Si hay un pago, debe estar completado
    if (registration.paymentId && registration.payment) {
      if (registration.payment.status !== PaymentStatus.COMPLETED) {
        throw new BadRequestException('El pago debe estar completado antes de confirmar el registro');
      }
    }

    return this.updateRegistration(id, { status: RegistrationStatus.CONFIRMED });
  }

  async getRegistrationSummary(id: string): Promise<RegistrationSummaryDto> {
    const registration = await this.findRegistrationById(id);

    if (!registration.race || !registration.competitor) {
      throw new BadRequestException('Datos del registro incompletos');
    }

    const summary: RegistrationSummaryDto = {
      id: registration.id,
      confirmationCode: registration.confirmationCode || '',
      status: registration.status,
      registrationDate: registration.registrationDate,
      race: {
        id: registration.race.id,
        name: registration.race.name,
        type: registration.race.type,
        eventDate: registration.race.eventDate,
        location: registration.race.location,
        distance: registration.race.distance,
        registrationFee: registration.race.registrationFee
      },
      competitor: {
        id: registration.competitor.id,
        fullName: registration.competitor.fullName,
        email: registration.competitor.email,
        phone: registration.competitor.phone,
        shirtType: registration.competitor.shirtType,
        shirtSize: registration.competitor.shirtSize
      }
    };

    if (registration.payment) {
      summary.payment = {
        id: registration.payment.id,
        amount: registration.payment.amount,
        method: registration.payment.method,
        status: registration.payment.status,
        transactionId: registration.payment.transactionId,
        paymentDate: registration.payment.paymentDate
      };
    }

    return summary;
  }

  async getRegistrationsByRace(raceId: string): Promise<Registration[]> {
    const registrations = this.persistence.findBy<Registration>('registrations', { raceId });
    return this.loadRelatedData(registrations);
  }

  async getRegistrationsByCompetitor(competitorId: string): Promise<Registration[]> {
    const registrations = this.persistence.findBy<Registration>('registrations', { competitorId });
    return this.loadRelatedData(registrations);
  }

  private async loadRelatedData(registrations: Registration[]): Promise<Registration[]> {
    const races = this.persistence.findAll<Race>('races');
    const competitors = this.persistence.findAll<Competitor>('competitors');
    const payments = this.persistence.findAll<Payment>('payments');

    return registrations.map(registration => {
      registration.race = races.find(r => r.id === registration.raceId);
      registration.competitor = competitors.find(c => c.id === registration.competitorId);
      if (registration.paymentId) {
        registration.payment = payments.find(p => p.id === registration.paymentId);
      }
      return registration;
    });
  }
}
