import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Registration, RegistrationStatus } from '../entities/registration.entity';
import { Race, RaceStatus } from '../entities/race.entity';
import { Competitor } from '../entities/competitor.entity';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { CreateRegistrationInput, UpdateRegistrationInput } from '../inputs/registration.input';
import { RaceService } from './race.service';
import { CompetitorService } from './competitor.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly persistence: JsonPersistenceService,
    private readonly raceService: RaceService,
    private readonly competitorService: CompetitorService
  ) {}

  async createRegistration(createRegistrationInput: CreateRegistrationInput): Promise<Registration> {
    // Verificar que la carrera existe y está disponible
    const race = await this.raceService.findRaceById(createRegistrationInput.raceId);
    
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
      createRegistrationInput.competitor.email
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
      competitor = await this.competitorService.createCompetitor(createRegistrationInput.competitor);
    }

    // Crear pago si se proporciona
    let payment: Payment | undefined;
    if (createRegistrationInput.payment) {
      // Asegurar que el monto del pago coincida con la tarifa de registro
      if (createRegistrationInput.payment.amount !== race.registrationFee) {
        throw new BadRequestException(
          `El monto del pago (${createRegistrationInput.payment.amount}) no coincide con la tarifa de registro (${race.registrationFee})`
        );
      }
      
      payment = new Payment({
        id: uuidv4(),
        ...createRegistrationInput.payment,
        status: PaymentStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      this.persistence.create('payments', payment);
    }

    // Crear registro
    const registration = new Registration({
      id: uuidv4(),
      raceId: race.id,
      competitorId: competitor.id,
      paymentId: payment?.id,
      status: payment ? RegistrationStatus.PENDING : RegistrationStatus.CONFIRMED,
      registrationDate: new Date(),
      notes: createRegistrationInput.notes,
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

  async updateRegistration(id: string, updateRegistrationInput: UpdateRegistrationInput): Promise<Registration> {
    await this.findRegistrationById(id); // Verificar que existe

    const updatedRegistration = this.persistence.update<Registration>('registrations', id, updateRegistrationInput);
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

    return this.updateRegistration(id, { status: RegistrationStatus.CANCELLED });
  }

  async confirmRegistration(id: string): Promise<Registration> {
    const registration = await this.findRegistrationById(id);

    if (registration.status === RegistrationStatus.CONFIRMED) {
      throw new BadRequestException('El registro ya está confirmado');
    }

    return this.updateRegistration(id, { status: RegistrationStatus.CONFIRMED });
  }

  async getRegistrationsByRace(raceId: string): Promise<Registration[]> {
    const registrations = this.persistence.findBy<Registration>('registrations', { raceId });
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
