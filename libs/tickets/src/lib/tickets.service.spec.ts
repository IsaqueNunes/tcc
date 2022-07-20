import { Test } from '@nestjs/testing';
import { TicketsService } from './tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TicketsService],
    }).compile();

    service = module.get(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
