from user.models import MyUser
from .models import Chat, Message
from .serializers import ChatSerializer
from user.serializers import MyUserSerializer
from djangochannelsrestframework import mixins
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer.generics import ObserverConsumerMixin, action


class ChatConsumer(GenericAsyncAPIConsumer, ObserverConsumerMixin):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    lookup_field = 'pk'

    # @action()
    # def create_message(self, message, **kwargs):
    #     chat = await self.get_chat(pk=self.room_subscribe)


class UserConsumer(mixins.ListModelMixin,
                   GenericAsyncAPIConsumer):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
