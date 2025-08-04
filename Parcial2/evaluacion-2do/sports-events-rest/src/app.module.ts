import { Module } from '@nestjs/common';
import { JsonPersistenceService } from './persistence/json-persistence.service';
import { RaceService, CompetitorService, PaymentService, RegistrationService } from './services';
import { RaceController, CompetitorController, PaymentController, RegistrationController } from './controllers';

@Module({
  imports: [],
  controllers: [
    RaceController,
    CompetitorController,
    PaymentController,
    RegistrationController
  ],
  providers: [
    JsonPersistenceService,
    RaceService,
    CompetitorService,
    PaymentService,
    RegistrationService
  ],
})
export class AppModule {}
