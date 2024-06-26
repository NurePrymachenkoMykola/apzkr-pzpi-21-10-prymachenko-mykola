import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as uuid from 'uuid';
import {ChipDto} from "./dto/chip.dto";
import {MoveChipDto} from "./dto/move-chip.dto";
import {DrawDto} from "./dto/draw.dto";
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BoardGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('add-chip')
  addChip(@MessageBody() chip: ChipDto) {
    this.server.to(chip.room).emit('chip-added', chip);
  }

  @SubscribeMessage('remove-chip')
  removeChip(@MessageBody() chip: ChipDto) {
    this.server.to(chip.room).emit('chip-removed', chip);
  }

  @SubscribeMessage('move-chip')
  moveChip(@MessageBody() chip: MoveChipDto) {
    this.server.to(chip.room).emit('chip-moved', chip);
  }

  @SubscribeMessage('draw')
  draw(@MessageBody() draw: DrawDto): void {
    this.server.emit('drawing', draw)
  }

  @SubscribeMessage('create-room')
  createRoom(@MessageBody() data, @ConnectedSocket() client: Socket) {
    const room = uuid.v4();
    client.join(room);
    this.server.to(room).emit('room-created', {
      client: client.id,
      room: `${room}`,
    });
  }

  @SubscribeMessage('join-room')
  joinRoom(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.join(data.room);
    this.server.to(data.room).emit('room-joined', {
      client: client.id,
      room: `${data.room}`,
    });
  }
}
