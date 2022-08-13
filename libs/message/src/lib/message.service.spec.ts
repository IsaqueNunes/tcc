import { Test } from '@nestjs/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();

    service = module.get(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
