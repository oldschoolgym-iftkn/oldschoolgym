from user.models import MyUser
from .models import Chat, Message
from .serializers import ChatSerializer
from user.serializers import MyUserSerializer
from djangochannelsrestframework import mixins
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer.generics import ObserverConsumerMixin, action
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from user.permissions import VerifiedOnly


# class ChatConsumer(GenericAsyncAPIConsumer, ObserverConsumerMixin):
#     queryset = Chat.objects.all()
#     serializer_class = ChatSerializer
#     permission_classes = (VerifiedOnly,)
#     lookup_field = 'pk'
#
# @action()
# def create_message(self, message, **kwargs):
#     chat = await self.get_chat(pk=self.room_subscribe)

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        try:
            user = self.scope['user']
            if user.is_anonymous:
                await self.close()
            else:
                # if int(user.pk) not in M2M field
                # raise error that user is not allowed
                pass
        except:
            await self.close()

    async def receive_json(self, content, **kwargs):
        return await super().receive_json(content, **kwargs)


class UserConsumer(mixins.ListModelMixin,
                   GenericAsyncAPIConsumer):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
