import { Controller, Get, Post, Body, Patch, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto, PaymentStatus } from '@sports-events/domain';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPayment(createPaymentDto);
  }

  @Get()
  async findAll() {
    return await this.paymentService.findAllPayments();
  }

  @Get('statistics')
  async getStatistics() {
    return await this.paymentService.getPaymentStatistics();
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: PaymentStatus) {
    return await this.paymentService.getPaymentsByStatus(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paymentService.findPaymentById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: Partial<CreatePaymentDto>) {
    return await this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Patch(':id/process')
  async process(@Param('id') id: string) {
    return await this.paymentService.processPayment(id);
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string, @Body('transactionId') transactionId?: string) {
    return await this.paymentService.completePayment(id, transactionId);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    return await this.paymentService.cancelPayment(id);
  }

  @Patch(':id/refund')
  async refund(@Param('id') id: string) {
    return await this.paymentService.refundPayment(id);
  }
}
