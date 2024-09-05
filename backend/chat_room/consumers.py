import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['name']
        self.room_group_name = f'chat_room_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f"WebSocket disconnected from room: {self.room_name}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get('type')

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'relay_message',
                'message': data,
                'sender_channel_name': self.channel_name,
            }
        )

    async def relay_message(self, event):
        message = event['message']
        sender_channel_name = event['sender_channel_name']

        if self.channel_name != sender_channel_name:
            await self.send(text_data=json.dumps(message))
