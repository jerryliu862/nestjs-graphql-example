import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatsResolver, ChatsService],
  controllers: [ChatController],
})
@Module({})
export class ChatsModule {}
