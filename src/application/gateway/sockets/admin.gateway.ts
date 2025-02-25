import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  transports: ['websocket'],
  namespace: 'admin',
})
export class AdminGateway { }
