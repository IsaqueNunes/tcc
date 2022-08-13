import { Test } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MessageService],
      controllers: [MessageController],
    }).compile();

    controller = module.get(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
