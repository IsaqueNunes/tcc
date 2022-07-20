import { Test } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

describe('TicketsController', () => {
  let controller: TicketsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TicketsService],
      controllers: [TicketsController],
    }).compile();

    controller = module.get(TicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
